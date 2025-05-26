import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import StatusBadge from '../../components/ui/StatusBadge';
import Modal from '../../components/ui/Model';
import Tabs from '../../components/ui/Tab';
import Header from '../../components/layout/Header_Admin';
import Sidebar from '../../components/layout/Sidebar';
import { useTheme } from '../../contexts/ThemeContext';
import { formatDate } from '../../utils/helpers';
import axios from 'axios';

interface Candidate {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  experience: number;
  education: string;
  skills: string[];
  avatarUrl?: string;

  appliedCount?: number;
  status?: string;
}

const CandidateDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { theme } = useTheme();
  const allowedStatuses = ["active", "inactive", "pending", "approved", "rejected", "blacklisted"] as const;
  const token = localStorage.getItem('token');
type AllowedStatus = typeof allowedStatuses[number];

function isAllowedStatus(status: string | undefined): status is AllowedStatus {
  return allowedStatuses.includes(status as AllowedStatus);
}

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const res = await axios.get(`/api/profile/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
        console.log(res.data);
        setCandidate(res.data);
      } catch (err) {
        console.error('Failed to fetch candidate', err);
        setCandidate(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidate();
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit-profile?id=${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/profile/${id}`);
      navigate('/candidates');
    } catch (err) {
      console.error('Delete failed', err);
    }
    setIsDeleteModalOpen(false);
  };

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'applications', label: 'Applications', count: candidate?.appliedCount || 0 },
    { id: 'activity', label: 'Activity' }
  ];

  if (loading) return <div className="p-10">Loading...</div>;

  if (!candidate) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Candidate Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">The candidate you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/candidates')}>Back to Candidates</Button>
      </div>
    );
  }

  return (
    <div className={`flex h-screen bg-gray-50 ${theme === 'dark' ? 'dark' : ''}`}>
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden dark:bg-gray-900">
        <Header sidebarCollapsed={sidebarCollapsed} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="mr-4"
                  onClick={() => navigate('/candidates')}
                  icon={<ArrowLeft size={18} />}
                >
                  Back
                </Button>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Candidate Details</h1>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" icon={<Edit size={16} />} onClick={handleEdit}>Edit</Button>
                <Button variant="danger" size="sm" icon={<Trash2 size={16} />} onClick={() => setIsDeleteModalOpen(true)}>Delete</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <img
                        className="h-24 w-24 rounded-full object-cover border-4 border-white shadow dark:border-gray-800"
                        src={candidate.avatarUrl || "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"}
                        alt={candidate.fullName}
                      />
                      <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{candidate.fullName}</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{candidate.experience} years experience</p>
                      <div className="mt-2">
                        <StatusBadge status={isAllowedStatus(candidate.status) ? candidate.status : 'active'} />
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
                      <div className="flex items-center">
                        <Mail size={18} className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{candidate.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone size={18} className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{candidate.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <MapPin size={18} className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{candidate.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar size={18} className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Joined</p>

                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

                {activeTab === 'profile' && (
                  <>
                    <Card>
                      <CardHeader><CardTitle>Professional Information</CardTitle></CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                            <Briefcase size={16} className="inline mr-2" />
                            Experience
                          </h3>
                          <p className="text-gray-900 dark:text-white">{candidate.experience} years of professional experience</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                            <GraduationCap size={16} className="inline mr-2" />
                            Education
                          </h3>
                          <p className="text-gray-900 dark:text-white">{candidate.education}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Skills</h3>
                          <div className="flex flex-wrap gap-2">
                            {candidate.skills.map((skill, index) => (
                              <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm dark:bg-blue-900 dark:text-blue-300">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}

                {activeTab === 'applications' && (
                  <Card>
                    <CardHeader><CardTitle>Job Applications</CardTitle></CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300">
                        {candidate.appliedCount && candidate.appliedCount > 0
                          ? `This candidate has applied to ${candidate.appliedCount} jobs.`
                          : `This candidate hasn't applied to any jobs yet.`}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {activeTab === 'activity' && (
                  <Card>
                    <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
                    <CardContent>
                      <div className="relative">
                        <div className="absolute top-0 bottom-0 left-5 border-l-2 border-gray-200 dark:border-gray-700"></div>
                        <ul className="space-y-6">
                          <li className="relative pl-12">
                            <span className="absolute left-4 -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-800"></span>
                            <div className="bg-white p-4 rounded-lg shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">Account created</p>

                            </div>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            <Modal
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              title="Delete Candidate"
              footer={
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                  <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </div>
              }
            >
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Are you sure you want to delete this candidate? This action cannot be undone.
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 dark:bg-red-900/20 dark:border-red-700 flex items-center">
                <img className="h-10 w-10 rounded-full object-cover" src={candidate.avatarUrl || "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"} alt={candidate.fullName} />
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800 dark:text-red-400">{candidate.fullName}</p>
                  <p className="text-sm text-red-700 dark:text-red-300">{candidate.email}</p>
                </div>
              </div>
            </Modal>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CandidateDetails;
