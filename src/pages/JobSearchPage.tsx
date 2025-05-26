import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sliders, Search, MapPin, Briefcase as BriefcaseBusiness } from 'lucide-react';
import JobSearchBox from '../components/jobs/JobSearchBox';
import JobCard from '../components/jobs/JobCard';
import JobFilters from '../components/jobs/JobFilters';
import { useToast } from '../contexts/ToastContext';

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

const JobSearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  // Get search parameters
  const keyword = searchParams.get('keyword')?.trim() || '';
  const location = searchParams.get('location')?.trim() || '';

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        // Gọi API với query parameters
        const query = new URLSearchParams();
        if (keyword) query.append('keyword', keyword);
        if (location) query.append('location', location);

        console.log('Fetching jobs with query:', query.toString()); // Debug

        const response = await fetch(`http://localhost:5000/api/jobs/approved?${query.toString()}`);
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
        }
        const data: Job[] = await response.json();
        console.log('Fetched jobs:', data); // Debug

        setJobs(data);
        setFilteredJobs(data);
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(err.message || 'Error fetching jobs');
        showToast(err.message || 'Failed to load jobs', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [keyword, location, showToast]);

  // Hàm để cập nhật danh sách công việc sau khi áp dụng bộ lọc
  const handleFilterChange = (filtered: Job[]) => {
    console.log('Filtered jobs:', filtered); // Debug
    setFilteredJobs(filtered);
  };

  // Kiểm tra nếu không có nội dung để render
  console.log('Rendering JobSearchPage:', { loading, error, filteredJobs }); // Debug

  return (
    <div className="bg-gray-50 min-h-screen dark:bg-gray-800">
      <div className="bg-primary-700 pt-8 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-gray-500 dark:text-gray-50 text-3xl font-bold mb-6">Find Your Perfect Job</h1>
          <JobSearchBox />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-500">Loading jobs...</p>
          </div>
        ) : error ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <BriefcaseBusiness className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Error</h3>
            <p className="text-gray-500 mb-4">{error}</p>
          </div>
        ) : (
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
            <div
              className={`md:w-64 flex-shrink-0 transition-all duration-300 ${
                showFilters ? 'max-h-screen' : 'max-h-0 md:max-h-screen overflow-hidden md:overflow-visible'
              }`}
            >
              <JobFilters jobs={jobs} setJobs={handleFilterChange} />
            </div>

            {/* Job listings */}
            <div className="flex-1">
              {/* Search results info */}
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    {filteredJobs.length} Jobs Found
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
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => <JobCard key={job._id} job={job} />)
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
        )}
      </div>
    </div>
  );
};

export default JobSearchPage;