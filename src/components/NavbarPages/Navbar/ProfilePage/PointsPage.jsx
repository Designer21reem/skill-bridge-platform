import React from 'react';

const PointsPage = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-4">My Points</h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">250</p>
          <p className="text-gray-500">Total Points</p>
        </div>
        <div className="text-yellow-500 text-2xl">⭐</div>
      </div>
    </div>
  );
};

export default PointsPage;