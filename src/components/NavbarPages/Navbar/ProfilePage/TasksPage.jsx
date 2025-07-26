import React, { useState } from 'react';
import { IoCheckmarkDone } from 'react-icons/io5';
import { MdOutlineAccessTime } from 'react-icons/md';

const TasksPage = () => {
  const [activeTab, setActiveTab] = useState('new');

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header with Tasks title and navigation bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8 gap-4">
        <h1 className="text-2xl font-['Abhaya+Libre'] sm:text-3xl font-bold">Tasks</h1>
        
        <div className="flex font-['murhecho'] items-center pl-13Z md:pl-1 bg-blue-50 rounded-lg p-1 shadow-sm flex-row gap-2 md:gap-3 lg:gap-4">
          <button
            className={`px-3 sm:px-4 md:px-5 py-2 rounded-md font-medium text-sm sm:text-base whitespace-nowrap ${
              activeTab === 'new' ? 'text-white bg-blue-600' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('new')}
          >
            New Tasks
          </button>
          <button
            className={`px-3 sm:px-4 md:px-5 py-2 rounded-md font-medium text-sm sm:text-base whitespace-nowrap ${
              activeTab === 'old' ? 'text-white bg-blue-600' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('old')}
          >
            Old Tasks
          </button>
          <button
            className={`px-3 sm:px-4 md:px-5 py-2 rounded-md font-medium text-sm sm:text-base whitespace-nowrap ${
              activeTab === 'finished' ? 'text-white bg-blue-600' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('finished')}
          >
            Finished Tasks
          </button>
        </div>
        <div className="hidden md:block md:w-1/4"></div>
      </div>

      {/* Task Cards */}
      <div className="space-y-4 md:space-y-6 ">
        {activeTab === 'new' && (
          <>
            <TaskCard 
              title="Design a commercial website" 
              description="Create a fully responsive website for a retail business within 3 days."
              points={250}
              deadline="May 30, 2023"
              status="new"
              image="assets/design2.png"
            />
            <TaskCard 
              title="Build React dashboard" 
              description="Develop an admin dashboard with authentication and data visualization."
              points={150}
              deadline="June 5, 2023"
              status="new"
              image="assets/dashboard.png"
            />
          </>
        )}

        {activeTab === 'old' && (
          <>
            <TaskCard 
              title="Social media campaign" 
              description="Create content strategy for new product launch across 3 platforms."
              points={200}
              deadline="May 15, 2023"
              status="old"
              image="assets/lanch.jpg"
            />
            <TaskCard 
              title="Technical blog posts" 
              description="Write 10 articles about modern JavaScript frameworks."
              points={100}
              deadline="April 28, 2023"
              status="old"
              image="assets/javascript.png"
            />
          </>
        )}

        {activeTab === 'finished' && (
          <>
            <TaskCard 
              title="Mobile app redesign" 
              description="Improve user experience for our e-commerce app."
              points={180}
              deadline="May 10, 2023"
              status="finished"
              image="assets/design.png"
            />
            <TaskCard 
              title="Website SEO optimization" 
              description="Increase organic traffic by optimizing for 10 keywords."
              points={120}
              deadline="April 20, 2023"
              status="finished"
              image="assets/seo.jpg"
            />
          </>
        )}
      </div>
    </div>
  );
};

const TaskCard = ({ title, description, points, deadline, status, image }) => {
  return (
    <div className="flex flex-col md:flex-row border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image section - hidden on small screens */}
      <div className="hidden md:block md:w-1/4 bg-gray-100 p-4 flex items-center justify-center">
        <div className="w-full h-48 overflow-hidden rounded-lg flex items-center justify-center">
          <img 
            src={image} 
            alt="Task visual"
            className="object-contain w-full h-full max-w-full max-h-full"
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
      
      {/* Content section */}
      <div className="flex-1 p-4 md:p-6">
        {/* Challenge header with points and deadline */}
        <div className="flex justify-between items-start mb-2 md:mb-3">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold font-['Abhaya+Libre'] text-blue-600 mb-1">CHALLENGE</h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
              <span className="text-blue-600 font-bold text-base md:text-lg">+{points} points</span>
            </div>
          </div>
          <div className="flex items-center text-gray-500 text-sm md:text-base">
            <MdOutlineAccessTime className="mr-2" />
            <span>{deadline}</span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">{description}</p>
        
        {/* Footer with action button */}
        <div className="flex justify-end">
          <div className="self-end sm:self-auto">
            {status === 'new' && (
              <button className="bg-blue-600 text-white px-4 py-1.5 md:px-6 md:py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base">
                Start the Challenge
              </button>
            )}
            
            {status === 'old' && (
              <button className="bg-gray-600 line-through text-gray-400 px-4 py-1.5 md:px-6 md:py-2 rounded-lg cursor-not-allowed text-sm md:text-base">
                Start the challenge
              </button>
            )}
            
            {status === 'finished' && (
              <div className="flex items-center text-green-600 font-medium text-sm md:text-base">
                <IoCheckmarkDone className="mr-1 text-lg md:text-xl" />
                <span>Completed</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;