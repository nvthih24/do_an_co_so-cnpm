import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { User, FileText, Clock, Award, Mail, Phone } from 'lucide-react';

interface Application {
  _id: string;
  jobId: {
    _id: string;
    title: string;
    company: string;
  };
  fullName: string;
  email: string;
  phone: string;
  resume: string;
  coverLetter?: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  createdAt: string;
}

const ApplicationsPage: React.FC = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user || !user.id) {
        setError("User not logged in or missing ID");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:5000/api/applications/employer/${user.id}`);
        console.log("Response:", response);
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setApplications(data);
      } catch (err: any) {
        setError(err.message || "Error fetching applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Applications for Your Jobs
      </h1>
      {loading ? (
        <p className="text-gray-500 dark:text-gray-400 text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center">No applications found.</p>
      ) : (
        <>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Total applications: {applications.length}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 line-clamp-2">
                  {application.jobId.title}
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <User size={16} className="mr-2 text-blue-500" />
                    <span className="truncate">{application.fullName}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <FileText size={16} className="mr-2 text-green-500" />
                    <span className="truncate">{application.jobId.company}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Mail size={16} className="mr-2 text-purple-500" />
                    <span className="truncate">{application.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Phone size={16} className="mr-2 text-yellow-500" />
                    <span>{application.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Clock size={16} className="mr-2 text-gray-500" />
                    <span>Applied on {new Date(application.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Award size={16} className="mr-2 text-orange-500" />
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        application.status === 'accepted'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : application.status === 'rejected'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          : application.status === 'reviewed'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}
                    >
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                  </div>
                  {application.resume && (
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <FileText size={16} className="mr-2 text-purple-500" />
                      <a
                        href={`http://localhost:5000/${application.resume}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline truncate"
                      >
                        View Resume
                      </a>
                    </div>
                  )}
                  {application.coverLetter && (
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      <p className="font-medium">Cover Letter:</p>
                      <p className="line-clamp-3">{application.coverLetter}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ApplicationsPage;