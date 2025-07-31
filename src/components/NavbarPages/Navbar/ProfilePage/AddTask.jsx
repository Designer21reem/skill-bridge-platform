import React, { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  Timestamp, 
  increment, 
  getDocs, 
  query, 
  where, 
  getDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';
import { useAuth } from '../../../../firebase/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoClose } from 'react-icons/io5';

const AddTask = ({ onTaskAdded }) => {
  const { currentUser } = useAuth();
  const [mode, setMode] = useState('add');
  const [task, setTask] = useState({
    title: '',
    description: '',
    points: 250,
    status: 'new',
    deadline: null,
    category: 'development',
    assignedTo: '',
    createdBy: currentUser?.uid || '',
    submittedBy: null,
    reviewedBy: null
  });
  const [submittedTasks, setSubmittedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [pointsToAward, setPointsToAward] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const isAdmin = () => {
    return currentUser && currentUser.uid === 'wHkb8aewZeTvGOcJNtNvsluq9Ev1';
  };

  useEffect(() => {
    const fetchSubmittedTasks = async () => {
      if (!isAdmin()) {
        setError("Only admin can review tasks");
        return;
      }
      
      setLoading(true);
      setError('');
      
      try {
        console.log("Starting to fetch submitted tasks...");
        const q = query(
          collection(db, 'tasks'), 
          where('status', '==', 'submitted'),
          where('reviewedBy', '==', null)
        );
        
        console.log("Query created, getting docs...");
        const querySnapshot = await getDocs(q);
        console.log(`Found ${querySnapshot.docs.length} tasks`);
        
        const tasks = [];
        console.log("Processing tasks...");
        
        const tasksPromises = querySnapshot.docs.map(async (taskDoc) => {
          const taskData = taskDoc.data();
          console.log("Processing task:", taskDoc.id, taskData);
          
          const userId = taskData.submittedBy;
          if (!userId) {
            console.log("No submittedBy field for task:", taskDoc.id);
            return null;
          }
          
          console.log("Getting user data for:", userId);
          const userDocRef = doc(db, 'users', userId);
          const userDocSnap = await getDoc(userDocRef);
          
          if (!userDocSnap.exists()) {
            console.log("User document does not exist:", userId);
            return null;
          }
          
          const userData = userDocSnap.data();
          console.log("User data retrieved:", userData);
          
          return {
            id: taskDoc.id,
            ...taskData,
            user: {
              name: userData?.name || 'Unknown',
              photoURL: userData?.photoURL || '',
              email: userData?.email || '',
              userId
            }
          };
        });
        
        console.log("Waiting for all promises to resolve...");
        const resolvedTasks = await Promise.all(tasksPromises);
        const filteredTasks = resolvedTasks.filter(task => task !== null);
        console.log(`Filtered tasks count: ${filteredTasks.length}`);
        
        setSubmittedTasks(filteredTasks);
      } catch (error) {
        console.error("Full error details:", {
          code: error.code,
          message: error.message,
          stack: error.stack
        });
        setError(`Failed to load tasks. Error: ${error.code} - ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (mode === 'review') {
      fetchSubmittedTasks();
    }
  }, [mode, currentUser]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!isAdmin()) {
      setError("Only admin can add tasks");
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const newTask = {
        title: task.title,
        description: task.description,
        points: Number(task.points),
        status: 'new',
        deadline: task.deadline ? Timestamp.fromDate(task.deadline) : null,
        category: task.category,
        createdBy: currentUser.uid,
        createdAt: serverTimestamp(),
        available: true,
        files: [],
        submittedBy: null,
        reviewedBy: null
      };

      if (task.assignedTo.trim() !== '') {
        newTask.assignedTo = task.assignedTo;
      }
      
      console.log("Adding new task:", newTask);
      await addDoc(collection(db, 'tasks'), newTask);
      
      setSuccess('Task added successfully!');
      setTask({
        title: '',
        description: '',
        points: 250,
        status: 'new',
        deadline: null,
        category: 'development',
        assignedTo: '',
        createdBy: currentUser.uid,
        submittedBy: null,
        reviewedBy: null
      });
      
      if (onTaskAdded) {
        onTaskAdded();
      }
    } catch (error) {
      console.error("Error adding task:", error);
      setError(`Failed to add task. Error: ${error.code} - ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveTask = async () => {
    if (!isAdmin() || !selectedTask) {
      setError("Authentication error");
      return;
    }

    if (pointsToAward <= 0 || pointsToAward > selectedTask.points) {
      setError(`Points must be between 1 and ${selectedTask.points}`);
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      console.log("Approving task:", selectedTask.id);
      await updateDoc(doc(db, 'tasks', selectedTask.id), {
        status: 'completed',
        feedback: feedback,
        approvedPoints: pointsToAward,
        completedAt: serverTimestamp(),
        reviewedBy: currentUser.uid
      });
      
      console.log("Updating user points:", selectedTask.user.userId);
      const userRef = doc(db, 'users', selectedTask.user.userId);
      await updateDoc(userRef, {
        points: increment(Number(pointsToAward)),
        lastUpdated: serverTimestamp()
      });
      
      console.log("Creating notification...");
      await addDoc(collection(db, 'notifications'), {
        userId: selectedTask.user.userId,
        title: 'Task Approved',
        message: `You received ${pointsToAward} points for: ${selectedTask.title}`,
        additionalNote: feedback,
        read: false,
        createdAt: serverTimestamp(),
        type: 'task_approval',
        taskId: selectedTask.id
      });
      
      setSuccess('Task approved successfully!');
      setSelectedTask(null);
      setFeedback('');
      setPointsToAward(0);
      setSubmittedTasks(submittedTasks.filter(task => task.id !== selectedTask.id));
    } catch (error) {
      console.error("Error approving task:", error);
      setError(`Failed to approve task. Error: ${error.code} - ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePointsChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setPointsToAward(value);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}
      
      {loading && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded flex items-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700 mr-2"></div>
          Processing...
        </div>
      )}

      <div className="flex gap-4 mb-6">
        <button 
          className={`px-4 py-2 rounded ${mode === 'add' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setMode('add')}
          disabled={loading}
        >
          Add New Task
        </button>
        {isAdmin() && (
          <button 
            className={`px-4 py-2 rounded ${mode === 'review' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setMode('review')}
            disabled={loading}
          >
            Review Submitted Tasks
          </button>
        )}
      </div>

      {mode === 'add' ? (
        <form onSubmit={handleAddTask} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Task Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter task title"
              value={task.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              placeholder="Enter detailed description"
              value={task.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows={4}
              required
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Points</label>
              <input
                type="number"
                name="points"
                placeholder="Points value"
                value={task.points}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
                min={1}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Category</label>
              <select
                name="category"
                value={task.category}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                disabled={loading}
              >
                <option value="development">Development</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
                <option value="content">Content</option>
                <option value="challenge">Challenge</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Assigned To (User ID - Optional)</label>
            <input
              type="text"
              name="assignedTo"
              placeholder="Leave empty for all users"
              value={task.assignedTo}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              disabled={loading}
            />
            <p className="text-sm text-gray-500 mt-1">Leave blank to make task available for all users</p>
          </div>

          <div>
            <label className="block mb-1 font-medium">Deadline</label>
            <DatePicker
              selected={task.deadline}
              onChange={(date) => setTask({...task, deadline: date})}
              minDate={new Date()}
              className="w-full p-2 border rounded"
              placeholderText="Select deadline"
              dateFormat="MMMM d, yyyy"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Task'}
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Tasks Submitted for Review</h2>
          
          {submittedTasks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No tasks submitted for review at the moment</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
              >
                Refresh Data
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {submittedTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    if (!loading) {
                      setSelectedTask(task);
                      setPointsToAward(task.points);
                    }
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src={task.user.photoURL || '/default-user.png'} 
                      alt={task.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/default-user.png';
                      }}
                    />
                    <div>
                      <h3 className="font-medium">{task.user.name}</h3>
                      <p className="text-sm text-gray-500">{task.user.email}</p>
                    </div>
                  </div>
                  <h4 className="font-semibold">{task.title}</h4>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{task.description}</p>
                  <p className="text-sm mt-2">
                    <span className="font-medium">Points: </span>
                    {task.points}
                  </p>
                  
                  {task.files?.length > 0 && (
                    <div className="mt-2">
                      <span className="text-sm font-medium">Attached Files:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {task.files.map((file, index) => (
                          <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {file.name || `File ${index + 1}`}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Review Task</h3>
              <button 
                onClick={() => !loading && setSelectedTask(null)} 
                className="text-gray-500 hover:text-gray-700"
                disabled={loading}
              >
                <IoClose size={24} />
              </button>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium">{selectedTask.title}</h4>
              <p className="text-sm text-gray-600">{selectedTask.description}</p>
            </div>
            
            <div className="mb-4">
              <label className="block mb-1 font-medium">Your Feedback</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full p-2 border rounded"
                rows={3}
                placeholder="Enter your feedback here..."
                disabled={loading}
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-1 font-medium">Points to Award</label>
              <input
                type="number"
                value={pointsToAward}
                onChange={handlePointsChange}
                className="w-full p-2 border rounded"
                min={1}
                max={selectedTask.points}
                disabled={loading}
              />
              <p className="text-sm text-gray-500 mt-1">
                Available points: {selectedTask.points}
              </p>
            </div>
            
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => !loading && setSelectedTask(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                onClick={handleApproveTask}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Approve & Send Points'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;