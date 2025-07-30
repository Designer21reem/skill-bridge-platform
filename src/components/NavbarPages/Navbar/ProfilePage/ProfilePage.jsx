import React, { useState, useRef, useEffect } from 'react';
import { 
  IoClose, 
  IoNotificationsOutline, 
  IoSearchOutline,
  IoMenuOutline
} from "react-icons/io5";
import { 
  FaUserCircle, 
  FaSignOutAlt, 
  FaSave,
  FaSpinner
} from "react-icons/fa";
import { 
  MdDashboard, 
  MdLibraryBooks, 
  MdAssignment, 
  MdMessage, 
  MdSettings 
} from "react-icons/md";
import { RiFilePaperLine } from "react-icons/ri";
import { BsStars, BsBriefcase } from "react-icons/bs";
import { doc, updateDoc, serverTimestamp, getDoc, collection, query, where, onSnapshot } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from '../../../../firebase/firebase';
import { updateProfile, onAuthStateChanged } from "firebase/auth";
import DashboardPage from './DashboardPage';
import CoursesPage from './CoursesPage';
import CertificatesPage from './CertificatesPage';
import TasksPage from './TasksPage';
import ProjectsPage from './ProjectsPage';
import PointsPage from './PointsPage';
import HelpCenterPage from './HelpCenterPage';
import NotificationsPage from './NotificationsPage';

const EditProfileModal = ({ user, onClose, onSave, selectedFile, setSelectedFile }) => {
  const [formData, setFormData] = useState({
    name: user.displayName || '',
    email: user.email || '',
    phone: user.phone || '',
    photo: user.photoURL || ''
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setFormData({
      name: user.displayName || '',
      email: user.email || '',
      phone: user.phone || '',
      photo: user.photoURL || ''
    });
    setSelectedFile(null);
    setUploadProgress(0);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Please select an image smaller than 2MB');
        return;
      }
      
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onloadstart = () => {
        setUploadProgress(0);
      };
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          setUploadProgress(Math.round((e.loaded / e.total) * 100));
        }
      };
      reader.onload = () => {
        setUploadProgress(100);
        setFormData(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Profile</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            disabled={uploadProgress > 0 && uploadProgress < 100}
          >
            <IoClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center mb-6">
            {formData.photo ? (
              <div className="relative">
                <img 
                  src={formData.photo} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full mb-4 object-cover"
                />
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ) : (
              <FaUserCircle className="text-6xl text-gray-400 mb-4" />
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <button 
              type="button"
              className="text-blue-600 text-sm font-medium"
              onClick={handleChangePhotoClick}
            >
              Change Photo
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 rounded-lg font-medium mt-6"
            disabled={uploadProgress > 0 && uploadProgress < 100}
          >
            {uploadProgress > 0 && uploadProgress < 100 ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaSave />
            )}
            <span>Save Changes</span>
          </button>
        </form>
      </div>
    </div>
  );
};

const NotificationsModal = ({ onClose, user }) => {
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-[200]">
      <div className="bg-white rounded-xl p-4 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white py-2">
          <h2 className="text-xl font-bold">Notifications</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            <IoClose size={24} />
          </button>
        </div>
        <NotificationsPage />
      </div>
    </div>
  );
};

const SettingsModal = ({ onClose }) => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('eng');

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-end justify-start z-[200] p-4">
      <div className="bg-white rounded-xl p-4 w-full max-w-xs">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Settings</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            <IoClose size={24} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="eng">English</option>
              <option value="ar">Arabic</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = ({ user, onLogout, onClose }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);
  const [isUpdating, setIsUpdating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const searchInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [userCourses, setUserCourses] = useState([]);
  const [userPoints, setUserPoints] = useState(450);

  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userDoc = await getDoc(doc(db, "users", authUser.uid));
        if (userDoc.exists()) {
          setCurrentUser({
            ...authUser,
            ...userDoc.data()
          });
        } else {
          setCurrentUser(authUser);
        }
      }
    });

    return () => unsubscribe();
  }, [user?.uid]);

  useEffect(() => {
    if (!user?.uid) return;

    const q = query(
      collection(db, 'notifications'), 
      where('userId', '==', user.uid),
      where('read', '==', false)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notes = [];
      querySnapshot.forEach((doc) => {
        notes.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setNotifications(notes);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://via.placeholder.com/150";
  };

  const handleSearchIconClick = () => {
    setShowMobileSearch(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 0);
  };

  const handleSearchBlur = () => {
    if (window.innerWidth < 768) {
      setShowMobileSearch(false);
    }
  };

  const handleSaveProfile = async (updatedData) => {
    try {
      setIsUpdating(true);
      let photoURL = currentUser.photoURL || '';

      if (selectedFile) {
        const storageRef = ref(storage, `profilePictures/${currentUser.uid}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);
        
        photoURL = await new Promise((resolve, reject) => {
          uploadTask.on('state_changed',
            (snapshot) => {
              const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              setUploadProgress(progress);
            },
            (error) => reject(error),
            async () => resolve(await getDownloadURL(uploadTask.snapshot.ref))
          );
        });
      }

      const updateData = {
        displayName: updatedData.name,
        email: updatedData.email,
        phone: updatedData.phone || '',
        lastUpdated: serverTimestamp()
      };

      if (photoURL) {
        updateData.photoURL = photoURL;
      }

      await updateDoc(doc(db, "users", currentUser.uid), updateData);

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: updatedData.name,
          photoURL: photoURL || currentUser.photoURL
        });

        await auth.currentUser.reload();
        
        const updatedAuthUser = auth.currentUser;
        const userDoc = await getDoc(doc(db, "users", updatedAuthUser.uid));
        
        setCurrentUser({
          ...updatedAuthUser,
          ...userDoc.data()
        });
      }

      setShowEditProfile(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(`Error updating profile: ${error.message}`);
    } finally {
      setIsUpdating(false);
      setUploadProgress(0);
      setSelectedFile(null);
    }
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'Dashboard':
        return <DashboardPage 
          user={user} 
          userCourses={userCourses} 
          userPoints={userPoints} 
          setUserPoints={setUserPoints} 
        />;
      case 'Courses':
        return <CoursesPage userCourses={userCourses} />;
      case 'Certificates':
        return <CertificatesPage />;
      case 'Tasks':
        return <TasksPage />;
      case 'Projects':
        return <ProjectsPage />;
      case 'Points':
        return <PointsPage 
          userCourses={userCourses} 
          setUserCourses={setUserCourses} 
          userPoints={userPoints} 
          setUserPoints={setUserPoints} 
        />;
      case 'Message':
        return <HelpCenterPage />;
      default:
        return <DashboardPage user={currentUser} userCourses={userCourses} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100 z-[100] flex overflow-hidden">
      {/* Mobile menu button */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <IoMenuOutline size={24} />
      </button>

      {/* Sidebar */}
      <div className={`w-64 bg-white shadow-md p-4 flex flex-col fixed md:static h-full transition-transform duration-300 z-40
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        {/* Logo */}
        <div className="mb-8 p-4">
          <img src="/assets/logo.png" alt="Logo" className="w-25 mx-auto" />
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <button 
                className={`w-full flex items-center space-x-3 p-3 rounded-lg ${activeTab === 'Dashboard' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('Dashboard')}
              >
                <MdDashboard className="text-xl" />
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button 
                className={`w-full flex items-center space-x-3 p-3 rounded-lg ${activeTab === 'Courses' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('Courses')}
              >
                <MdLibraryBooks className="text-xl" />
                <span>Courses</span>
              </button>
            </li>
            <li>
              <button 
                className={`w-full flex items-center space-x-3 p-3 rounded-lg ${activeTab === 'Certificates' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('Certificates')}
              >
                <RiFilePaperLine className="text-xl" />
                <span>Certificates</span>
              </button>
            </li>
            <li>
              <button 
                className={`w-full flex items-center space-x-3 p-3 rounded-lg ${activeTab === 'Tasks' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('Tasks')}
              >
                <MdAssignment className="text-xl" />
                <span>Tasks</span>
              </button>
            </li>
            <li>
              <button 
                className={`w-full flex items-center space-x-3 p-3 rounded-lg ${activeTab === 'Projects' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('Projects')}
              >
                <BsBriefcase className="text-xl" />
                <span>Projects</span>
              </button>
            </li>
            <li>
              <button 
                className={`w-full flex items-center space-x-3 p-3 rounded-lg ${activeTab === 'Points' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('Points')}
              >
                <BsStars className="text-xl" />
                <span>Points</span>
              </button>
            </li>
            <li>
              <button 
                className={`w-full flex items-center space-x-3 p-3 rounded-lg ${activeTab === 'Message' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('Message')}
              >
                <MdMessage className="text-xl" />
                <span>Help Center</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Settings section */}
        <div className="mt-auto border-t pt-4">
          <ul className="space-y-2">
            <li>
              <button 
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100"
                onClick={() => setShowSettingsModal(true)}
              >
                <MdSettings className="text-xl" />
                <span>Settings</span>
              </button>
            </li>
            <li>
              <button 
                onClick={onLogout}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-red-500"
              >
                <FaSignOutAlt className="text-xl" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white p-4 shadow-sm flex items-center justify-center">
          {/* Desktop Search - Hidden on mobile */}
          <div className="hidden md:block relative flex-1 max-w-md mx-auto">
            <div className="relative flex-1 max-w-md mx-auto">
              <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Mobile Search Icon - Hidden on desktop */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-gray-200 mr-auto"
            onClick={handleSearchIconClick}
          >
            <IoSearchOutline className="text-xl" />
          </button>

          <div className="flex items-center space-x-4 ml-4">
            <button 
              className="relative p-2 rounded-full hover:bg-gray-200"
              onClick={() => setShowNotificationsModal(true)}
            >
              <IoNotificationsOutline className="text-xl" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            <button 
              className="flex items-center space-x-2 bg-blue-50 rounded-full p-1 pr-3 hover:bg-blue-100"
              onClick={() => setShowEditProfile(true)}
            >
              {currentUser.photoURL ? (
                <img 
                  src={`${currentUser.photoURL}?${new Date().getTime()}`}
                  alt="Profile" 
                  className="w-8 h-8 rounded-full object-cover"
                  onError={handleImageError}
                />
              ) : (
                <FaUserCircle className="text-3xl text-gray-400" />
              )}
              <div className="text-sm">
                <p className="font-medium">{currentUser.displayName || 'User'}</p>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Overlay - Appears when icon is clicked */}
        {showMobileSearch && (
          <div className="md:hidden fixed inset-0 bg-white z-50 p-4 flex items-center">
            <div className="relative w-full">
              <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onBlur={handleSearchBlur}
              />
            </div>
            <button 
              className="ml-2 text-gray-500"
              onClick={() => setShowMobileSearch(false)}
            >
              <IoClose size={24} />
            </button>
          </div>
        )}

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderContent()}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <EditProfileModal 
          user={currentUser} 
          onClose={() => {
            setShowEditProfile(false);
            setSelectedFile(null);
          }} 
          onSave={handleSaveProfile}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
      )}

      {/* Notifications Modal */}
      {showNotificationsModal && (
        <NotificationsModal 
          onClose={() => setShowNotificationsModal(false)}
          user={currentUser}
        />
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <SettingsModal 
          onClose={() => setShowSettingsModal(false)}
        />
      )}

      {/* Loading overlay with cancel button */}
      {isUpdating && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-[200]">
          <div className="bg-white p-6 rounded-lg shadow-lg min-w-[300px]">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-medium">Updating profile...</p>
              <button 
                onClick={() => setIsUpdating(false)}
                className="text-gray-500 hover:text-gray-700"
                disabled={uploadProgress > 0 && uploadProgress < 100}
              >
                <IoClose size={24} />
              </button>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">
              {uploadProgress}% uploaded
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;