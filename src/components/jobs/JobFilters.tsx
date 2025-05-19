import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  description: string;
  requirements: string;
  benefits: string;
  featured: boolean;
  isApproved: boolean;
  createdAt: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

interface FiltersProps {
  jobs: Job[];
  setJobs: (jobs: Job[]) => void;
}

const JobFilters: React.FC<FiltersProps> = ({ jobs, setJobs }) => {
  const [jobType, setJobType] = useState<string[]>([]);
  const [experience, setExperience] = useState<string[]>([]);
  const [salary, setSalary] = useState<string | null>(null);
  const [postedWithin, setPostedWithin] = useState<string | null>(null);

  const handleJobTypeChange = (type: string) => {
    setJobType((prev) =>
      prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]
    );
  };

  const handleExperienceChange = (exp: string) => {
    setExperience((prev) =>
      prev.includes(exp) ? prev.filter((item) => item !== exp) : [...prev, exp]
    );
  };

  const resetFilters = () => {
    setJobType([]);
    setExperience([]);
    setSalary(null);
    setPostedWithin(null);
    setJobs(jobs); // Khôi phục danh sách gốc
  };

  const applyFilters = () => {
    let filtered = [...jobs];

    // Lọc theo jobType
    if (jobType.length > 0) {
      filtered = filtered.filter((job) => jobType.includes(job.type));
    }

    // Lọc theo experience
    if (experience.length > 0) {
      filtered = filtered.filter((job) => experience.includes(job.experience));
    }

    // Lọc theo salary (giả định salary là chuỗi như "20tr - 30tr")
    if (salary && salary !== 'Any') {
      filtered = filtered.filter((job) => {
        if (!job.salary) return false;
        // Chuyển salary thành số để so sánh (giả định đơn vị USD)
        const salaryRange = job.salary.match(/(\d+)/g)?.map(Number) || [];
        const minSalary = salaryRange[0] || 0;
        switch (salary) {
          case '$0 - $50K':
            return minSalary >= 0 && minSalary <= 50;
          case '$50K - $100K':
            return minSalary > 50 && minSalary <= 100;
          case '$100K - $150K':
            return minSalary > 100 && minSalary <= 150;
          case '$150K+':
            return minSalary > 150;
          default:
            return true;
        }
      });
    }

    // Lọc theo postedWithin
    if (postedWithin && postedWithin !== 'Any time') {
      const now = new Date();
      filtered = filtered.filter((job) => {
        const postedDate = new Date(job.createdAt);
        const diffDays = (now.getTime() - postedDate.getTime()) / (1000 * 3600 * 24);
        switch (postedWithin) {
          case 'Past 24 hours':
            return diffDays <= 1;
          case 'Past week':
            return diffDays <= 7;
          case 'Past month':
            return diffDays <= 30;
          default:
            return true;
        }
      });
    }

    console.log('Applying filters:', { jobType, experience, salary, postedWithin, filtered });
    setJobs(filtered);
  };

  // Áp dụng bộ lọc khi thay đổi
  useEffect(() => {
    applyFilters();
  }, [jobType, experience, salary, postedWithin]);

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
          {['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'].map((type) => (
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
          {['1+ years', '3+ years', '5+ years'].map((exp) => ( // Điều chỉnh để khớp API
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
          {['Any', '0 - 10tr', '10tr - 20tr', '20tr - 30tr', '30tr+'].map((range) => ( // Điều chỉnh để khớp API
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
          {['Any time', 'Past 24 hours', 'Past week', 'Past month'].map((time) => (
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
    </div>
  );
};

export default JobFilters;