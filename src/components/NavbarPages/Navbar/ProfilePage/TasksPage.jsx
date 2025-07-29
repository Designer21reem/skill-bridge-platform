import React, { useState, useEffect } from 'react';
import { IoCheckmarkDone, IoClose, IoEye } from 'react-icons/io5';
import { MdOutlineAccessTime } from 'react-icons/md';
import { collection, query, onSnapshot, updateDoc, doc } from 'firebase/firestore';
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
  design: 'assets/design.png',
  development: 'https://cdn-icons-png.flaticon.com/512/1329/1329016.png',
  marketing: 'https://cdn-icons-png.flaticon.com/512/1055/1055687.png',
  content: 'https://cdn-icons-png.flaticon.com/512/3652/3652191.png',
  challenge: 'assets/design.png',
  default: 'assets/design.png'
};

const TasksPage = () => {
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem('tasksActiveTab');
    return savedTab || 'new';
  });
  
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    localStorage.setItem('tasksActiveTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (!currentUser) return;

    setLoading(true);
    setError(null);

    try {
      const q = query(collection(db, 'tasks'));
      
      const unsubscribe = onSnapshot(q, 
        (querySnapshot) => {
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
            
            return { 
              id: doc.id, 
              ...taskData,
              status,
              image: taskImage,
              deadline: formatTaskDeadline(taskData.deadline),
              createdAt: formatTaskDeadline(taskData.createdAt || "Unknown date")
            };
          });

          const filteredTasks = tasksData.filter(task => {
            if (activeTab === 'new') return task.status === 'new';
            if (activeTab === 'old') return task.status === 'old';
            if (activeTab === 'completed') return task.status === 'completed';
            return false;
          });

          setTasks(filteredTasks);
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching tasks:", error);
          setError("Failed to load tasks");
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error("Error setting up tasks listener:", error);
      setError("Error initializing tasks");
      setLoading(false);
    }
  }, [activeTab, currentUser]);

  const handleStartTask = (task) => {
    setSelectedTask(task);
  };

  const handleSubmitTask = async (files) => {
    if (!selectedTask || !currentUser) return;

    try {
      // Update task status to 'submitted' instead of 'completed'
      await updateDoc(doc(db, 'tasks', selectedTask.id), {
        status: 'submitted',
        completedBy: currentUser.uid,
        submittedAt: new Date(),
        files: Array.from(files).map(file => ({
          name: file.name,
          type: file.type,
          size: file.size,
        }))
      });

      // Update local state to reflect the submission
      setTasks(prevTasks => {
        return prevTasks.map(t => {
          if (t.id === selectedTask.id) {
            return {
              ...t,
              status: 'submitted',
              files: Array.from(files).map(file => ({
                name: file.name,
                url: URL.createObjectURL(file),
                type: file.type,
                size: file.size
              }))
            };
          }
          return t;
        });
      });

      setSelectedTask(null);
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting task:", error);
      setError("Failed to submit task");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        {error} - Please refresh the page
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <IoCheckmarkDone className="text-green-500 text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Task Submitted Successfully!</h3>
              <p className="text-gray-600 mb-4">Your task is now under review.</p>
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
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard 
              key={task.id}
              task={task}
              onStartTask={handleStartTask}
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

const TaskCard = ({ task, onStartTask }) => {
  const [imageError, setImageError] = useState(false);

  const handleFileDownload = (file) => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
            <h2 className="text-xl md:text-2xl capitalize font-extrabold font-['Abhaya+Libre'] text-blue-600 mb-1">
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
                  key={index}
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
          </span>
          
          <div className="self-end sm:self-auto">
            {task.status === 'new' && (
              <button 
                className="bg-blue-600 text-white px-4 py-1.5 md:px-6 md:py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
                onClick={() => onStartTask(task)}
              >
                Start the Challenge
              </button>
            )}
            
            {task.status === 'old' && (
              <span className="px-4 py-1.5 md:px-6 md:py-2 rounded-lg text-sm md:text-base bg-gray-300 text-gray-600 line-through">
                Start the Challenge
              </span>
            )}
            
            {task.status === 'completed' && (
              <span className="px-4 py-1.5 md:px-6 md:py-2 rounded-lg text-sm md:text-base bg-green-100 text-green-800">
                <IoCheckmarkDone className="inline mr-1" />
                Completed
              </span>
            )}

            {task.status === 'submitted' && (
              <span className="px-4 py-1.5 md:px-6 md:py-2 rounded-lg text-sm md:text-base bg-yellow-100 text-yellow-800">
                <IoEye className="inline mr-1" />
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