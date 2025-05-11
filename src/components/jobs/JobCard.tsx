import React from 'react';
import { Link } from 'react-router-dom';
import { Building, MapPin, Clock, DollarSign, Briefcase, Award, BookmarkPlus } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  logo: string;
  featured: boolean;
  description: string;
  tags: string[];
  experience: string;
}

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          {/* Company logo */}
          <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
            <img 
              src={job.logo} 
              alt={job.company} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Job details */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
              <h3 className="text-xl font-semibold hover:text-primary-600 transition-colors">
                <Link to={`/jobs/${job.id}`}>{job.title}</Link>
              </h3>
              <div className="flex mt-2 sm:mt-0">
                {job.featured && (
                  <span className="badge badge-success mr-2">Featured</span>
                )}
                <span className="badge bg-blue-100 text-blue-800">{job.type}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2 gap-x-4 mb-3">
              <div className="flex items-center text-gray-600">
                <Building className="h-4 w-4 mr-2 text-gray-400" />
                <span>{job.company}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                <span>{job.location}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                <span>{job.salary}</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {job.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-gray-100 pt-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center text-gray-600">
                  <Award className="h-4 w-4 mr-1 text-gray-400" />
                  <span className="text-sm">{job.experience}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-1 text-gray-400" />
                  <span className="text-sm">{job.posted}</span>
                </div>
              </div>
              
              <div className="flex mt-3 sm:mt-0 gap-2">
                <button className="btn btn-outline py-1 px-3 flex items-center">
                  <BookmarkPlus className="h-4 w-4 mr-2" />
                  Save
                </button>
                <Link to={`/jobs/${job.id}`} className="btn btn-primary py-1 px-4">
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;