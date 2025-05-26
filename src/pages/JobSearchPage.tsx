import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sliders, Search, MapPin, Briefcase as BriefcaseBusiness } from 'lucide-react';
import JobSearchBox from '../components/jobs/JobSearchBox';
import JobCard from '../components/jobs/JobCard';
import JobFilters from '../components/jobs/JobFilters';

// Mock job data
import { mockJobs } from '../data/mockJobs';

const JobSearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [jobs, setJobs] = useState(mockJobs);
  
  // Get search parameters
  const keyword = searchParams.get('keyword') || '';
  const location = searchParams.get('location') || '';
  
  return (
    <div className="bg-gray-50 min-h-screen dark:bg-gray-800">
      <div className="bg-primary-700 pt-8 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-gray-500 dark:text-gray-50 text-3xl font-bold mb-6">Find Your Perfect Job</h1>
          <JobSearchBox />
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile filter toggle button */}
          <button 
            className="md:hidden flex items-center justify-center bg-white p-4 rounded-lg shadow-sm mb-4"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Sliders className="w-5 h-5 mr-2" />
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
          
          {/* Filters sidebar */}
          <div className={`md:w-64 flex-shrink-0 transition-all duration-300 ${showFilters ? 'max-h-screen' : 'max-h-0 md:max-h-screen overflow-hidden md:overflow-visible'}`}>
            <JobFilters jobs={jobs} setJobs={setJobs} />
          </div>
          
          {/* Job listings */}
          <div className="flex-1">
            {/* Search results info */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {jobs.length} Jobs Found 
                  {keyword && <span> for "{keyword}"</span>}
                  {location && <span> in {location}</span>}
                </h2>
                <div className="text-sm text-gray-500">
                  Sorted by: <span className="font-medium">Most Relevant</span>
                </div>
              </div>
            </div>
            
            {/* Job listings */}
            <div className="space-y-4">
              {jobs.length > 0 ? (
                jobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))
              ) : (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <BriefcaseBusiness className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                  <p className="text-gray-500 mb-4">
                    We couldn't find any jobs matching your criteria.
                  </p>
                  <p className="text-gray-500">
                    Try adjusting your filters or search terms.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearchPage;