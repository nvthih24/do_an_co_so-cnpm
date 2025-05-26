import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import CandidateCard from './CandidateCard';
import Button from '../ui/Button';
import { Candidate } from '../../utils/types';

interface CandidateListProps {
  candidates: Candidate[];
}

const CandidateList: React.FC<CandidateListProps> = ({ candidates }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  // Tạm chưa xử lý filter nâng cao (filterOpen) - giữ nguyên filter search chính
  const filteredCandidates = candidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Candidates</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-300">Browse and search for potential candidates</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <input
              type="search"
              placeholder="Search candidates by name or skill..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
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
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Filter Candidates</h2>

          <form
            onSubmit={e => {
              e.preventDefault();
              // Logic apply filter if any
              setFilterOpen(false);
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Experience
              </label>
              <select
                id="experience"
                name="experience"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                defaultValue=""
              >
                <option value="">Any Experience</option>
                <option value="0-2">0-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="6-10">6-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Any location"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Skills
              </label>
              <input
                id="skills"
                name="skills"
                type="text"
                placeholder="e.g., React, Python"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>

            <div className="md:col-span-3 flex justify-end gap-3 mt-4">
              <Button
                variant="outline"
                type="reset"
                onClick={() => {
                  // Clear filters if implemented
                  setFilterOpen(false);
                }}
              >
                Clear
              </Button>
              <Button type="submit">
                Apply Filters
              </Button>
            </div>
          </form>
        </section>
      )}

      {filteredCandidates.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No candidates found</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Try changing your search criteria.</p>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {filteredCandidates.map(candidate => (
            <motion.div key={candidate.id} variants={item}>
              <CandidateCard candidate={candidate} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default CandidateList;
