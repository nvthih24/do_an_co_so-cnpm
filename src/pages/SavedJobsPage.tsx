import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Link } from 'react-router-dom';
import { useSavedJobs } from '../contexts/SavedJobsContext';
import { MapPin, DollarSign, Building } from 'lucide-react';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  createdAt: string;
}

const SavedJobsPage: React.FC = () => {
  const { savedJobs, removeJob } = useSavedJobs();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Saved Jobs</h1>
      {savedJobs.length === 0 ? (
        <p className="text-gray-500">No saved jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedJobs.map((job) => (
            <div key={job._id} className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-2">
                <Link to={`/jobs/${job._id}`}>{job.title}</Link>
              </h2>
              <div className="flex items-center text-gray-600 mb-1">
                <Building className="h-4 w-4 mr-2" />
                {job.company}
              </div>
              <div className="flex items-center text-gray-600 mb-1">
                <MapPin className="h-4 w-4 mr-2" />
                {job.location}
              </div>
              <div className="flex items-center text-gray-600 mb-3">
                <DollarSign className="h-4 w-4 mr-2" />
                {job.salary}
              </div>
              <button className="btn btn-outline mt-2" onClick={() => removeJob(job._id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobsPage;