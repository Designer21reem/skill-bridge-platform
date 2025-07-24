
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CiSearch, CiMenuBurger } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import logo from '/assets/logo.png'; // تأكد من تحديث المسار الصحيح للصورة

const Navbar = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' }, // المسار الأساسي للصفحة الرئيسية
    { name: 'Webinars', path: '/webinars' },
    { name: 'Tech', path: '/tech' },
    { name: 'Affiliate Program', path: '/affiliate' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-md px-2 pr-[190px] md:px-4 ">
      <div className="container mx-auto px-4 py-3">
        {/* Main Navbar Row */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center mr-6">
            <img className='h-12' src={logo} alt="logo" />
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

          {/* Search and Login - Desktop */}
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

            {/* Login/Logout Button */}
            <div>
              {isLoggedIn ? (
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors duration-300"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-300"
                >
                  Login
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            {/* Search Button - Mobile */}
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="text-gray-700 p-2"
            >
              <CiSearch size={24} />
            </button>
            
            {/* Hamburger Menu */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 p-2"
            >
              {isMenuOpen ? <IoClose size={24} /> : <CiMenuBurger size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search - Shows when search button is clicked */}
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

        {/* Mobile Menu - Shows when hamburger is clicked */}
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
              
              {/* Login/Logout Button - Mobile */}
              <div className="pt-2">
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsLoggedIn(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;