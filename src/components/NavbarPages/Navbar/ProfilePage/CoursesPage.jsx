import React, { useState } from 'react';
import { FaCheckCircle, FaLock, FaArrowRight, FaPlayCircle, FaShoppingCart, FaStar, FaRegStar } from 'react-icons/fa';

const CoursesPage = ({ userCourses = [] }) => {
  const [activeTab, setActiveTab] = useState('myCourses');

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <FaCheckCircle className="text-green-500" />;
      case 'inProgress':
        return <FaPlayCircle className="text-blue-500" />;
      default:
        return <FaLock className="text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'inProgress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateProgressPercentage = (course) => {
    if (course.status === 'completed') return 100;
    if (course.status === 'notStarted') return 0;
    return Math.round((course.completedLessons / course.totalLessons) * 100);
  };

  // بيانات الكورسات المتاحة للشراء
  const availableCourses = [
    {
      id: 101,
      title: "Advanced React Development",
      category: "Programming",
      description: "Master React hooks, context API, and advanced patterns with this comprehensive course.",
      image: "assets/react.jpg",
      price: 49.99,
      originalPrice: 79.99,
      videosCount: 24,
      rating: 4.7,
      reviews: 128,
      pointsRequired: 500
    },
    {
      id: 102,
      title: "Digital Marketing Fundamentals",
      category: "Marketing",
      description: "Learn SEO, social media marketing, and content strategy from industry experts.",
      image: "assets/Digital-Marketing.jpg",
      price: 29.99,
      originalPrice: 49.99,
      videosCount: 18,
      rating: 4.5,
      reviews: 95,
      pointsRequired: 300
    },
    {
      id: 103,
      title: "UI/UX Design Masterclass",
      category: "Design",
      description: "From wireframes to prototypes, learn the complete design process with Figma.",
      image: "assets/UX-design-courses.jpg",
      price: 59.99,
      originalPrice: 89.99,
      videosCount: 32,
      rating: 4.9,
      reviews: 215,
      pointsRequired: 700
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        {/* شريط التبويبات */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'myCourses' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('myCourses')}
          >
            My Courses
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'availableCourses' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('availableCourses')}
          >
            Available Courses
          </button>
        </div>

        {activeTab === 'myCourses' ? (
          <>
            <h2 className="text-xl font-semibold mb-6">My Courses</h2>
            
            {userCourses.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">You don't have any courses yet</p>
                <button 
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg mx-auto"
                  onClick={() => setActiveTab('availableCourses')}
                >
                  <span>Browse Available Courses</span>
                  <FaArrowRight />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userCourses.map(course => {
                  const progress = calculateProgressPercentage(course);
                  
                  return (
                    <div key={course.id} className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        {/* Course Image */}
                        <div className="md:w-1/3 h-40 bg-gray-100">
                          <img 
                            src={course.image} 
                            alt={course.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Course Content */}
                        <div className="p-4 flex-1">
                          <div className="flex flex-col h-full">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium">{course.title}</h3>
                              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(course.status)}`}>
                                {course.status === 'inProgress' ? 'In Progress' : 
                                 course.status === 'completed' ? 'Completed' : 'Not Started'}
                              </span>
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-500 mb-3">
                              {getStatusIcon(course.status)}
                              <span className="ml-2">
                                {course.status === 'inProgress' ? 'Continue Learning' : 
                                 course.status === 'completed' ? 'Course Completed' : 'Not Enrolled Yet'}
                              </span>
                            </div>
                            
                            {/* Progress Bar */}
                            {course.status !== 'notStarted' && (
                              <div className="mb-4">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-500 h-2 rounded-full" 
                                    style={{ width: `${progress}%` }}
                                  ></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                  <span>{progress}% completed</span>
                                  <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                                </div>
                              </div>
                            )}
                            
                            <div className="mt-auto">
                              <button 
                                className={`w-full py-2 rounded-lg font-medium ${
                                  course.status === 'inProgress' 
                                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                    : course.status === 'completed'
                                    ? 'bg-green-500 hover:bg-green-600 text-white'
                                    : 'bg-gray-200 text-gray-600 cursor-not-allowed'
                                }`}
                              >
                                {course.status === 'inProgress' ? 'Continue Course' : 
                                 course.status === 'completed' ? 'View Certificate' : 'Start Course'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-6">Available Courses</h2>
            
            {availableCourses.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No courses available at the moment</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableCourses.map(course => (
                  <div key={course.id} className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    {/* Course Image with Category */}
                    <div className="relative">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-48 object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        {course.category}
                      </span>
                      <span className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center">
                        <FaPlayCircle className="mr-1" size={10} /> {course.videosCount} videos
                      </span>
                    </div>
                    
                    {/* Course Content */}
                    <div className="p-4">
                      <h3 className="font-medium text-lg mb-2">{course.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                      
                      {/* Price */}
                      <div className="mb-3">
                        {course.originalPrice && (
                          <span className="text-gray-400 line-through mr-2">${course.originalPrice.toFixed(2)}</span>
                        )}
                        <span className="text-blue-600 font-bold">${course.price.toFixed(2)}</span>
                      </div>
                      
                      {/* Rating */}
                      <div className="flex items-center mb-4">
                        <div className="flex mr-1">
                          {[...Array(5)].map((_, i) => (
                            i < Math.floor(course.rating) ? 
                              <FaStar key={i} className="text-yellow-400 text-sm" /> : 
                              <FaRegStar key={i} className="text-yellow-400 text-sm" />
                          ))}
                        </div>
                        <span className="text-gray-600 text-sm">
                          {course.rating} ({course.reviews} reviews)
                        </span>
                      </div>
                      
                      {/* Enroll Button */}
                      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center">
                        <FaShoppingCart className="mr-2" />
                        Enroll ({course.pointsRequired} points)
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;