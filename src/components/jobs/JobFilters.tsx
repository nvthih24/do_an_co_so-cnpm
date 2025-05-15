import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

interface FiltersProps {
  jobs: any[];
  setJobs: React.Dispatch<React.SetStateAction<any[]>>;
}

const JobFilters: React.FC<FiltersProps> = ({ jobs, setJobs }) => {
  // Filter states
  const [jobType, setJobType] = useState<string[]>([]);
  const [experience, setExperience] = useState<string[]>([]);
  const [salary, setSalary] = useState<string | null>(null);
  const [postedWithin, setPostedWithin] = useState<string | null>(null);
  
  const handleJobTypeChange = (type: string) => {
    setJobType(prev => 
      prev.includes(type) 
        ? prev.filter(item => item !== type) 
        : [...prev, type]
    );
  };
  
  const handleExperienceChange = (exp: string) => {
    setExperience(prev => 
      prev.includes(exp) 
        ? prev.filter(item => item !== exp) 
        : [...prev, exp]
    );
  };
  
  const resetFilters = () => {
    setJobType([]);
    setExperience([]);
    setSalary(null);
    setPostedWithin(null);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button 
          onClick={resetFilters}
          className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          Reset
        </button>
      </div>
      
      {/* Job Type */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Job Type</h4>
        
        <div className="space-y-2">
          {['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'].map(type => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                checked={jobType.includes(type)}
                onChange={() => handleJobTypeChange(type)}
              />
              <span className="ml-2 text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Experience Level */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Experience Level</h4>
        
        <div className="space-y-2">
          {['Entry level', 'Mid-level', 'Senior', 'Executive'].map(exp => (
            <label key={exp} className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                checked={experience.includes(exp)}
                onChange={() => handleExperienceChange(exp)}
              />
              <span className="ml-2 text-gray-700">{exp}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Salary Range */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Salary Range</h4>
        
        <div className="space-y-2">
          {['Any', '$0 - $50K', '$50K - $100K', '$100K - $150K', '$150K+'].map(range => (
            <label key={range} className="flex items-center">
              <input
                type="radio"
                name="salary"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                checked={salary === range}
                onChange={() => setSalary(range)}
              />
              <span className="ml-2 text-gray-700">{range}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Posted Within */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Posted Within</h4>
        
        <div className="space-y-2">
          {['Any time', 'Past 24 hours', 'Past week', 'Past month'].map(time => (
            <label key={time} className="flex items-center">
              <input
                type="radio"
                name="postedWithin"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                checked={postedWithin === time}
                onChange={() => setPostedWithin(time)}
              />
              <span className="ml-2 text-gray-700">{time}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Apply Filters Button */}
      <button className="w-full btn btn-primary mt-4 text-gray-500 border-t border-gray-300 hover:bg-gray-100">
        Apply Filters
      </button>
    </div>
  );
};

export default JobFilters;