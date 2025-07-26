import React from 'react';
import { FaCheckCircle, FaLock, FaArrowRight, FaPlayCircle } from 'react-icons/fa';

const CoursesPage = ({ userCourses = [] }) => {
  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <FaCheckCircle className="text-green-500" />;
      case 'inProgress':
        return <FaPlayCircle className="text-blue-500" />; // تغيير هنا
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

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-6">My Courses</h2>
        
        {userCourses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">You don't have any courses yet</p>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg mx-auto">
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
      </div>
    </div>
  );
};

export default CoursesPage;