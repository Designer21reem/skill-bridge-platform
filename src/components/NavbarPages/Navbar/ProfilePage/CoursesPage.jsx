import React from 'react';

const CoursesPage = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-4">My Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* محتوى الكورسات */}
        <div className="border rounded-lg p-4">
          <h3 className="font-medium">React Advanced Course</h3>
          <p className="text-sm text-gray-500 mt-1">In Progress</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-medium">UI/UX Design</h3>
          <p className="text-sm text-gray-500 mt-1">Completed</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-medium">Node.js Backend</h3>
          <p className="text-sm text-gray-500 mt-1">Not Started</p>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;