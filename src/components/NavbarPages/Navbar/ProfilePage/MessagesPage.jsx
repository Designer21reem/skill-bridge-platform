import React from 'react';

const MessagesPage = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-4">Messages</h2>
      <div className="space-y-3">
        {/* محتوى الرسائل */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            <div>
              <h3 className="font-medium">John Doe</h3>
              <p className="text-sm text-gray-500 truncate">Hey, how about our project deadline...</p>
            </div>
          </div>
        </div>
        <div className="border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            <div>
              <h3 className="font-medium">Sarah Smith</h3>
              <p className="text-sm text-gray-500 truncate">I've reviewed your assignment...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;