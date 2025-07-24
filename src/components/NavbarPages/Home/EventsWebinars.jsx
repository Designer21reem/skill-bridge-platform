import React, { useState } from 'react';

const EventsWebinars = () => {
  const [activeTab, setActiveTab] = useState('All Events');
  const [hoveredEvent, setHoveredEvent] = useState(null);

  const tabs = ['All Events', 'Webinars', 'Workshop', 'Conferences', 'Q&A Session'];

  const events = [
    {
      id: 1,
      type: 'Webinars',
      title: 'Advanced React Patterns',
      description: 'Learn advanced React patterns from industry experts to take your skills to the next level.',
      date: 'June 5, 2025',
      time: '2:00 PM - 4:00 PM AST (Iraq Time)',
      speaker: {
        name: 'Ahmed Al-Mansoori',
        role: 'Senior React Developer at TechCo',
        image: '/assets/p1.png'
      },
      image: '/assets/web.png'
    },
    {
      id: 2,
      type: 'Workshop',
      title: 'UX Design Fundamentals',
      description: 'Hands-on workshop covering the essential principles of user experience design.',
      date: 'June 12, 2025',
      time: '10:00 AM - 2:00 PM AST (Iraq Time)',
      speaker: {
        name: 'Layla Hassan',
        role: 'Lead UX Designer at DesignHub',
        image: '/assets/p5.png'
      },
      image: '/assets/ux.jpg'
    },
    {
      id: 3,
      type: 'Conferences',
      title: 'Future of AI in Business',
      description: 'Explore how artificial intelligence is transforming modern business operations.',
      date: 'June 20, 2025',
      time: '4:00 PM - 6:00 PM AST (Iraq Time)',
      speaker: {
        name: 'Omar Khalid',
        role: 'AI Research Director at FutureTech',
        image: '/assets/p7.png'
      },
      image: '/assets/analysis.jpg'
    },
    {
      id: 4,
      type: 'Q&A Session',
      title: 'Career in Data Science',
      description: 'Get your questions answered about starting and growing a career in data science.',
      date: 'June 28, 2025',
      time: '3:00 PM - 5:00 PM AST (Iraq Time)',
      speaker: {
        name: 'Sarah Al-Farsi',
        role: 'Data Science Manager at DataWorks',
        image: '/assets/p2.png'
      },
      image: '/assets/marketing2.png'
    }
  ];

  const filteredEvents = activeTab === 'All Events' 
    ? events 
    : events.filter(event => event.type === activeTab);

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[30px] md:text-[50px] lg:text-[50px] font-['Abhaya+Libre'] font-bold text-gray-900 mb-4">Upcoming Events & Webinars</h2>
          <p className="text-[15px] w-[300px] md:text-[20px] md:w-[500px]  font-['Murecho']  text-gray-600 max-w-3xl mx-auto">
            Join our live events and webinars to learn from industry experts, network with peers, and enhance your skills
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full  font-['Murecho']  text-sm font-medium transition-all duration-300
                ${activeTab === tab 
                  ? 'bg-blue-600 text-white shadow-md transform scale-105' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div 
              key={event.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              onMouseEnter={() => setHoveredEvent(event.id)}
              onMouseLeave={() => setHoveredEvent(null)}
            >
              {/* Event Image with Focus Effect */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className={`w-full h-full object-cover transition-transform duration-500
                    ${hoveredEvent === event.id ? 'scale-110' : 'scale-100'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="bg-blue-600 text-xs px-3 py-1 rounded-full">
                    {event.type}
                  </span>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6">
                <div className="mb-4 flex flex-row items-center justify-between">
                  <p className="text-gray-500 text-sm">{event.date}</p>
                  <p className="text-gray-500 text-sm">{event.time}</p>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>

                {/* Speaker Info */}
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <img 
                      src={event.speaker.image} 
                      alt={event.speaker.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{event.speaker.name}</h4>
                    <p className="text-gray-500 text-sm">{event.speaker.role}</p>
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-300">
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300">
            View All Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventsWebinars;