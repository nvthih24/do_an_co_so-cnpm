import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Edit, Trash2, Mail, Phone, MapPin, Calendar, 
  Globe, Building2, CheckCircle, XCircle, FileText 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import StatusBadge from '../../components/ui/StatusBadge';
import Modal from '../../components/ui/Model';
import Tabs from '../../components/ui/Tab';
import { employers, posts } from '../../utils/mockData';
import { formatDate } from '../../utils/helpers';

const EmployerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('company');

  const employer = employers.find(e => e.id === id);
  const employerPosts = posts.filter(p => p.employerId === id);

  if (!employer) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Employer Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">The employer you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/employers')}>Back to Employers</Button>
      </div>
    );
  }

  const tabs = [
    { id: 'company', label: 'Company Info' },
    { id: 'posts', label: 'Job Posts', count: employerPosts.length },
    { id: 'activity', label: 'Activity' }
  ];

  const handleEdit = () => {
    // Redirect to edit page or open edit modal
    console.log('Edit employer:', employer.id);
  };

  const handleDelete = () => {
    // Delete the employer
    console.log('Delete employer:', employer.id);
    setIsDeleteModalOpen(false);
    navigate('/employers');
  };

  const handleApprove = () => {
    // Approve the employer
    console.log('Approve employer:', employer.id);
    setIsStatusModalOpen(false);
  };

  const handleReject = () => {
    // Reject the employer
    console.log('Reject employer:', employer.id);
    setIsStatusModalOpen(false);
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
            onClick={() => navigate('/employers')}
            icon={<ArrowLeft size={18} />}
          >
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Employer Details</h1>
        </div>
        <div className="flex gap-3">
          {employer.status === 'pending' && (
            <Button 
              variant="primary"
              size="sm"
              icon={<CheckCircle size={16} />}
              onClick={() => setIsStatusModalOpen(true)}
            >
              Review Status
            </Button>
          )}
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
                  src={employer.logoUrl || "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=240"}
                  alt={employer.companyName}
                />
                <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{employer.companyName}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{employer.industry}</p>
                <div className="mt-2">
                  <StatusBadge status={employer.status} />
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Building2 size={18} className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Company Size</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{employer.size} employees</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Globe size={18} className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Website</p>
                      <a 
                        href={employer.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                      >
                        {employer.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={18} className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{employer.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={18} className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Registered</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{formatDate(employer.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail size={18} className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{employer.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone size={18} className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{employer.phone}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Contact Person</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{employer.contactName}</p>
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

          {activeTab === 'company' && (
            <Card>
              <CardHeader>
                <CardTitle>Company Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Company Summary</h3>
                    <p className="text-gray-900 dark:text-white">
                      {employer.companyName} is a {employer.size} company in the {employer.industry} industry, based in {employer.location}.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Account Status</h3>
                    <div className="flex items-center">
                      <StatusBadge status={employer.status} />
                      <span className="ml-2 text-gray-500 dark:text-gray-400">
                        {employer.status === 'pending' ? 'Waiting for approval' : 
                         employer.status === 'approved' ? 'Account is active' : 'Account is rejected'}
                      </span>
                    </div>
                    {employer.status === 'pending' && (
                      <div className="mt-4">
                        <Button 
                          className="mr-3"
                          icon={<CheckCircle size={16} />}
                          onClick={() => setIsStatusModalOpen(true)}
                        >
                          Approve
                        </Button>
                        <Button 
                          variant="danger"
                          icon={<XCircle size={16} />}
                          onClick={() => setIsStatusModalOpen(true)}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Job Posting Activity</h3>
                    <p className="text-gray-900 dark:text-white">
                      This employer has posted {employerPosts.length} job{employerPosts.length !== 1 ? 's' : ''}.
                    </p>
                    {employerPosts.length > 0 && (
                      <div className="mt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          icon={<FileText size={16} />}
                          onClick={() => setActiveTab('posts')}
                        >
                          View Job Posts
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'posts' && (
            <Card>
              <CardHeader>
                <CardTitle>Job Postings</CardTitle>
              </CardHeader>
              <CardContent>
                {employerPosts.length > 0 ? (
                  <div className="space-y-4">
                    {employerPosts.map((post) => (
                      <div 
                        key={post.id}
                        className="p-4 border border-gray-200 rounded-lg dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                        onClick={() => navigate(`/posts/${post.id}`)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{post.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{post.location} • {post.type}</p>
                          </div>
                          <StatusBadge status={post.status} />
                        </div>
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                          {post.description}
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Posted: {formatDate(post.createdAt)}
                          </div>
                          <div className="text-xs font-medium text-gray-600 dark:text-gray-300">
                            {post.applicationCount} application{post.applicationCount !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      This employer hasn't posted any jobs yet.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === 'activity' && (
            <Card>
              <CardHeader>
                <CardTitle>Account Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute top-0 bottom-0 left-5 border-l-2 border-gray-200 dark:border-gray-700"></div>
                  <ul className="space-y-6">
                    <li className="relative pl-12">
                      <span className="absolute left-4 -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-800"></span>
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Account registered</p>
                        <time className="text-xs text-gray-500 dark:text-gray-400">{formatDate(employer.createdAt)}</time>
                      </div>
                    </li>
                    {employer.status !== 'pending' && (
                      <li className="relative pl-12">
                        <span className={`absolute left-4 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white dark:border-gray-800 ${
                          employer.status === 'approved' ? 'bg-green-500' : 'bg-red-500'
                        }`}></span>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            Account {employer.status === 'approved' ? 'approved' : 'rejected'}
                          </p>
                          <time className="text-xs text-gray-500 dark:text-gray-400">{formatDate(employer.updatedAt)}</time>
                        </div>
                      </li>
                    )}
                    {employerPosts.length > 0 && (
                      <li className="relative pl-12">
                        <span className="absolute left-4 -translate-x-1/2 w-4 h-4 bg-amber-500 rounded-full border-4 border-white dark:border-gray-800"></span>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            Posted first job: {employerPosts[0].title}
                          </p>
                          <time className="text-xs text-gray-500 dark:text-gray-400">{formatDate(employerPosts[0].createdAt)}</time>
                        </div>
                      </li>
                    )}
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
        title="Delete Employer"
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
            Are you sure you want to delete this employer? This action cannot be undone.
          </p>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 dark:bg-red-900/20 dark:border-red-700">
            <div className="flex">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={employer.logoUrl || "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=100"}
                  alt={employer.companyName}
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800 dark:text-red-400">{employer.companyName}</p>
                <p className="text-sm text-red-700 dark:text-red-300">{employer.contactName} • {employer.email}</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Status Review Modal */}
      <Modal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        title="Review Employer Status"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsStatusModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleReject}>
              Reject
            </Button>
            <Button onClick={handleApprove}>
              Approve
            </Button>
          </div>
        }
      >
        <div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Review and update the status of this employer account.
          </p>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Status</h3>
            <StatusBadge status={employer.status} />
          </div>
          
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Company Information</h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-xs text-gray-500 dark:text-gray-400">Company Name</dt>
                  <dd className="text-sm text-gray-900 dark:text-white">{employer.companyName}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-xs text-gray-500 dark:text-gray-400">Industry</dt>
                  <dd className="text-sm text-gray-900 dark:text-white">{employer.industry}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-xs text-gray-500 dark:text-gray-400">Location</dt>
                  <dd className="text-sm text-gray-900 dark:text-white">{employer.location}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-xs text-gray-500 dark:text-gray-400">Size</dt>
                  <dd className="text-sm text-gray-900 dark:text-white">{employer.size}</dd>
                </div>
              </dl>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Contact Person</h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-xs text-gray-500 dark:text-gray-400">Name</dt>
                  <dd className="text-sm text-gray-900 dark:text-white">{employer.contactName}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-xs text-gray-500 dark:text-gray-400">Email</dt>
                  <dd className="text-sm text-gray-900 dark:text-white">{employer.email}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-xs text-gray-500 dark:text-gray-400">Phone</dt>
                  <dd className="text-sm text-gray-900 dark:text-white">{employer.phone}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-xs text-gray-500 dark:text-gray-400">Website</dt>
                  <dd className="text-sm text-gray-900 dark:text-white">
                    <a 
                      href={employer.website} 
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      {employer.website.replace(/^https?:\/\//, '')}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Admin Notes
            </label>
            <textarea
              id="notes"
              rows={3}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Add any notes about this decision..."
            ></textarea>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EmployerDetails;