import React, { createContext, useContext, useState } from 'react';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  createdAt: string;
}

interface SavedJobsContextType {
  savedJobs: Job[];
  saveJob: (job: Job) => void;
  removeJob: (jobId: string) => void;
}

const SavedJobsContext = createContext<SavedJobsContextType | undefined>(undefined);

export const SavedJobsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  const saveJob = (job: Job) => {
    setSavedJobs((prev) => (prev.find(j => j._id === job._id) ? prev : [...prev, job]));
  };

  const removeJob = (jobId: string) => {
    setSavedJobs((prev) => prev.filter(j => j._id !== jobId));
  };

  return (
    <SavedJobsContext.Provider value={{ savedJobs, saveJob, removeJob }}>
      {children}
    </SavedJobsContext.Provider>
  );
};

export const useSavedJobs = () => {
  const context = useContext(SavedJobsContext);
  if (!context) throw new Error('useSavedJobs must be used within SavedJobsProvider');
  return context;
};