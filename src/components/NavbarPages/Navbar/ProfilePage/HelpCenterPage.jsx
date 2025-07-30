import React from 'react';
import { 
  FaComments, 
  FaCertificate, 
  FaBook, 
  FaCog, 
  FaGift, 
  FaTools, 
  FaQuestionCircle 
} from 'react-icons/fa';

const HelpCenterPage = () => {
  const helpCategories = [
    {
      icon: <FaComments className="text-blue-500 text-2xl" />,
      title: "Live Chat Support",
      description: "Get instant help from our support team through live chat. Available 24/7 for all your urgent inquiries."
    },
    {
      icon: <FaCertificate className="text-green-500 text-2xl" />,
      title: "Certificate Issues",
      description: "Having trouble with your course certificates? Download, verify, or report issues with your credentials."
    },
    {
      icon: <FaBook className="text-purple-500 text-2xl" />,
      title: "Course Help",
      description: "Need assistance with course materials, assignments, or understanding concepts? We're here to help."
    },
    {
      icon: <FaCog className="text-gray-500 text-2xl" />,
      title: "Account Settings",
      description: "Manage your profile, update personal information, change password, or configure notification preferences."
    },
    {
      icon: <FaGift className="text-yellow-500 text-2xl" />,
      title: "Points and Rewards",
      description: "Learn about our loyalty program, redeem your points, or check your reward status."
    },
    {
      icon: <FaTools className="text-red-500 text-2xl" />,
      title: "Technical Issues",
      description: "Report bugs, playback problems, or any technical difficulties you're experiencing on our platform."
    },
    {
      icon: <FaQuestionCircle className="text-orange-500 text-2xl" />,
      title: "General FAQs",
      description: "Find answers to frequently asked questions about our platform, policies, and services."
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-semibold mb-6">Help Center</h2>
      <p className="text-gray-600 mb-8">How can we help you today? Choose a category below to find the support you need.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {helpCategories.map((category, index) => (
          <div 
            key={index} 
            className="border rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer hover:border-blue-200"
          >
            <div className="flex items-start space-x-4">
              <div className="mt-1">
                {category.icon}
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">{category.title}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-5 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-center space-x-3">
          <FaQuestionCircle className="text-blue-500 text-xl" />
          <h3 className="font-medium text-lg">Can't find what you're looking for?</h3>
        </div>
        <p className="text-sm text-gray-600 mt-2">Contact our support team directly for personalized assistance.</p>
        <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default HelpCenterPage;