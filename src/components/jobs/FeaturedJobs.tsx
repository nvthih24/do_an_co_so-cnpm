import React from 'react';
import { Link } from 'react-router-dom';
import { Building, MapPin, Clock, DollarSign } from 'lucide-react';

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
}

const FeaturedJobs: React.FC = () => {
  // Mock data for featured jobs
  const jobs: Job[] = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120K - $150K',
      posted: '2 days ago',
      logo: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      featured: true
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'InnovateLabs',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$110K - $140K',
      posted: '3 days ago',
      logo: 'https://images.pexels.com/photos/3184394/pexels-photo-3184394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      featured: true
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      company: 'DesignWave',
      location: 'Remote',
      type: 'Full-time',
      salary: '$90K - $120K',
      posted: '1 week ago',
      logo: 'https://images.pexels.com/photos/3182759/pexels-photo-3182759.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      featured: false
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      company: 'CloudSystems',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$130K - $160K',
      posted: '5 days ago',
      logo: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      featured: true
    },
    {
      id: 5,
      title: 'Marketing Specialist',
      company: 'GrowthHub',
      location: 'Chicago, IL',
      type: 'Full-time',
      salary: '$70K - $90K',
      posted: '1 week ago',
      logo: 'https://images.pexels.com/photos/935979/pexels-photo-935979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      featured: false
    },
    {
      id: 6,
      title: 'Data Scientist',
      company: 'AnalyticsPro',
      location: 'Boston, MA',
      type: 'Full-time',
      salary: '$115K - $145K',
      posted: '3 days ago',
      logo: 'https://images.pexels.com/photos/936137/pexels-photo-936137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      featured: true
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map(job => (
        <Link 
          key={job.id} 
          to={`/jobs/${job.id}`}
          className="card group hover:border-primary-500 transition-all duration-300"
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                <img 
                  src={job.logo} 
                  alt={job.company} 
                  className="w-full h-full object-cover"
                />
              </div>
              {job.featured && (
                <span className="badge badge-success">Featured</span>
              )}
            </div>
            
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
              {job.title}
            </h3>
            
            <div className="flex items-center text-gray-500 mb-2">
              <Building className="h-4 w-4 mr-2" />
              <span>{job.company}</span>
            </div>
            
            <div className="flex items-center text-gray-500 mb-2">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{job.location}</span>
            </div>
            
            <div className="flex items-center text-gray-500 mb-4">
              <DollarSign className="h-4 w-4 mr-2" />
              <span>{job.salary}</span>
            </div>
            
            <div className="flex justify-between border-t border-gray-100 pt-4">
              <span className="badge bg-blue-100 text-blue-800">
                {job.type}
              </span>
              <div className="flex items-center text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">{job.posted}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FeaturedJobs;