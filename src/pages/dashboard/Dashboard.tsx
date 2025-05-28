import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { useSavedJobs } from '../../contexts/SavedJobsContext';
import { 
  Briefcase, Building, User, File, Bell, MessageSquare, CheckCircle, 
  Users, BarChart2, Calendar, BookmarkPlus, MapPin, DollarSign, Search, Eye 
} from 'lucide-react';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  createdAt: string;
}

interface Application {
  _id: string;
  jobId: {
    _id: string;
    title: string;
    company: string;
  };
  userId: {
    _id: string;
    name: string;
    profile?: {
      avatar?: string;
    };
  };
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { savedJobs } = useSavedJobs();
  const isEmployer = user?.role === 'employer';
  const [loading, setLoading] = useState(false);
  const [activeJobCount, setActiveJobCount] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);
  const [applications, setApplications] = useState<Application[]>([]); // State mới cho applications

  useEffect(() => {
    if (isEmployer && user?.id) {
      // Lấy Active Job Posts
      const fetchActiveJobs = async () => {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:5000/api/jobs/employer/${user.id}/active`);
          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
          }
          const data = await response.json();
          setActiveJobCount(data.activeJobCount);
          setLoading(false);
        } catch (err: any) {
          console.error('Fetch active jobs error:', err);
          showToast('Error fetching active jobs', 'error');
          setLoading(false);
        }
      };

      // Lấy Total Applications
      const fetchTotalApplications = async () => {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:5000/api/applications/employer/${user.id}/count`);
          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
          }
          const data = await response.json();
          setTotalApplications(data.totalApplications);
          setLoading(false);
        } catch (err: any) {
          console.error('Fetch applications error:', err);
          showToast('Error fetching applications', 'error');
          setLoading(false);
        }
      };

      // Lấy Recent Applications
      const fetchRecentApplications = async () => {
        try {
          setLoading(true);
         const response = await fetch(`http://localhost:5000/api/applications/employer/${user.id}`);
          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
          }
          const data: Application[] = await response.json();
          // Lấy 4 applications mới nhất
          setApplications(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 4));
          setLoading(false);
        } catch (err: any) {
          console.error('Fetch recent applications error:', err);
          showToast('Error fetching recent applications', 'error');
          setLoading(false);
        }
      };

      fetchActiveJobs();
      fetchTotalApplications();
      fetchRecentApplications();
    } else if (!isEmployer && user?.id) {
      // Lấy Saved Jobs cho ứng viên (candidate)
      const fetchSavedJobs = async () => {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:5000/api/jobs/saved?userId=${user.id}`);
          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
          }
          const data: Job[] = await response.json();
          setLoading(false);
        } catch (err: any) {
          console.error('Fetch saved jobs error:', err);
          showToast('Error fetching saved jobs', 'error');
          setLoading(false);
        }
      };
      fetchSavedJobs();
    }
  }, [user, isEmployer, showToast]);

  return (
    <div className="bg-gray-50 dark:bg-gray-800 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl dark:text-gray-50 font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Welcome back, {user?.name}!
        </p>

        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {isEmployer ? (
            <>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">Active Job Posts</p>
                    <p className="text-3xl font-bold mt-1">{activeJobCount}</p>
                  </div>
                  <span className="p-3 bg-blue-100 rounded-full">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                  </span>
                </div>
                <div className="mt-4 text-xs text-green-600 flex items-center">
                  <span className="mr-1">↑ 12%</span>
                  <span>from last month</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">Total Applications</p>
                    <p className="text-3xl font-bold mt-1">{totalApplications}</p>
                  </div>
                  <span className="p-3 bg-purple-100 rounded-full">
                    <File className="h-6 w-6 text-purple-600" />
                  </span>
                </div>
                <div className="mt-4 text-xs text-green-600 flex items-center">
                  <span className="mr-1">↑ 8%</span>
                  <span>from last month</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">Shortlisted</p>
                    <p className="text-3xl font-bold mt-1">12</p>
                  </div>
                  <span className="p-3 bg-yellow-100 rounded-full">
                    <CheckCircle className="h-6 w-6 text-yellow-600" />
                  </span>
                </div>
                <div className="mt-4 text-xs text-red-600 flex items-center">
                  <span className="mr-1">↓ 5%</span>
                  <span>from last month</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">Interviews</p>
                    <p className="text-3xl font-bold mt-1">8</p>
                  </div>
                  <span className="p-3 bg-green-100 rounded-full">
                    <Users className="h-6 w-6 text-green-600" />
                  </span>
                </div>
                <div className="mt-4 text-xs text-green-600 flex items-center">
                  <span className="mr-1">↑ 16%</span>
                  <span>from last month</span>
                </div>
              </div>
            </>
          ) : (
            // Candidate stats (giữ nguyên)
            <>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">Applications</p>
                    <p className="text-3xl font-bold mt-1">12</p>
                  </div>
                  <span className="p-3 bg-blue-100 rounded-full">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                  </span>
                </div>
                <div className="mt-4 text-xs text-green-600 flex items-center">
                  <span className="mr-1">↑ 3</span>
                  <span>from last month</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">Interviews</p>
                    <p className="text-3xl font-bold mt-1">3</p>
                  </div>
                  <span className="p-3 bg-purple-100 rounded-full">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </span>
                </div>
                <div className="mt-4 text-xs text-green-600 flex items-center">
                  <span className="mr-1">↑ 1</span>
                  <span>from last month</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">Profile Views</p>
                    <p className="text-3xl font-bold mt-1">47</p>
                  </div>
                  <span className="p-3 bg-yellow-100 rounded-full">
                    <User className="h-6 w-6 text-yellow-600" />
                  </span>
                </div>
                <div className="mt-4 text-xs text-green-600 flex items-center">
                  <span className="mr-1">↑ 12%</span>
                  <span>from last month</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">Saved Jobs</p>
                    <p className="text-3xl font-bold mt-1">{savedJobs.length}</p>
                  </div>
                  <span className="p-3 bg-green-100 rounded-full">
                    <BookmarkPlus className="h-6 w-6 text-green-600" />
                  </span>
                </div>
                <div className="mt-4 text-xs text-yellow-600 flex items-center">
                  <span className="mr-1">→ {savedJobs.length}</span>
                  <span>no change</span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content column */}
          <div className="lg:col-span-2 space-y-8">
            {isEmployer ? (
              <>
                {/* Recent Applications */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold">Recent Applications</h2>
                      <Link to="/applications" className="text-primary-600 text-sm hover:text-primary-700">
                        View all
                      </Link>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {loading ? (
                      <p className="p-6 text-gray-500">Loading applications...</p>
                    ) : applications.length > 0 ? (
                      applications.map((app) => (
                        <div key={app._id} className="p-6 flex items-start">
                          <div className="mr-4">
                            <img
                              src={app.userId.profile?.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'} // Sử dụng avatar từ profile hoặc fallback
                              alt="Applicant"
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <h3 className="font-medium">{app.userId.name}</h3>
                              <span className="text-sm text-gray-500">
                                {new Date(app.createdAt).toLocaleDateString()} {/* Hiển thị ngày ứng tuyển */}
                              </span>
                            </div>
                            <p className="text-gray-600">
                              Applied for{' '}
                              <Link to={`/jobs/${app.jobId._id}`} className="text-primary-600 hover:text-primary-700">
                                {app.jobId.title}
                              </Link>
                            </p>
                            <div className="mt-2 flex gap-2">
                              <button className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full">
                                View Profile
                              </button>
                              <button className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-full">
                                Schedule Interview
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="p-6 text-gray-500">No recent applications</p>
                    )}
                  </div>
                </div>

                {/* Job posts performance (giữ nguyên) */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold">Job Posts Performance</h2>
                      <Link to="/applications" className="text-primary-600 text-sm hover:text-primary-700">
                        View Applications
                      </Link>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-6">
                      {['Senior Frontend Developer', 'Product Manager', 'UX/UI Designer'].map((title, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{title}</span>
                            <span className="text-sm text-gray-500">
                              {index === 0 ? '24 applicants' : index === 1 ? '18 applicants' : '12 applicants'}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary-600 h-2 rounded-full"
                              style={{ width: index === 0 ? '70%' : index === 1 ? '55%' : '35%' }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // Candidate content (giữ nguyên)
              <>
                {/* Application status */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold">Application Status</h2>
                      <Link to="/applications" className="text-primary-600 text-sm hover:text-primary-700">
                        View all
                      </Link>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {[
                      { company: 'TechCorp', position: 'Senior Frontend Developer', status: 'Interview', statusColor: 'bg-green-100 text-green-800' },
                      { company: 'InnovateLabs', position: 'Product Manager', status: 'Reviewing', statusColor: 'bg-yellow-100 text-yellow-800' },
                      { company: 'DesignWave', position: 'UX/UI Designer', status: 'Applied', statusColor: 'bg-blue-100 text-blue-800' },
                      { company: 'CloudSystems', position: 'DevOps Engineer', status: 'Rejected', statusColor: 'bg-red-100 text-red-800' }
                    ].map((app, index) => (
                      <div key={index} className="p-6 flex items-start">
                        <div className="mr-4">
                          <div className="h-10 w-10 rounded-md flex items-center justify-center bg-primary-100">
                            <Building className="h-5 w-5 text-primary-700" />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{app.position}</h3>
                            <span className={`text-xs ${app.statusColor} rounded-full flex items-center justify-center`} style={{ width: '60px', height: '24px' }}>
                              {app.status}
                            </span>
                          </div>
                          <p className="text-gray-600">{app.company}</p>
                          <p className="text-sm text-gray-500 mt-1">Applied on Oct {10 + index}, 2025</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Saved Jobs */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold">Saved Jobs</h2>
                      <Link to="/saved-jobs" className="text-primary-600 text-sm hover:text-primary-700">
                        View all
                      </Link>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {loading ? (
                      <p className="p-6 text-gray-500">Loading saved jobs...</p>
                    ) : savedJobs.length > 0 ? (
                      savedJobs.map((job) => (
                        <div key={job._id} className="p-6">
                          <div className="flex justify-between mb-2">
                            <h3 className="font-medium">{job.title}</h3>
                          </div>
                          <p className="text-gray-600 mb-2">{job.company}</p>
                          <div className="flex text-sm text-gray-500 space-x-4">
                            <span className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {job.location}
                            </span>
                            <span className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1" />
                              {job.salary}
                            </span>
                          </div>
                          <div className="mt-3 flex space-x-2">
                            <Link to={`/jobs/${job._id}`} className="btn btn-primary text-gray-400 py-1 px-3 text-sm">
                              Apply Now
                            </Link>
                            <button className="btn btn-outline py-1 px-3 text-sm">
                              Save
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="p-6 text-gray-500">No saved jobs yet</p>
                    )}
                  </div>
                </div>

                {/* Recommended jobs */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold">Recommended for You</h2>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 mr-2">Based on your profile</span>
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                          AI Match
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {[
                      { title: 'Frontend Developer', company: 'WebInovations', match: '95%', location: 'Remote', salary: '$90K - $110K' },
                      { title: 'UI Developer', company: 'CreativeApps', match: '87%', location: 'New York, NY', salary: '$95K - $115K' },
                      { title: 'React Developer', company: 'TechStart', match: '82%', location: 'San Francisco, CA', salary: '$100K - $125K' }
                    ].map((job, index) => (
                      <div key={index} className="p-6">
                        <div className="flex justify-between mb-2">
                          <h3 className="font-medium">{job.title}</h3>
                          <span className="text-green-600 text-sm font-medium">{job.match} match</span>
                        </div>
                        <p className="text-gray-600 mb-2">{job.company}</p>
                        <div className="flex text-sm text-gray-500 space-x-4">
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {job.salary}
                          </span>
                        </div>
                        <div className="mt-3 flex space-x-2">
                          <Link to={`/jobs/${index + 1}`} className="btn btn-primary text-gray-400 py-1 px-3 text-sm">
                            Apply Now
                          </Link>
                          <button className="btn btn-outline py-1 px-3 text-sm">
                            Save
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sidebar (giữ nguyên) */}
          <div className="space-y-8">
            {/* Quick actions */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold">Quick Actions</h2>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  {isEmployer ? (
                    <>
                      <Link to="/post-job" className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <Briefcase className="h-6 w-6 text-primary-600 mb-2" />
                        <span className="text-sm text-center">Post a Job</span>
                      </Link>

                      <Link to="/jobs-posted" className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <Search className="h-6 w-6 text-primary-600 mb-2" />
                        <span className="text-sm text-center">Jobs Posted</span>
                      </Link>

                      <Link to="/company-profile" className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <Building className="h-6 w-6 text-primary-600 mb-2" />
                        <span className="text-sm text-center">Edit Company</span>
                      </Link>

                      <Link to="/applications" className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <BarChart2 className="h-6 w-6 text-primary-600 mb-2" />
                        <span className="text-sm text-center">View Applications</span>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/jobs" className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <Search className="h-6 w-6 text-primary-600 mb-2" />
                        <span className="text-sm text-center">Find Jobs</span>
                      </Link>

                      <Link to="/profile" className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <User className="h-6 w-6 text-primary-600 mb-2" />
                        <span className="text-sm text-center">Edit Profile</span>
                      </Link>

                      <Link to="/resume" className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <File className="h-6 w-6 text-primary-600 mb-2" />
                        <span className="text-sm text-center">Update Resume</span>
                      </Link>

                      <Link to="/saved-jobs" className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <BookmarkPlus className="h-6 w-6 text-primary-600 mb-2" />
                        <span className="text-sm text-center">Saved Jobs</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Notifications</h2>
                  <Link to="/notifications" className="text-primary-600 text-sm hover:text-primary-700">
                    View all
                  </Link>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {[
                  { icon: <Bell className="h-5 w-5 text-blue-500" />, text: 'New job matches available based on your profile', time: '2 hours ago' },
                  { icon: <MessageSquare className="h-5 w-5 text-green-500" />, text: 'You have a new message from TechCorp', time: '1 day ago' },
                  { icon: <Eye className="h-5 w-5 text-purple-500" />, text: 'Your profile was viewed by 3 recruiters', time: '2 days ago' }
                ].map((notification, index) => (
                  <div key={index} className="p-4 flex items-start">
                    <div className="mr-3 mt-1">{notification.icon}</div>
                    <div>
                      <p className="text-sm text-gray-700">{notification.text}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold">
                  {isEmployer ? 'Upcoming Interviews' : 'Upcoming Events'}
                </h2>
              </div>

              <div className="p-4 divide-y divide-gray-100">
                {isEmployer ? (
                  [
                    { candidate: 'Sarah Johnson', position: 'Senior Frontend Developer', date: 'Oct 25, 2025', time: '10:00 AM' },
                    { candidate: 'Michael Chen', position: 'Product Manager', date: 'Oct 27, 2025', time: '2:30 PM' }
                  ].map((interview, index) => (
                    <div key={index} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{interview.candidate}</p>
                          <p className="text-sm text-gray-600">{interview.position}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{interview.date}</p>
                          <p className="text-sm text-gray-500">{interview.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  [
                    { title: 'Interview with TechCorp', type: 'Video Interview', date: 'Oct 25, 2025', time: '10:00 AM' },
                    { title: 'Technical Assessment', type: 'Online Test', date: 'Oct 23, 2025', time: '2:00 PM' }
                  ].map((event, index) => (
                    <div key={index} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-gray-600">{event.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{event.date}</p>
                          <p className="text-sm text-gray-500">{event.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;