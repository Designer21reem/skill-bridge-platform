import React, { useState, useEffect } from 'react';
import { FaPlay, FaArrowRight } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';
import { useAuth } from '../../../../firebase/AuthContext';

const DashboardPage = ({ user, userCourses = [] }) => {
  const [activePeriod, setActivePeriod] = useState('Daily');
  const [courseIndex, setCourseIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [loadingPoints, setLoadingPoints] = useState(true);
  const { currentUser } = useAuth();

  // جلب نقاط المستخدم من Firebase
  useEffect(() => {
    const fetchUserPoints = async () => {
      if (!currentUser) return;
      
      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
          setPoints(userDocSnap.data().points || 0);
        }
      } catch (error) {
        console.error("Error fetching user points:", error);
      } finally {
        setLoadingPoints(false);
      }
    };

    fetchUserPoints();
  }, [currentUser]);

  // بيانات إحصائية
  const stats = [
    { title: "Courses completed", value: userCourses.filter(c => c.status === 'completed').length.toString().padStart(2, '0'), icon: "📚" },
    { title: "Total points gained", value: loadingPoints ? '...' : points.toString(), icon: "⭐" },
    { title: "Courses in progress", value: userCourses.filter(c => c.status === 'inProgress').length.toString().padStart(2, '0'), icon: "📈" },
    { title: "Tasks finished", value: "05", icon: "✅" }
  ];

  // بيانات النشاط
  const dailyData = [
    { name: 'Mon', value: 40 },
    { name: 'Tue', value: 60 },
    { name: 'Wed', value: 30 },
    { name: 'Thu', value: 80 },
    { name: 'Fri', value: 50 },
    { name: 'Sat', value: 70 },
    { name: 'Sun', value: 90 }
  ];

  const weeklyData = [
    { name: 'Week 1', value: 210 },
    { name: 'Week 2', value: 180 },
    { name: 'Week 3', value: 300 },
    { name: 'Week 4', value: 240 }
  ];

  const monthlyData = [
    { name: 'Jan', value: 800 },
    { name: 'Feb', value: 950 },
    { name: 'Mar', value: 1100 },
    { name: 'Apr', value: 750 },
    { name: 'May', value: 900 },
    { name: 'Jun', value: 1200 },
    { name: 'Jul', value: 850 },
    { name: 'Aug', value: 950 },
    { name: 'Sep', value: 1100 },
    { name: 'Oct', value: 1250 },
    { name: 'Nov', value: 1300 },
    { name: 'Dec', value: 1500 }
  ];

  const getActivityData = () => {
    switch(activePeriod) {
      case 'Weekly': return weeklyData;
      case 'Monthly': return monthlyData;
      default: return dailyData;
    }
  };

  // دمج الكورسات الأساسية مع الكورسات المستردة
  const allOngoingCourses = [
    {
      id: 1,
      title: "Advanced UI/UX Design",
      category: "Design",
      progress: 65,
      instructor: {
        name: "Sarah Johnson",
        role: "Senior Designer",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      thumbnail: "/assets/ui.png"
    },
    {
      id: 2,
      title: "React Native Development",
      category: "Development",
      progress: 30,
      instructor: {
        name: "Michael Chen",
        role: "Mobile Developer",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      thumbnail: "/assets/web.png"
    },
    {
      id: 3,
      title: "Data Science Fundamentals",
      category: "Data Science",
      progress: 45,
      instructor: {
        name: "David Wilson",
        role: "Data Scientist",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg"
      },
      thumbnail: "/assets/analysis.jpg"
    },
    {
      id: 4,
      title: "Digital Marketing",
      category: "Marketing",
      progress: 20,
      instructor: {
        name: "Emily Brown",
        role: "Marketing Expert",
        avatar: "https://randomuser.me/api/portraits/women/63.jpg"
      },
      thumbnail: "/assets/marketing.png"
    },
    ...userCourses.map(course => ({
      id: course.id + 100, // لتجنب تكرار الـ IDs
      title: course.title,
      category: course.skills[0] || "General",
      progress: course.progress || 0,
      instructor: {
        name: "System Instructor",
        role: "Course Provider",
        avatar: "https://randomuser.me/api/portraits/lego/1.jpg"
      },
      thumbnail: course.image || "/assets/default-course.png"
    }))
  ];

  const handleNextCourse = () => {
    setCourseIndex(prev => (prev + 2) % allOngoingCourses.length);
  };

  const handlePrevCourse = () => {
    setCourseIndex(prev => (prev - 2 + allOngoingCourses.length) % allOngoingCourses.length);
  };

  // بيانات عروض العمل
  const jobOffers = [
    {
      id: 1,
      company: "TechSolutions Inc.",
      position: "Senior UI Designer",
      description: "We've seen your skills match perfectly with our design team requirements.",
      logo: "/assets/google.png"
    },
    {
      id: 2,
      company: "Digital Innovations",
      position: "Frontend Developer",
      description: "Your portfolio impressed our hiring team. Let's discuss opportunities.",
      logo: "/assets/ibm.png"
    }
  ];

  return (
    <>
      {/* قسم الدعوة */}
      <div className="bg-blue-600 text-white rounded-xl p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <span className="inline-block px-2 py-1 bg-blue-700 rounded-md text-xs mb-2">ONLINE COURSE</span>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Sharpen Your Skills With Professional Online Courses</h2>
            <button className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium mt-4">
              <FaPlay size={12} />
              <span>Join Now</span>
            </button>
          </div>
          <div className="hidden md:block">
            <img 
              src="/assets/stars.png" 
              alt="Online Course" 
              className="h-40 rounded-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assets/default-course.png";
              }}
            />
          </div>
        </div>
      </div>

      {/* قسم متابعة المشاهدة */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Continue Watching</h2>
          <div className="flex space-x-2">
            <button 
              className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
              onClick={handlePrevCourse}
            >
              <IoChevronBackOutline />
            </button>
            <button 
              className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
              onClick={handleNextCourse}
            >
              <IoChevronForwardOutline />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allOngoingCourses.slice(courseIndex, courseIndex + 2).map(course => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="h-48 w-full overflow-hidden bg-gray-100">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/default-course.png";
                  }}
                />
              </div>
              <div className="p-4">
                <span className="text-xs text-gray-500">{course.category}</span>
                <h3 className="font-medium mt-1">{course.title}</h3>
                
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{course.progress}% completed</span>
                    <span>Continue</span>
                  </div>
                </div>
                
                <div className="flex items-center mt-4">
                  <img 
                    src={course.instructor.avatar} 
                    alt={course.instructor.name} 
                    className="w-8 h-8 rounded-full mr-2"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://randomuser.me/api/portraits/lego/1.jpg";
                    }}
                  />
                  <div>
                    <p className="text-sm font-medium">{course.instructor.name}</p>
                    <p className="text-xs text-gray-500">{course.instructor.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* قسم الإحصائيات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className="text-2xl">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* قسم النشاط */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Activity</h2>
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1 text-sm rounded-md ${activePeriod === 'Daily' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
              onClick={() => setActivePeriod('Daily')}
            >
              Daily
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md ${activePeriod === 'Weekly' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
              onClick={() => setActivePeriod('Weekly')}
            >
              Weekly
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md ${activePeriod === 'Monthly' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
              onClick={() => setActivePeriod('Monthly')}
            >
              Monthly
            </button>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getActivityData()}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* قسم عروض العمل */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Job Offers</h2>
        <div className="grid grid-cols-1 gap-4">
          {jobOffers.map(job => (
            <div key={job.id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex items-start">
                <div className="w-16 h-16 flex-shrink-0 mr-4 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden">
                  <img 
                    src={job.logo} 
                    alt={job.company} 
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/assets/default-company.png";
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{job.position}</h3>
                  <p className="text-sm text-gray-500 mb-2">{job.company}</p>
                  <p className="text-sm mb-3">{job.description}</p>
                  <button className="text-blue-600 text-sm font-medium">
                    View Job Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* قسم ترقية الخطة */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold mb-2">Upgrade your plan</h2>
            <p className="text-blue-100">Get access to all features and unlimited courses</p>
          </div>
          <button className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium">
            <span>Go to PRO</span>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;