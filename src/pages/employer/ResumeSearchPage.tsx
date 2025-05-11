import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Filter, Award, Download, BookmarkPlus } from 'lucide-react';

const ResumeSearchPage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);

  const candidates = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Senior Frontend Developer',
      location: 'San Francisco, CA',
      experience: '5+ years',
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
      education: 'BS Computer Science',
      availability: 'Immediately',
      photo: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'UX/UI Designer',
      location: 'New York, NY',
      experience: '4 years',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      education: 'MA Design',
      availability: '2 weeks',
      photo: 'https://randomuser.me/api/portraits/men/2.jpg'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Search header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Resume Search</h1>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    className="form-input pl-10 w-full"
                    placeholder="Search by skills, job titles, or keywords"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-48">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    className="form-input pl-10 w-full"
                    placeholder="Location"
                  />
                </div>
              </div>
              
              <button className="btn btn-primary">
                Search
              </button>
              
              <button 
                className="btn btn-outline flex items-center"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </button>
            </div>
            
            {/* Filters */}
            {showFilters && (
              <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="form-label">Experience Level</label>
                    <select className="form-input">
                      <option value="">Any</option>
                      <option value="entry">Entry Level</option>
                      <option value="mid">Mid Level</option>
                      <option value="senior">Senior Level</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="form-label">Job Type</label>
                    <select className="form-input">
                      <option value="">Any</option>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="form-label">Availability</label>
                    <select className="form-input">
                      <option value="">Any</option>
                      <option value="immediate">Immediate</option>
                      <option value="2-weeks">2 weeks</option>
                      <option value="month">1 month</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search results */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">
              Showing <span className="font-medium">20</span> of <span className="font-medium">143</span> candidates
            </p>
            <select className="form-input w-48">
              <option value="relevant">Most Relevant</option>
              <option value="recent">Most Recent</option>
              <option value="experience">Most Experienced</option>
            </select>
          </div>

          <div className="space-y-6">
            {candidates.map(candidate => (
              <div key={candidate.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={candidate.photo}
                    alt={candidate.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold">{candidate.name}</h3>
                        <p className="text-gray-600">{candidate.title}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="btn btn-outline py-1 px-3 flex items-center">
                          <BookmarkPlus className="h-4 w-4 mr-2" />
                          Save
                        </button>
                        <button className="btn btn-primary py-1 px-3">
                          View Profile
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {candidate.location}
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Briefcase className="h-4 w-4 mr-2" />
                        {candidate.experience}
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Award className="h-4 w-4 mr-2" />
                        {candidate.education}
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        Available: {candidate.availability}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeSearchPage;