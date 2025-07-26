// import React, { useState } from 'react';
// import { FaLock, FaLockOpen, FaCheckCircle, FaTimes } from 'react-icons/fa';

// const PointsPage = ({ userCourses = [], setUserCourses = () => {}, userPoints: initialUserPoints = 250, setUserPoints = () => {} }) => {
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [userPoints, setUserPointsLocal] = useState(initialUserPoints);
  
//   const availableCourses = [
//     {
//       id: 1,
//       title: "Advanced UI/UX Design",
//       description: "Learn professional design techniques and tools to create stunning user interfaces and experiences.",
//       pointsRequired: 200,
//       image: "/assets/design-course.jpg",
//       skills: ["Figma", "User Research", "Prototyping"],
//       status: "available"
//     },
//     {
//       id: 2,
//       title: "React Native Development",
//       description: "Build cross-platform mobile applications using React Native framework with modern best practices.",
//       pointsRequired: 300,
//       image: "/assets/react-native.jpg",
//       skills: ["JavaScript", "React", "Mobile Development"],
//       status: "available"
//     },
//     {
//       id: 3,
//       title: "Data Science Fundamentals",
//       description: "Introduction to data analysis, visualization and machine learning concepts for beginners.",
//       pointsRequired: 250,
//       image: "/assets/data-science.jpg",
//       skills: ["Python", "Pandas", "Data Visualization"],
//       status: "available"
//     },
//     {
//       id: 4,
//       title: "Advanced JavaScript",
//       description: "Master advanced JavaScript concepts and modern ES6+ features.",
//       pointsRequired: 150,
//       image: "/assets/javascript.jpg",
//       skills: ["ES6", "Async/Await", "Design Patterns"],
//       status: "available"
//     }
//   ].filter(course => !userCourses.some(uc => uc.id === course.id));

//   const handleRedeemClick = (course) => {
//     setSelectedCourse(course);
//     setShowConfirmation(true);
//   };

//   const confirmRedeem = () => {
//     setIsLoading(true);
//     setShowConfirmation(false);
    
//     // Simulate API call
//     setTimeout(() => {
//       const newPoints = userPoints - selectedCourse.pointsRequired;
      
//       // Update local and parent component points
//       setUserPointsLocal(newPoints);
//       setUserPoints(newPoints);
      
//       // Update user's courses
//       setUserCourses(prev => [...prev, { 
//         ...selectedCourse, 
//         status: "inProgress",
//         progress: 0,
//         completedLessons: 0,
//         totalLessons: 10,
//         startDate: new Date().toISOString()
//       }]);
      
//       setIsLoading(false);
//       setShowSuccess(true);
      
//       // Hide success message after 3 seconds
//       setTimeout(() => setShowSuccess(false), 3000);
//     }, 1500);
//   };

//   const cancelRedeem = () => {
//     setSelectedCourse(null);
//     setShowConfirmation(false);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Points Summary Card */}
//       <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//         <h2 className="text-xl font-semibold mb-4">My Points</h2>
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-3xl font-bold">{userPoints}</p>
//             <p className="text-gray-500">Total Points</p>
//           </div>
//           <div className="text-yellow-500 text-2xl">⭐</div>
//         </div>
//       </div>

//       {/* Available Courses */}
//       <div className="space-y-4">
//         <h2 className="text-xl font-semibold">Available Courses</h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {availableCourses.map(course => {
//             const canRedeem = userPoints >= course.pointsRequired;
            
//             return (
//               <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//                 <div className="flex flex-col md:flex-row">
//                   {/* Course Image */}
//                   <div className="md:w-1/3 h-48 bg-gray-100">
//                     <img 
//                       src={course.image} 
//                       alt={course.title} 
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
                  
//                   {/* Course Content */}
//                   <div className="p-4 md:p-6 flex-1">
//                     <div className="flex flex-col h-full">
//                       <div className="flex-1">
//                         <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
//                         <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                        
//                         <div className="mb-4">
//                           <h4 className="text-sm font-medium mb-1">You'll learn:</h4>
//                           <div className="flex flex-wrap gap-2">
//                             {course.skills.map((skill, index) => (
//                               <span key={index} className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs">
//                                 {skill}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center justify-between pt-3 border-t border-gray-100">
//                         <div className="text-sm text-gray-500">
//                           <span className="font-medium">{userPoints}</span>/{course.pointsRequired} points
//                         </div>
                        
//                         <button 
//                           onClick={() => handleRedeemClick(course)}
//                           className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
//                             canRedeem 
//                               ? 'bg-green-500 hover:bg-green-600 text-white' 
//                               : 'bg-gray-200 text-gray-600 cursor-not-allowed'
//                           }`}
//                           disabled={!canRedeem}
//                         >
//                           {canRedeem ? (
//                             <>
//                               <span>Get Course Free</span>
//                               <FaLockOpen />
//                             </>
//                           ) : (
//                             <>
//                               <span>Get Course Free</span>
//                               <FaLock />
//                             </>
//                           )}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Confirmation Modal */}
//       {showConfirmation && (
//         <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl p-6 w-full max-w-md">
//             <div className="flex justify-between items-start mb-4">
//               <h3 className="text-xl font-semibold">Confirm Redemption</h3>
//               <button onClick={cancelRedeem} className="text-gray-500 hover:text-gray-700">
//                 <FaTimes />
//               </button>
//             </div>
//             <p className="mb-6">Are you sure you want to redeem <span className="font-semibold">{selectedCourse?.title}</span> for <span className="font-semibold">{selectedCourse?.pointsRequired} points</span>?</p>
//             <div className="flex justify-end gap-3">
//               <button 
//                 onClick={cancelRedeem}
//                 className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button 
//                 onClick={confirmRedeem}
//                 className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Loading Overlay */}
//       {isLoading && (
//         <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl flex flex-col items-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
//             <p>Processing your request...</p>
//           </div>
//         </div>
//       )}

//       {/* Success Modal */}
//       {showSuccess && (
//         <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl flex flex-col items-center max-w-sm text-center">
//             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
//               <FaCheckCircle className="text-green-500 text-3xl" />
//             </div>
//             <h3 className="text-xl font-semibold mb-2">Redemption Successful!</h3>
//             <p className="text-gray-600 mb-4">You've successfully redeemed <span className="font-medium">{selectedCourse?.title}</span>.</p>
//             <button 
//               onClick={() => setShowSuccess(false)}
//               className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//             >
//               Continue
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PointsPage;
import React, { useState } from 'react';
import { FaLock, FaLockOpen, FaCheckCircle, FaTimes } from 'react-icons/fa';

const PointsPage = ({ userCourses = [], setUserCourses = () => {}, userPoints: initialUserPoints = 250, setUserPoints = () => {} }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userPoints, setUserPointsLocal] = useState(initialUserPoints);
  
  const availableCourses = [
    {
      id: 1,
      title: "Advanced UI/UX Design",
      description: "Learn professional design techniques and tools to create stunning user interfaces and experiences.",
      pointsRequired: 200,
      image: "/assets/design-course.jpg",
      skills: ["Figma", "User Research", "Prototyping"],
      status: "available"
    },
    {
      id: 2,
      title: "React Native Development",
      description: "Build cross-platform mobile applications using React Native framework with modern best practices.",
      pointsRequired: 300,
      image: "/assets/react-native.jpg",
      skills: ["JavaScript", "React", "Mobile Development"],
      status: "available"
    },
    {
      id: 3,
      title: "Data Science Fundamentals",
      description: "Introduction to data analysis, visualization and machine learning concepts for beginners.",
      pointsRequired: 250,
      image: "/assets/data-science.jpg",
      skills: ["Python", "Pandas", "Data Visualization"],
      status: "available"
    },
    {
      id: 4,
      title: "Advanced JavaScript",
      description: "Master advanced JavaScript concepts and modern ES6+ features.",
      pointsRequired: 150,
      image: "/assets/javascript.jpg",
      skills: ["ES6", "Async/Await", "Design Patterns"],
      status: "available"
    }
  ].filter(course => !userCourses.some(uc => uc.id === course.id));

  const handleRedeemClick = (course) => {
    setSelectedCourse(course);
    setShowConfirmation(true);
  };

  const confirmRedeem = () => {
    setIsLoading(true);
    setShowConfirmation(false);
    
    // Simulate API call
    setTimeout(() => {
      const newPoints = userPoints - selectedCourse.pointsRequired;
      
      // Update local and parent component points
      setUserPointsLocal(newPoints);
      setUserPoints(newPoints);
      
      // Update user's courses
      setUserCourses(prev => [...prev, { 
        ...selectedCourse, 
        status: "inProgress",
        progress: 0,
        completedLessons: 0,
        totalLessons: 10,
        startDate: new Date().toISOString()
      }]);
      
      setIsLoading(false);
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const cancelRedeem = () => {
    setSelectedCourse(null);
    setShowConfirmation(false);
  };

  return (
    <div className="space-y-6">
      {/* Points Summary Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">My Points</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">{userPoints}</p>
            <p className="text-gray-500">Total Points</p>
          </div>
          <div className="text-yellow-500 text-2xl">⭐</div>
        </div>
      </div>

      {/* Available Courses */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Available Courses</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableCourses.map(course => {
            const canRedeem = userPoints >= course.pointsRequired;
            
            return (
              <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Course Image */}
                  <div className="md:w-1/3 h-48 bg-gray-100">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Course Content */}
                  <div className="p-4 md:p-6 flex-1">
                    <div className="flex flex-col h-full">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                        
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-1">You'll learn:</h4>
                          <div className="flex flex-wrap gap-2">
                            {course.skills.map((skill, index) => (
                              <span key={index} className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">{userPoints}</span>/{course.pointsRequired} points
                        </div>
                        
                        <button 
                          onClick={() => handleRedeemClick(course)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                            canRedeem 
                              ? 'bg-green-500 hover:bg-green-600 text-white' 
                              : 'bg-gray-200 text-gray-600 cursor-not-allowed'
                          }`}
                          disabled={!canRedeem}
                        >
                          {canRedeem ? (
                            <>
                              <span>Get Course Free</span>
                              <FaLockOpen />
                            </>
                          ) : (
                            <>
                              <span>Get Course Free</span>
                              <FaLock />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">Confirm Redemption</h3>
              <button onClick={cancelRedeem} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>
            <p className="mb-6">Are you sure you want to redeem <span className="font-semibold">{selectedCourse?.title}</span> for <span className="font-semibold">{selectedCourse?.pointsRequired} points</span>?</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={cancelRedeem}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={confirmRedeem}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p>Processing your request...</p>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl flex flex-col items-center max-w-sm text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <FaCheckCircle className="text-green-500 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Redemption Successful!</h3>
            <p className="text-gray-600 mb-4">You've successfully redeemed <span className="font-medium">{selectedCourse?.title}</span>.</p>
            <button 
              onClick={() => setShowSuccess(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PointsPage;