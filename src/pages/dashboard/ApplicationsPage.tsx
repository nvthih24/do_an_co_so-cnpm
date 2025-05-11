import React from 'react';

const ApplicationsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          {/* Placeholder for applications list */}
          <p className="text-gray-600">No applications found.</p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;