import React from 'react';

const CertificatesPage = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-4">My Certificates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* محتوى الشهادات */}
        <div className="border rounded-lg p-4">
          <h3 className="font-medium">React Developer</h3>
          <p className="text-sm text-gray-500 mt-1">Issued: 15 Jan 2023</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-medium">UI/UX Design</h3>
          <p className="text-sm text-gray-500 mt-1">Issued: 10 Dec 2022</p>
        </div>
      </div>
    </div>
  );
};

export default CertificatesPage;