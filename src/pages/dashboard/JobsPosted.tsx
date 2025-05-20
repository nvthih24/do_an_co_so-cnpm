import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  createdAt: string;
}

const JobsPosted: React.FC = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      // Gọi API backend để lấy jobs theo user.id
      const res = await fetch(`/api/employer/${user?.id}`);
      const data = await res.json();
      setJobs(data.jobs || []);
      setLoading(false);
    };
    if (user?.id) fetchJobs();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Jobs You Posted</h1>
      {loading ? (
        <p>Loading...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white p-6 rounded shadow">
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-gray-500">{job.location}</p>
              <p className="text-xs text-gray-400 mt-2">
                Posted on {new Date(job.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsPosted;