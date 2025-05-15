import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';

const JobSearchBox: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (keyword) params.append('keyword', keyword);
    if (location) params.append('location', location);
    
    navigate(`/jobs?${params.toString()}`);
  };
  
  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-lg max-w-4xl mx-auto flex flex-col md:flex-row"
    >
      <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-gray-200 pb-3 md:pb-0 md:pr-3 mb-3 md:mb-0">
        <Search className="h-5 w-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Job title, skills, or company"
          className="flex-1 focus:outline-none text-gray-700"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      
      <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-gray-200 md:px-3">
        <MapPin className="h-5 w-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="City, state, or remote"
          className="flex-1 focus:outline-none text-gray-700"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      
      <button 
        type="submit"
        className="mt-4 md:mt-0 md:ml-4 bg-primary-600 hover:bg-primary-700 text-gray-400 py-2 px-6 rounded-md transition-colors font-medium"
      >
        Search
      </button>
    </form>
  );
};

export default JobSearchBox;