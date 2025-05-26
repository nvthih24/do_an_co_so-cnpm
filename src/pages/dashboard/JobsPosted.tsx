import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Building, MapPin, DollarSign, Briefcase, Clock, Award, Trash2, Edit, Eye, Save, X } from 'lucide-react';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  createdAt: string;
  isApproved: boolean;
}

const JobsPosted: React.FC = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Job>>({});
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!user || !user.id) {
        setError("User not logged in or missing ID");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/jobs/employer/${user.id}`);
        if (!response.ok) {
          throw new Error("Error fetching jobs");
        }
        const data = await response.json();
        setJobs(data);
      } catch (err: any) {
        setError(err.message || "Error fetching jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user]);

  const handleEdit = (job: Job) => {
    setEditingJobId(job._id);
    setEditForm({
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      salary: job.salary,
    });
  };

  const handleCancel = () => {
    setEditingJobId(null);
    setEditForm({});
  };

  const handleSave = async (jobId: string) => {
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });
      if (!response.ok) {
        throw new Error("Error updating job");
      }
      setJobs(
        jobs.map((job) =>
          job._id === jobId ? { ...job, ...editForm } : job
        )
      );
      setEditingJobId(null);
      setEditForm({});
      alert("Job updated successfully");
    } catch (err: any) {
      setError(err.message || "Error updating job");
      alert(err.message || "Error updating job");
    }
  };

  const handleDelete = async (jobId: string) => {
    if (window.confirm("Are you sure you want to delete this job? This action cannot be undone.")) {
      try {
        setDeleting(jobId);
        const response = await fetch(`/api/jobs/${jobId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error("Error deleting job");
        }
        setJobs(jobs.filter((job) => job._id !== jobId));
        alert("Job deleted successfully");
      } catch (err: any) {
        setError(err.message || "Error deleting job");
        alert(err.message || "Error deleting job");
      } finally {
        setDeleting(null);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Jobs You Posted
      </h1>
      {loading ? (
        <p className="text-gray-500 dark:text-gray-400 text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center">No jobs posted yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {editingJobId === job._id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    name="title"
                    value={editForm.title || ""}
                    onChange={handleInputChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-gray-900 dark:text-white dark:bg-gray-700"
                    placeholder="Job Title"
                  />
                  <div className="flex items-center gap-2">
                    <Building size={16} className="text-blue-500" />
                    <input
                      type="text"
                      name="company"
                      value={editForm.company || ""}
                      onChange={handleInputChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-gray-900 dark:text-white dark:bg-gray-700"
                      placeholder="Company"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-green-500" />
                    <input
                      type="text"
                      name="location"
                      value={editForm.location || ""}
                      onChange={handleInputChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-gray-900 dark:text-white dark:bg-gray-700"
                      placeholder="Location"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} className="text-purple-500" />
                    <input
                      type="text"
                      name="type"
                      value={editForm.type || ""}
                      onChange={handleInputChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-gray-900 dark:text-white dark:bg-gray-700"
                      placeholder="Job Type"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} className="text-yellow-500" />
                    <input
                      type="text"
                      name="salary"
                      value={editForm.salary || ""}
                      onChange={handleInputChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-gray-900 dark:text-white dark:bg-gray-700"
                      placeholder="Salary"
                    />
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleSave(job._id)}
                      className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm font-medium"
                    >
                      <Save size={16} className="mr-1" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center px-3 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 text-sm font-medium dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                    >
                      <X size={16} className="mr-1" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 line-clamp-2">
                    {job.title}
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Building size={16} className="mr-2 text-blue-500" />
                      <span className="truncate">{job.company}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <MapPin size={16} className="mr-2 text-green-500" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Briefcase size={16} className="mr-2 text-purple-500" />
                      <span className="capitalize">{job.type.replace('-', ' ')}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <DollarSign size={16} className="mr-2 text-yellow-500" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Clock size={16} className="mr-2 text-gray-500" />
                      <span>Posted on {new Date(job.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Award size={16} className="mr-2 text-orange-500" />
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          job.isApproved
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        }`}
                      >
                        {job.isApproved ? "Approved" : "Pending"}
                      </span>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <Link
                        to={`/posts/${job._id}`}
                        className="flex items-center text-blue-500 hover:text-blue-600 text-sm font-medium"
                      >
                        <Eye size={16} className="mr-1" />
                        View Details
                      </Link>
                      <button
                        onClick={() => handleEdit(job)}
                        className="flex items-center text-green-500 hover:text-green-600 text-sm font-medium"
                        disabled={deleting === job._id}
                      >
                        <Edit size={16} className="mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="flex items-center text-red-500 hover:text-red-600 text-sm font-medium disabled:opacity-50"
                        disabled={deleting === job._id}
                      >
                        <Trash2 size={16} className="mr-1" />
                        {deleting === job._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsPosted;