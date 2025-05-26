import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building, MapPin, Clock, DollarSign } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  logo?: string;
  featured?: boolean;
}

const formatPostedDate = (dateString: string): string => {
  const now = new Date();
  const postedDate = new Date(dateString);
  const diffMs = Math.abs(now.getTime() - postedDate.getTime());
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hôm nay';
  if (diffDays === 1) return '1 ngày trước';
  if (diffDays < 7) return `${diffDays} ngày trước`;
  if (diffDays < 14) return '1 tuần trước';
  return `${Math.floor(diffDays / 7)} tuần trước`;
};

const FeaturedJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('http://localhost:5000/api/jobs/approved?limit=6');
        if (!response.ok) {
          throw new Error(`Lỗi HTTP ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();

        const formattedJobs: Job[] = data.map((job: any) => ({
          id: job._id,
          title: job.title,
          company: job.company,
          location: job.location,
          type: job.type,
          salary: job.salary || 'Thỏa thuận', 
          posted: formatPostedDate(job.createdAt),
          logo: job.logo || 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=120', // Logo mặc định
          featured: job.featured || false,
        }));

        setJobs(formattedJobs);
      } catch (err: any) {
        console.error('Lỗi khi tải công việc:', err);
        setError(err.message || 'Không thể tải danh sách công việc');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Đang tải công việc nổi bật...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <Link to="/jobs" className="btn btn-primary mt-4">
          Xem Tất Cả Công Việc
        </Link>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Không có công việc nổi bật nào.</p>
        <Link to="/jobs" className="btn btn-primary mt-4">
          Xem Tất Cả Công Việc
        </Link>
      </div>
    );
  }

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
                <span className="badge badge-success">Nổi bật</span>
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
            
            <div className="flex justify-between items-center border-t border-gray-100 pt-4">
              <span className="badge bg-blue-100 text-blue-800">
                {job.type}
              </span>
              <div className="flex items-center text-gray-600">
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