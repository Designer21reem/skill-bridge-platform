import React, { useState } from 'react';

const Webinars = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const allWebinars = [
    {
      id: 1,
      title: 'Career Paths in Data Science',
      date: 'June 15, 2023',
      time: '2:00 PM - 3:30 PM (GMT)',
      speaker: 'Dr. Sarah Johnson, Data Scientist at TechCorp',
      description: 'Learn about the different career trajectories in data science and what skills you need for each path.',
      category: 'Tech',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      registrationLink: '#'
    },
    {
      id: 2,
      title: 'Ace Your Virtual Interview',
      date: 'June 18, 2023',
      time: '10:00 AM - 11:00 AM (GMT)',
      speaker: 'Michael Chen, HR Director at GlobalSoft',
      description: 'Practical tips and techniques to stand out in virtual interviews and make a great impression.',
      category: 'Career',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      registrationLink: '#'
    },
    {
      id: 3,
      title: 'Cloud Computing Certifications Explained',
      date: 'June 22, 2023',
      time: '4:00 PM - 5:30 PM (GMT)',
      speaker: 'Alex Martinez, Cloud Architect at CloudNine',
      description: 'Overview of major cloud certifications and how to choose the right one for your career goals.',
      category: 'Tech',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      registrationLink: '#'
    },
    {
      id: 7,
      title: 'Education Technology Trends',
      date: 'June 25, 2023',
      time: '1:00 PM - 2:30 PM (GMT)',
      speaker: 'Lisa Wong, EdTech Consultant',
      description: 'Discover the latest trends in education technology and how they impact learning outcomes.',
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      registrationLink: '#'
    },
    {
      id: 8,
      title: 'Mastering Technical Interviews',
      date: 'June 28, 2023',
      time: '3:00 PM - 4:30 PM (GMT)',
      speaker: 'James Wilson, Senior Software Engineer',
      description: 'Learn strategies to solve coding challenges and impress interviewers in technical interviews.',
      category: 'Interview Skills',
      image: 'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      registrationLink: '#'
    },
  ];

  const pastWebinars = [
    {
      id: 4,
      title: 'Building a Winning Resume in 2023',
      date: 'May 28, 2023',
      speaker: 'Jennifer Lee, Career Coach',
      recordingLink: '#',
      slidesLink: '#'
    },
    {
      id: 5,
      title: 'Networking Strategies for Introverts',
      date: 'May 20, 2023',
      speaker: 'David Wilson, Founder of ConnectPro',
      recordingLink: '#',
      slidesLink: '#'
    },
    {
      id: 6,
      title: 'Freelancing 101: Getting Started',
      date: 'May 15, 2023',
      speaker: 'Emma Rodriguez, Freelance Designer',
      recordingLink: '#',
      slidesLink: '#'
    },
  ];

  const categories = ['All', 'Tech', 'Career', 'Education', 'Interview Skills'];

  // Filter upcoming webinars based on selected category
  const filteredWebinars = selectedCategory === 'All' 
    ? allWebinars 
    : allWebinars.filter(webinar => webinar.category === selectedCategory);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#D8F2FF] text-gray-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Educational Webinars & Workshops</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Live and interactive sessions connecting education with employment opportunities
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Upcoming Webinars */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Upcoming Webinars</h2>
            <div className="mt-4 md:mt-0">
              <label htmlFor="category-filter" className="sr-only">Filter by category</label>
              <select
                id="category-filter"
                className="bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {filteredWebinars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredWebinars.map((webinar) => (
                <div key={webinar.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-[#D8F2FF]">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={webinar.image} 
                      alt={webinar.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <span className="inline-block bg-[#D8F2FF] text-blue-600 text-xs px-2 py-1 rounded-full">
                        {webinar.category}
                      </span>
                      <span className="text-gray-500 text-sm">{webinar.date}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{webinar.title}</h3>
                    <p className="text-gray-600 mb-4">{webinar.description}</p>
                    <div className="mb-4">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Speaker:</span> {webinar.speaker}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Time:</span> {webinar.time}
                      </p>
                    </div>
                    <a
                      href={webinar.registrationLink}
                      className="inline-block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Register Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 text-center border border-[#D8F2FF]">
              <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="text-xl font-semibold mt-4 text-gray-800">No webinars found</h3>
              <p className="text-gray-600 mt-2">There are no upcoming webinars in this category. Please check back later.</p>
            </div>
          )}
        </section>

        {/* Past Webinars */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Past Webinar Recordings</h2>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#D8F2FF]">
            <div className="divide-y divide-gray-200">
              {pastWebinars.map((webinar) => (
                <div key={webinar.id} className="p-6 hover:bg-[#D8F2FF] transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-lg font-semibold text-gray-800">{webinar.title}</h3>
                      <p className="text-gray-600">
                        {webinar.date} • {webinar.speaker}
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <a
                        href={webinar.recordingLink}
                        className="inline-flex items-center text-blue-600 hover:underline"
                      >
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Watch Recording
                      </a>
                      <a
                        href={webinar.slidesLink}
                        className="inline-flex items-center text-gray-600 hover:underline"
                      >
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        Download Slides
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-6">
            <a href="#" className="text-blue-600 font-medium hover:underline">
              View all past webinars →
            </a>
          </div>
        </section>

        {/* Webinar Benefits */}
        <section className="bg-[#D8F2FF] rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Why Attend Our Webinars?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-blue-600">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Industry Insights</h3>
              <p className="text-gray-600">
                Learn directly from professionals about current industry trends and requirements.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-blue-600">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Q&A Sessions</h3>
              <p className="text-gray-600">
                Get your specific questions answered during live interactive sessions.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-blue-600">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Certificates</h3>
              <p className="text-gray-600">
                Earn participation certificates to add to your resume or LinkedIn profile.
              </p>
            </div>
          </div>
        </section>

        {/* Host a Webinar */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-[#D8F2FF]">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Interested in Hosting a Webinar?</h2>
              <p className="text-gray-600 mb-4">
                Are you an industry expert or educator with valuable insights to share? We're always looking for knowledgeable speakers to contribute to our community.
              </p>
              <a
                href="#"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Propose a Webinar Topic
              </a>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="bg-[#D8F2FF] p-6 rounded-full">
                <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Webinars;