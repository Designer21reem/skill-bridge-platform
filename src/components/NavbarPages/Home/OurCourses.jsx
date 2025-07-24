import React,{ useState} from 'react';
import { FiVideo, FiStar, FiShoppingCart } from 'react-icons/fi';

const OurCourses = () => {
   const [activeTab, setActiveTab] = useState('All courses');
  
  // قائمة التصنيفات
  const tabs = [
    'All courses',
    'UI/UX Design',
    'Web Development',
    'Marketing & Communication',
    'Digital Marketing',
    'Business Consulting'
  ];

  // بيانات الكورسات الكاملة
  const coursesData = {
    'All courses': [
      {
        id: 1,
        title: 'Advanced UI/UX Design',
        type: 'UI/UX',
        videos: 24,
        price: 149,
        discount: 99,
        rating: 4.8,
        image: '/assets/ui.png',
        description: 'Learn modern UI/UX design principles and tools'
      },
      {
        id: 2,
        title: 'React JS Complete Guide',
        type: 'Web Dev',
        videos: 36,
        price: 199,
        discount: 149,
        rating: 4.9,
        image: '/assets/web.png',
        description: 'Master React from basics to advanced concepts'
      },
      {
        id: 3,
        title: 'Digital Marketing Fundamentals',
        type: 'Marketing',
        videos: 18,
        price: 129,
        discount: 89,
        rating: 4.5,
        image: '/assets/marketing.png',
        description: 'Essential digital marketing strategies for beginners'
      }
    ],
    'UI/UX Design': [
      {
        id: 1,
        title: 'Advanced UI/UX Design',
        type: 'UI/UX',
        videos: 24,
        price: 149,
        discount: 99,
        rating: 4.8,
        image: '/assets/ux.jpg',
        description: 'Learn modern UI/UX design principles and tools'
      },
      {
        id: 4,
        title: 'Figma for Beginners',
        type: 'UI/UX',
        videos: 12,
        price: 99,
        discount: 69,
        rating: 4.7,
        image: '/assets/ui.png',
        description: 'Get started with Figma for UI design'
      }
    ],
    'Web Development': [
      {
        id: 2,
        title: 'React JS Complete Guide',
        type: 'Web Dev',
        videos: 36,
        price: 199,
        discount: 149,
        rating: 4.9,
        image: '/assets/web.png',
        description: 'Master React from basics to advanced concepts'
      },
      {
        id: 5,
        title: 'Node.js Backend Development',
        type: 'Web Dev',
        videos: 28,
        price: 179,
        discount: 129,
        rating: 4.6,
        image: '/assets/web.png',
        description: 'Build scalable backend services with Node.js'
      }
    ],
    'Marketing & Communication': [
      {
        id: 6,
        title: 'Content Marketing Strategy',
        type: 'Marketing',
        videos: 14,
        price: 119,
        discount: 79,
        rating: 4.4,
        image: '/assets/marketing.png',
        description: 'Create effective content marketing campaigns'
      }
    ],
    'Digital Marketing': [
      {
        id: 3,
        title: 'Digital Marketing Fundamentals',
        type: 'Marketing',
        videos: 18,
        price: 129,
        discount: 89,
        rating: 4.5,
        image: '/assets/marketing2.png',
        description: 'Essential digital marketing strategies for beginners'
      },
      {
        id: 7,
        title: 'SEO Optimization Techniques',
        type: 'Marketing',
        videos: 16,
        price: 139,
        discount: 99,
        rating: 4.7,
        image: '/assets/seo.jpg',
        description: 'Improve your website ranking with SEO'
      }
    ],
    'Business Consulting': [
      {
        id: 8,
        title: 'Startup Business Strategies',
        type: 'Business',
        videos: 20,
        price: 159,
        discount: 119,
        rating: 4.8,
        image: '/assets/analysis.jpg',
        description: 'Learn how to launch and grow your startup'
      }
    ]
  };

  return (
    <div className="bg-white p-8 rounded-lg  mt-[173px]">
      {/* horizontal line */}
      <hr className="border-gray-300 mb-6" />
      {/* Title and description */}
      <div className="text-center mb-8 flex flex-col items-center">
        <p className="text-gray-600 border-2 mb-12 border-[#888888] w-[130px] mt-[-24px] text-center rounded-full px-4 py-1">Our Courses</p>
        <h1 className="text-[50px] font-bold text-black font-['Abhaya+Libre'] mb-6">Courses Designed for Success</h1>
        <p className="text-[24px] md:w-[600px] text-gray-600 mb-6 font-['Murecho']">
          Start your journey with  
        courses that build real-world skills and knowledge.
        Get access to high -quality courses taught by industry professionals.
        </p>
      </div>
      {/* Course cards would go here */}
{/* شريط التصنيفات */}
      <div className="flex flex-wrap justify-center gap-4 mb-12 border-b pb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-lg font-medium px-6 py-2 transition-all duration-300 ${
              activeTab === tab 
                ? 'text-blue-600 border-b-2 border-blue-600 font-semibold' 
                : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* بطاقات الكورسات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {coursesData[activeTab]?.map((course) => (
          <div 
            key={course.id} 
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* صورة الكورس */}
            <div className="h-48 bg-gray-200 relative overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                {course.type}
              </span>
            </div>

            {/* محتوى البطاقة */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
                <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                  <FiStar className="text-yellow-400 mr-1" />
                  <span className="text-sm font-medium text-yellow-700">{course.rating}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-4 text-sm">{course.description}</p>

              <div className="flex items-center text-gray-500 mb-4">
                <FiVideo className="mr-2 text-blue-500" />
                <span className="text-sm">{course.videos} video lessons</span>
              </div>

              <div className="flex items-center justify-between mb-5">
                <div>
                  {course.discount && (
                    <span className="text-gray-400 line-through mr-2 text-sm">${course.price}</span>
                  )}
                  <span className="text-blue-600 font-bold text-lg">${course.discount || course.price}</span>
                </div>
                {course.discount && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    {Math.round(100 - (course.discount / course.price * 100))}% OFF
                  </span>
                )}
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-300">
                <FiShoppingCart className="mr-2" />
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* زر عرض المزيد */}
      <div className="text-center mt-10">
        <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg transition-colors duration-300">
          View All Courses
        </button>
      </div>
    </div>
  );
};

export default OurCourses;