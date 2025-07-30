import React from 'react';

const CertificatesPage = () => {
  const certificates = [
    {
      id: 1,
      title: "React Developer Certification",
      issuer: "Meta",
      date: "15 Jan 2023",
      credentialId: "RCT-2023-0015",
      description: "For completing the advanced React course with honors",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
    },
    {
      id: 2,
      title: "UI/UX Design Professional",
      issuer: "Google",
      date: "10 Dec 2022",
      credentialId: "UXD-2022-1210",
      description: "User experience design specialization",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
    },
    {
      id: 3,
      title: "JavaScript Advanced Concepts",
      issuer: "The Odin Project",
      date: "5 Mar 2023",
      credentialId: "JS-2023-0305",
      description: "Mastered advanced JavaScript patterns and techniques",
      logo: "https://www.theodinproject.com/favicon-32x32.png"
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Certificates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div 
            key={cert.id}
            className="relative border-2 border-amber-100 rounded-lg p-5 bg-gradient-to-br from-amber-50 to-white hover:shadow-md transition-shadow duration-300"
          >
            <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full p-2 shadow-sm border border-gray-100">
              <img 
                src={cert.logo} 
                alt={`${cert.issuer} logo`} 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/48";
                }}
              />
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-800">{cert.title}</h3>
              <p className="text-sm text-gray-600">{cert.issuer}</p>
            </div>
            
            <p className="text-sm text-gray-700 mb-3">{cert.description}</p>
            
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-amber-200">
              <div>
                <p className="text-xs text-gray-500">Issued on</p>
                <p className="text-sm font-medium text-gray-700">{cert.date}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Credential ID</p>
                <p className="text-xs font-mono text-gray-600">{cert.credentialId}</p>
              </div>
            </div>
            
            <div className="absolute bottom-2 right-2">
              <svg className="w-16 h-16 text-amber-100 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty State */}
      {certificates.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-1">No certificates yet</h3>
          <p className="text-gray-500">Your earned certificates will appear here</p>
        </div>
      )}
    </div>
  );
};

export default CertificatesPage;