import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import CandidateCard from './CandidateCard';
import Button from '../ui/Button';

interface Candidate {
  profileId: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  skills: [String];
  experience: string;
  profilePicture: string;
  jobTitle: string;
  jobCompany: string;
  title: string;
  summary: string;
  degree: string;
  school: string;
  gradYear: string;
  resumeUrl: string;
}

const CandidateList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    experience: '',
    location: '',
    skills: '',
  });

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Candidates</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-300">
            Browse and search for potential candidates
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <input
              type="search"
              placeholder="Search candidates by name or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white"
              aria-label="Search candidates"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>

          <Button
            variant="outline"
            leftIcon={<SlidersHorizontal size={18} />}
            onClick={() => setFilterOpen(!filterOpen)}
            aria-expanded={filterOpen}
            aria-controls="filter-panel"
          >
            Filters
          </Button>
        </div>
      </header>

      {filterOpen && (
        <section
          id="filter-panel"
          className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-8 shadow"
          aria-label="Candidate filters"
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Filter Candidates
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Logic áp dụng filter sẽ được gửi qua query params hoặc context nếu cần
              setFilterOpen(false);
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Experience
              </label>
              <select
                id="experience"
                name="experience"
                value={filters.experience}
                onChange={handleFilterChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                <option value="">Any Experience</option>
                <option value="0-2">0-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="6-10">6-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Any location"
                value={filters.location}
                onChange={handleFilterChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="skills"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Skills
              </label>
              <input
                id="skills"
                name="skills"
                type="text"
                placeholder="e.g., React, Python"
                value={filters.skills}
                onChange={handleFilterChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>

            <div className="md:col-span-3 flex justify-end gap-3 mt-4">
              <Button
                variant="outline"
                type="reset"
                onClick={() => {
                  setFilters({ experience: '', location: '', skills: '' });
                  setSearchQuery('');
                  setFilterOpen(false);
                }}
              >
                Clear
              </Button>
              <Button type="submit">Apply Filters</Button>
            </div>
          </form>
        </section>
      )}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-1 gap-8"
      >
        {/* Vì CandidateCard tự fetch, chúng ta chỉ render nhiều CandidateCard */}
        <motion.div variants={item}>
          <CandidateCard />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CandidateList;