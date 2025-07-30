import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CiSearch, CiMenuBurger } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import logo from '/assets/logo.png';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage/ProfilePage';
import SignupPage from './SignupPage';
import { getAuth, signOut } from 'firebase/auth';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  // تحديث حالة المستخدم الأولية
const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem('currentUser');
  return savedUser ? JSON.parse(savedUser) : null;
});

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Webinars', path: '/webinars' },
    { name: 'Tech', path: '/tech' },
    { name: 'Affiliate Program', path: '/affiliate' },
  ];

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setShowLogin(false);
  };

 const handleLogout = async () => {
  try {
    // 1. تسجيل الخروج من Firebase Authentication
    const auth = getAuth(); // تأكد من استيراد getAuth من 'firebase/auth'
    await signOut(auth);
    
    // 2. تنظيف localStorage
    localStorage.removeItem('currentUser');
    
    // 3. تحديث حالة التطبيق
    setUser(null);
    setShowProfile(false);
    
    // 4. إعادة تحميل الصفحة للتأكد من تنظيف جميع الحالات (اختياري)
    window.location.reload();
    
    // يمكنك استبدال إعادة التحميل بالانتقال إلى الصفحة الرئيسية إذا أردت
    // navigate('/'); // إذا كنت تستخدم react-router
    
  } catch (error) {
    console.error('Logout error:', error);
    // يمكنك إضافة عرض رسالة خطأ للمستخدم إذا لزم الأمر
    setError('Failed to logout. Please try again.');
  }
};
  const handleLoginClick = () => {
    setShowLogin(true);
    setShowProfile(false);
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    setShowProfile(true);
    setShowLogin(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-md px-2 md:px-4">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center mr-6">
              <img className='w-[50px]' src={logo} alt="logo" />
            </div>

            {/* Navigation Items - Desktop */}
            <div className="hidden md:flex flex-1 justify-center space-x-6 mx-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`py-2 px-3 rounded-md transition-colors duration-300 ${
                    location.pathname === item.path
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Search and User - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 py-2 px-4 rounded-[10px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-[#3872FF] text-[25.5px] absolute right-0 top-0 text-white rounded-r-[10px] p-2 hover:bg-blue-600 transition-colors duration-300">
                  <CiSearch />
                </button>
              </div>

              {/* User Profile or Login Button */}
              {user ? (
                <button 
                  onClick={handleProfileClick}
                  className="flex items-center space-x-2"
                >
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <FaUserCircle className="text-2xl text-gray-600" />
                  )}
                  <span className="text-gray-700">{user.displayName || 'Profile'}</span>
                </button>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-300"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-4">
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className="text-gray-700 p-2"
              >
                <CiSearch size={24} />
              </button>
              
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 p-2"
              >
                {isMenuOpen ? <IoClose size={24} /> : <CiMenuBurger size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          {showSearch && (
            <div className="md:hidden mt-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full py-2 px-4 rounded-[10px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-[#3872FF] text-xl absolute right-0 top-0 text-white rounded-r-[10px] p-2 hover:bg-blue-600 transition-colors duration-300">
                  <CiSearch />
                </button>
              </div>
            </div>
          )}

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-3">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`py-2 px-3 rounded-md transition-colors duration-300 ${
                      location.pathname === item.path
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {user ? (
                  <>
                    <button
                      onClick={handleProfileClick}
                      className="w-full text-left py-2 px-3 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors duration-300"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleLoginClick}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Modals */}
      {showLogin && (
        <LoginPage 
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}

      {showSignup && (
        <SignupPage 
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}

      {showProfile && user && (
        <ProfilePage 
          user={user}
          onLogout={handleLogout}
          onClose={() => setShowProfile(false)}
        />
      )}
    </>
  );
};

export default Navbar;