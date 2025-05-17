import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import StatusBadge from '../../components/ui/StatusBadge';
import Modal from '../../components/ui/Model';
import Tabs from '../../components/ui/Tab';
import { candidates } from '../../utils/mockData';
import { formatDate } from '../../utils/helpers';

const CandidateDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const candidate = candidates.find(c => c.id === id);

  if (!candidate) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Candidate Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">The candidate you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/candidates')}>Back to Candidates</Button>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'applications', label: 'Applications', count: candidate.appliedCount },
    { id: 'activity', label: 'Activity' }
  ];

  const handleEdit = () => {
    // Redirect to edit page or open edit modal
    console.log('Edit candidate:', candidate.id);
  };

  const handleDelete = () => {
    // Delete the candidate
    console.log('Delete candidate:', candidate.id);
    setIsDeleteModalOpen(false);
    navigate('/candidates');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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
          <Button 
            variant="outline"
            size="sm"
            icon={<Edit size={16} />}
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button 
            variant="danger"
            size="sm"
            icon={<Trash2 size={16} />}
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <img
                  className="h-24 w-24 rounded-full object-cover border-4 border-white shadow dark:border-gray-800"
                  src={candidate.avatarUrl || "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=240"}
                  alt={candidate.name}
                />
                <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{candidate.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{candidate.experience} years experience</p>
                <div className="mt-2">
                  <StatusBadge status={candidate.status} />
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="space-y-4">
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
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{formatDate(candidate.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {activeTab === 'profile' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Professional Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        <Briefcase size={16} className="inline mr-2" />
                        Experience
                      </h3>
                      <p className="text-gray-900 dark:text-white">
                        {candidate.experience} years of professional experience
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        <GraduationCap size={16} className="inline mr-2" />
                        Education
                      </h3>
                      <p className="text-gray-900 dark:text-white">
                        {candidate.education}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm dark:bg-blue-900 dark:text-blue-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Application History</CardTitle>
                </CardHeader>
                <CardContent>
                  {candidate.appliedCount > 0 ? (
                    <p className="text-gray-700 dark:text-gray-300">
                      This candidate has applied to {candidate.appliedCount} jobs.
                    </p>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      This candidate hasn't applied to any jobs yet.
                    </p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View Applications
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}

          {activeTab === 'applications' && (
            <Card>
              <CardHeader>
                <CardTitle>Job Applications</CardTitle>
              </CardHeader>
              <CardContent>
                {candidate.appliedCount > 0 ? (
                  <p className="text-gray-700 dark:text-gray-300">
                    Showing all {candidate.appliedCount} applications by this candidate.
                  </p>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      This candidate hasn't applied to any jobs yet.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === 'activity' && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute top-0 bottom-0 left-5 border-l-2 border-gray-200 dark:border-gray-700"></div>
                  <ul className="space-y-6">
                    <li className="relative pl-12">
                      <span className="absolute left-4 -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-800"></span>
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Account created</p>
                        <time className="text-xs text-gray-500 dark:text-gray-400">{formatDate(candidate.createdAt)}</time>
                      </div>
                    </li>
                    <li className="relative pl-12">
                      <span className="absolute left-4 -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full border-4 border-white dark:border-gray-800"></span>
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Profile updated</p>
                        <time className="text-xs text-gray-500 dark:text-gray-400">{formatDate(candidate.updatedAt)}</time>
                      </div>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Candidate"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        }
      >
        <div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Are you sure you want to delete this candidate? This action cannot be undone.
          </p>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 dark:bg-red-900/20 dark:border-red-700">
            <div className="flex">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={candidate.avatarUrl || "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100"}
                  alt={candidate.name}
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800 dark:text-red-400">{candidate.name}</p>
                <p className="text-sm text-red-700 dark:text-red-300">{candidate.email}</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CandidateDetails;