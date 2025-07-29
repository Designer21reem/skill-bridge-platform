import React from 'react';

const Tech = () => {
  const trendingSkills = [
    { name: 'Artificial Intelligence', certification: 'Google AI Fundamentals', demand: 'High' },
    { name: 'Data Science', certification: 'IBM Data Science Professional', demand: 'Very High' },
    { name: 'Cloud Computing', certification: 'AWS Certified Solutions Architect', demand: 'High' },
    { name: 'Cybersecurity', certification: 'CEH (Certified Ethical Hacker)', demand: 'Growing' },
  ];

  const freeTools = [
    { name: 'GitHub Student Pack', description: 'Free access to developer tools', link: '#' },
    { name: 'Google Cloud Training', description: 'Free courses and labs', link: '#' },
    { name: 'Microsoft Learn', description: 'Interactive learning paths', link: '#' },
    { name: 'Coursera Financial Aid', description: 'Free courses for eligible students', link: '#' },
  ];

  const upcomingWebinars = [
    { title: 'How to Build a Tech Portfolio', date: 'June 15, 2023', link: '#' },
    { title: 'AWS Certification Roadmap', date: 'June 22, 2023', link: '#' },
    { title: 'Data Science Career Paths', date: 'July 5, 2023', link: '#' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#D8F2FF] text-gray-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Tech Skills for Future Jobs</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover the most in-demand technical skills and certifications that will boost your employability
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Trending Skills Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Trending Technical Skills in 2023
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingSkills.map((skill, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-[#D8F2FF]">
                <h3 className="text-xl font-semibold mb-2 text-blue-600">{skill.name}</h3>
                <p className="text-gray-600 mb-3">
                  <span className="font-medium">Certification:</span> {skill.certification}
                </p>
                <div className="flex items-center">
                  <span className="font-medium mr-2">Demand:</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    skill.demand === 'Very High' ? 'bg-red-100 text-red-800' :
                    skill.demand === 'High' ? 'bg-orange-100 text-orange-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {skill.demand}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Free Tools Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Free Learning Resources for Students
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {freeTools.map((tool, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 flex items-start hover:shadow-lg transition-shadow border border-[#D8F2FF]">
                <div className="bg-[#D8F2FF] p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-blue-600">{tool.name}</h3>
                  <p className="text-gray-600 mb-3">{tool.description}</p>
                  <a href={tool.link} className="text-blue-600 font-medium hover:underline">
                    Access Resource →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Webinars Section */}
        <section className="mb-16 bg-[#D8F2FF] rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Upcoming Tech Webinars
          </h2>
          <div className="max-w-3xl mx-auto">
            {upcomingWebinars.map((webinar, index) => (
              <div key={index} className="mb-4 last:mb-0 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-blue-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{webinar.title}</h3>
                    <p className="text-gray-600">{webinar.date}</p>
                  </div>
                  <a href={webinar.link} className="mt-2 md:mt-0 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Register Now
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <a href="/webinars" className="text-blue-600 font-medium hover:underline">
              View all tech webinars →
            </a>
          </div>
        </section>

        {/* Resume Tips Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            How to Showcase Tech Skills in Your Resume
          </h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#D8F2FF]">
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Do's</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>List specific technologies (e.g., "Python, TensorFlow")</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Include relevant projects with GitHub links</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Mention certifications with dates</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 bg-[#D8F2FF] p-8">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Don'ts</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Don't just list "Microsoft Office" as a tech skill</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Avoid vague terms like "computer literate"</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Don't include outdated technologies unless relevant</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      
    </div>
  );
};

export default Tech;