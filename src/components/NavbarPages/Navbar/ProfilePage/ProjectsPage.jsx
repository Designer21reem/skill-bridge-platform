import React from 'react';

const ProjectsPage = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-4">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* محتوى المشاريع */}
        <div className="border rounded-lg p-4">
          <h3 className="font-medium">E-commerce Website</h3>
          <p className="text-sm text-gray-500 mt-1">React, Node.js, MongoDB</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-medium">Portfolio Design</h3>
          <p className="text-sm text-gray-500 mt-1">Figma, Adobe XD</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;