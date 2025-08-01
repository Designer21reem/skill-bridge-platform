import React, { useState, useEffect } from 'react';
import { IoCheckmarkDone, IoClose } from 'react-icons/io5';
import { MdOutlineAccessTime } from 'react-icons/md';
import { 
  collection, 
  query, 
  onSnapshot, 
  where, 
  updateDoc, 
  doc, 
  serverTimestamp,
  getDoc,
  arrayUnion
} from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';
import { useAuth } from '../../../../firebase/AuthContext';
import TaskModal from './TaskModal';

const formatTaskDeadline = (deadline) => {
  try {
    if (!deadline) return "No deadline set";
    
    if (typeof deadline === 'object' && deadline !== null && 'toDate' in deadline) {
      return deadline.toDate().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    
    if (typeof deadline === 'string') {
      return deadline;
    }
    
    if (deadline instanceof Date) {
      return deadline.toLocaleDateString();
    }
    
    return "Invalid date";
  } catch (error) {
    console.error("Error formatting deadline:", error);
    return "Date error";
  }
};

const DEFAULT_TASK_IMAGES = {
  design: 'assets/web-design.png',
  development: 'https://cdn-icons-png.flaticon.com/512/1329/1329016.png',
  marketing: 'https://cdn-icons-png.flaticon.com/512/1055/1055687.png',
  content: 'https://cdn-icons-png.flaticon.com/512/3652/3652191.png',
  challenge: 'assets/cup.png',
  default: 'https://cdn-icons-png.flaticon.com/512/1828/1828899.png'
};

const TasksPage = () => {
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem('tasksActiveTab');
    return savedTab || 'new';
  });
  
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    localStorage.setItem('tasksActiveTab', activeTab);
  }, [activeTab]);

  const fetchUserData = async () => {
    if (!currentUser) return;
    
    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setCompletedTasks(userData.completedTasks || []);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(`Failed to load user data: ${error.message}`);
    }
  };

  useEffect(() => {
    if (!currentUser) return;

    setLoading(true);
    setError(null);

    fetchUserData();

    try {
      let q;
      if (activeTab === 'completed') {
        q = query(
          collection(db, 'tasks'),
          where('status', '==', 'completed')
        );
      } else if (activeTab === 'new') {
        q = query(
          collection(db, 'tasks'),
          where('status', '==', 'new')
        );
      } else if (activeTab === 'old') {
        q = query(collection(db, 'tasks'));
      } else {
        q = query(collection(db, 'tasks'));
      }
      
      const unsubscribe = onSnapshot(q, 
        async (querySnapshot) => {
          const now = new Date();
          const tasksData = querySnapshot.docs.map((doc) => {
            const taskData = doc.data();
            let deadlineDate;
            
            if (taskData.deadline && typeof taskData.deadline === 'object' && 'toDate' in taskData.deadline) {
              deadlineDate = taskData.deadline.toDate();
            } else if (taskData.deadline instanceof Date) {
              deadlineDate = taskData.deadline;
            }
            
            let status = taskData.status;
            if (status !== 'completed' && deadlineDate && deadlineDate < now) {
              status = 'old';
            }

            const taskImage = taskData.image || 
              DEFAULT_TASK_IMAGES[taskData.category?.toLowerCase()] || 
              DEFAULT_TASK_IMAGES.default;
            
            const userCompleted = completedTasks.includes(doc.id);
            const userSubmitted = taskData.submittedBy === currentUser.uid;
            
            return { 
              id: doc.id, 
              ...taskData,
              status: status,
              image: taskImage,
              deadline: formatTaskDeadline(taskData.deadline),
              createdAt: formatTaskDeadline(taskData.createdAt || "Unknown date"),
              userCompleted,
              userSubmitted
            };
          });

          let filteredTasks = tasksData;
          if (activeTab === 'old') {
            filteredTasks = tasksData.filter(task => task.status === 'old');
          } else if (activeTab === 'new') {
            filteredTasks = tasksData.filter(task => task.status === 'new');
          } else if (activeTab === 'completed') {
            filteredTasks = tasksData.filter(task => 
              task.status === 'completed' && completedTasks.includes(task.id)
            );
          }

          console.log(`Filtered tasks for ${activeTab}:`, filteredTasks);
          setTasks(filteredTasks);
          setLoading(false);
        },
        (error) => {
          console.error("Error details:", {
            code: error.code,
            message: error.message,
            stack: error.stack
          });
          setError(`Failed to load tasks. Error: ${error.code} - ${error.message}`);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error("Error setting up tasks listener:", error);
      setError(`Initialization error: ${error.message}`);
      setLoading(false);
    }
  }, [activeTab, currentUser, completedTasks]);

  const handleStartTask = (task) => {
    if (!currentUser) {
      setError("You must be logged in to start tasks");
      return;
    }
    setSelectedTask(task);
  };

  const handleSubmitTask = async (files) => {
    if (!selectedTask || !currentUser) return;

    try {
      console.log("Preparing to submit task:", selectedTask.id);
      
      const updateData = {
        status: 'submitted',
        submittedBy: currentUser.uid,
        submittedAt: serverTimestamp(),
        reviewedBy: null,
        files: Array.from(files).map(file => ({
          name: file.name,
          type: file.type,
          size: file.size,
        }))
      };
      
      await updateDoc(doc(db, 'tasks', selectedTask.id), updateData);
      
      await updateDoc(doc(db, 'users', currentUser.uid), {
        completedTasks: arrayUnion(selectedTask.id),
        lastUpdated: serverTimestamp()
      });
      
      console.log("Task submitted and user record updated successfully");
      
      setSelectedTask(null);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      fetchUserData();
    } catch (error) {
      console.error("Full error details:", {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      setError(`Submission failed. Error: ${error.code} - ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3">Loading tasks...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        <p className="font-bold">Error:</p>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <IoCheckmarkDone className="text-green-500 text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Task Submitted Successfully!</h3>
              <p className="text-gray-600 mb-4">The admin will review your submission.</p>
              <button
                onClick={() => setShowSuccess(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8 gap-4">
        <h1 className="text-2xl font-['Abhaya+Libre'] sm:text-3xl font-bold">Tasks</h1>
        
        <div className="flex font-['murhecho'] items-center pl-13Z md:pl-1 bg-blue-50 rounded-lg p-1 shadow-sm flex-row gap-2 md:gap-3 lg:gap-4">
          {['new', 'old', 'completed'].map((tab) => (
            <button
              key={tab}
              className={`px-3 sm:px-4 md:px-5 py-2 rounded-md font-medium text-sm sm:text-base whitespace-nowrap ${
                activeTab === tab ? 'text-white bg-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className="hidden md:block md:w-1/4"></div>
      </div>

      <div className="space-y-4 md:space-y-6">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No {activeTab} tasks found
            {activeTab === 'completed' && (
              <p className="mt-2">You haven't completed any tasks yet</p>
            )}
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard 
              key={task.id}
              task={task}
              onStartTask={handleStartTask}
              currentUserId={currentUser?.uid}
            />
          ))
        )}
      </div>

      {selectedTask && (
        <TaskModal 
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSubmit={handleSubmitTask}
          isLocalOnly={false}
        />
      )}
    </div>
  );
};

const TaskCard = ({ task, onStartTask, currentUserId }) => {
  const [imageError, setImageError] = useState(false);

  const handleFileDownload = (file) => {
    if (file.url) {
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.name || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const isAssignedToMe = task.assignedTo && task.assignedTo === currentUserId;
  const showActionButton = !task.userCompleted && 
                         (task.status === 'new' || (task.status === 'old' && isAssignedToMe));

  return (
    <div className="flex flex-col md:flex-row border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="hidden md:block md:w-1/4 bg-gray-100 p-4 flex items-center justify-center">
        <div className="w-full h-48 overflow-hidden rounded-lg flex items-center justify-center">
          <img 
            src={imageError ? DEFAULT_TASK_IMAGES.default : task.image} 
            alt="Task visual"
            className="object-contain w-full h-full max-w-full max-h-full"
            onError={() => setImageError(true)}
          />
        </div>
      </div>
      
      <div className="flex-1 p-4 md:p-6">
        <div className="flex justify-between items-start mb-2 md:mb-3">
          <div>
            <h2 className="text-xl md:text-2xl uppercase font-extrabold font-['Abhaya+Libre'] text-blue-600 mb-1">
              {task.category || 'CHALLENGE'}
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h3 className="text-lg md:text-xl font-semibold">{task.title}</h3>
              <span className="text-blue-600 font-bold text-base md:text-lg">
                +{task.points} points
              </span>
            </div>
          </div>
          <div className="flex items-center text-gray-500 text-sm md:text-base">
            <MdOutlineAccessTime className="mr-2" />
            <span>{task.deadline}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
          {task.description}
        </p>
        
        {task.files?.length > 0 && (
          <div className="mb-3">
            <h4 className="text-sm font-medium mb-1">Attachments:</h4>
            <div className="flex flex-wrap gap-2">
              {task.files.map((file, index) => (
                <button
                  key={`${task.id}-file-${index}`}
                  onClick={() => handleFileDownload(file)}
                  className="text-blue-600 text-sm underline hover:text-blue-800 cursor-pointer"
                >
                  {file.name || `File ${index + 1}`} ({(file.size / 1024).toFixed(1)} KB)
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <span className="text-sm text-gray-500">
            Created: {task.createdAt}
            {task.assignedTo && (
              <span className="ml-2 text-blue-600">(Assigned)</span>
            )}
          </span>
          
          <div className="self-end sm:self-auto">
            {showActionButton && (
              <button 
                className="bg-blue-600 text-white px-4 py-1.5 md:px-6 md:py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
                onClick={() => onStartTask(task)}
              >
                {isAssignedToMe ? 'Complete Assignment' : 'Start the Challenge'}
              </button>
            )}
            
            {task.status === 'old' && !showActionButton && (
              <span className="px-4 py-1.5 md:px-6 md:py-2 rounded-lg text-sm md:text-base bg-gray-300 text-gray-600 line-through">
                Start the Challenge
              </span>
            )}
            
            {task.status === 'completed' && (
              <span className="px-4 py-1.5 md:px-6 md:py-2 rounded-lg text-sm md:text-base bg-green-100 text-green-800">
                <IoCheckmarkDone className="inline mr-1" />
                {task.userCompleted ? 'You completed this' : 'Completed'}
              </span>
            )}

            {task.status === 'submitted' && (
              <span className="px-4 py-1.5 md:px-6 md:py-2 rounded-lg text-sm md:text-base bg-yellow-100 text-yellow-800">
                Under Review
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;