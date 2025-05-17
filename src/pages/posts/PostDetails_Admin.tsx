import React, { useState } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import {
  ArrowLeft, Edit, Trash2, MapPin, Calendar, Building2,
  Briefcase, DollarSign, CheckCircle, XCircle, Flag, Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import StatusBadge from '../../components/ui/StatusBadge';
import Modal from '../../components/ui/Model';
import { posts, employers } from '../../utils/mockData';
import { formatDate, formatCurrency } from '../../utils/helpers';
import Header from '../../components/layout/Header_Admin';
import Sidebar from '../../components/layout/Sidebar';
import { useTheme } from '../../contexts/ThemeContext';

const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isFeaturedModalOpen, setIsFeaturedModalOpen] = useState(false);

  const post = posts.find(p => p.id === id);
  const employer = employers.find(e => e.id === post?.employerId);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { theme } = useTheme();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  if (!post || !employer) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Job Post Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">The job post you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/posts')}>Back to Posts</Button>
      </div>
    );
  }

  const handleApprove = () => {
    // Approve the post
    console.log('Approve post:', post.id);
    setIsApproveModalOpen(false);
  };

  const handleReject = () => {
    // Reject the post
    console.log('Reject post:', post.id);
    setIsRejectModalOpen(false);
  };

  const handleToggleFeatured = () => {
    // Toggle featured status
    console.log('Toggle featured status:', post.id);
    setIsFeaturedModalOpen(false);
  };

  const handleEdit = () => {
    // Navigate to edit page
    navigate(`/posts/${post.id}/edit`);
  };

  const handleDelete = () => {
    // Delete the post
    console.log('Delete post:', post.id);
    setIsDeleteModalOpen(false);
    navigate('/posts');
  };

  return (
    <div className={`flex h-screen bg-gray-50 ${theme === 'dark' ? 'dark' : ''}`}>
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300 dark:bg-gray-900">
        <Header sidebarCollapsed={sidebarCollapsed} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="mr-4"
                  onClick={() => navigate('/posts')}
                  icon={<ArrowLeft size={18} />}
                >
                  Back
                </Button>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Job Post Details</h1>
              </div>
              <div className="flex gap-3">
                {post.status === 'pending' && (
                  <>
                    <Button
                      variant="primary"
                      size="sm"
                      icon={<CheckCircle size={16} />}
                      onClick={() => setIsApproveModalOpen(true)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={<XCircle size={16} />}
                      onClick={() => setIsRejectModalOpen(true)}
                    >
                      Reject
                    </Button>
                  </>
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
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{post.title}</CardTitle>
                      <StatusBadge status={post.status} />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Building2 size={16} className="mr-1" />
                        {post.company}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <MapPin size={16} className="mr-1" />
                        {post.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Briefcase size={16} className="mr-1" />
                        <span className="capitalize">{post.type.replace('-', ' ')}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <DollarSign size={16} className="mr-1" />
                        {formatCurrency(post.salary.min, post.salary.currency)} - {formatCurrency(post.salary.max, post.salary.currency)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Job Description</h3>
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                          {post.description}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Requirements</h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                          {post.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>

                      {post.featured && (
                        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 dark:bg-amber-900/20 dark:border-amber-600">
                          <div className="flex">
                            <Flag size={20} className="text-amber-600 dark:text-amber-400 flex-shrink-0" />
                            <div className="ml-3">
                              <p className="text-sm font-medium text-amber-800 dark:text-amber-300">Featured Job</p>
                              <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                                This job post is featured and will be highlighted in job listings.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar size={16} className="mr-1" />
                      Posted on {formatDate(post.createdAt)}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Users size={16} className="mr-1" />
                      {post.applicationCount} application{post.applicationCount !== 1 ? 's' : ''}
                    </div>
                  </CardFooter>
                </Card>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    icon={<Flag size={16} />}
                    onClick={() => setIsFeaturedModalOpen(true)}
                  >
                    {post.featured ? 'Remove Featured Status' : 'Mark as Featured'}
                  </Button>
                  {post.status === 'pending' ? (
                    <div className="space-x-3">
                      <Button
                        variant="danger"
                        icon={<XCircle size={16} />}
                        onClick={() => setIsRejectModalOpen(true)}
                      >
                        Reject
                      </Button>
                      <Button
                        icon={<CheckCircle size={16} />}
                        onClick={() => setIsApproveModalOpen(true)}
                      >
                        Approve
                      </Button>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Employer Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center mb-4">
                      <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={employer.logoUrl || "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=120"}
                        alt={employer.companyName}
                      />
                      <div className="ml-3">
                        <h3 className="text-md font-medium text-gray-900 dark:text-white">{employer.companyName}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{employer.industry}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{employer.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Company Size</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{employer.size} employees</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Contact</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{employer.contactName}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{employer.email}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => navigate(`/employers/${employer.id}`)}
                    >
                      View Employer
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Views</p>
                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">145</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Applications</p>
                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{post.applicationCount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Posting Status</p>
                        <StatusBadge status={post.status} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Approve Modal */}
            <Modal
              isOpen={isApproveModalOpen}
              onClose={() => setIsApproveModalOpen(false)}
              title="Approve Job Post"
              footer={
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setIsApproveModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleApprove}>
                    Approve
                  </Button>
                </div>
              }
            >
              <div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Are you sure you want to approve this job post? It will be visible to all users.
                </p>
                <div className="bg-white p-4 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-1">{post.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{post.company} • {post.location}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{post.description}</p>
                </div>
              </div>
            </Modal>

            {/* Reject Modal */}
            <Modal
              isOpen={isRejectModalOpen}
              onClose={() => setIsRejectModalOpen(false)}
              title="Reject Job Post"
              footer={
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setIsRejectModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="danger" onClick={handleReject}>
                    Reject
                  </Button>
                </div>
              }
            >
              <div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Are you sure you want to reject this job post? The employer will be notified.
                </p>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Reason for Rejection
                  </label>
                  <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <option>Inappropriate content</option>
                    <option>Misleading information</option>
                    <option>Duplicate posting</option>
                    <option>Incomplete information</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Additional Comments
                  </label>
                  <textarea
                    rows={3}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Provide details about the rejection reason..."
                  ></textarea>
                </div>
              </div>
            </Modal>

            {/* Featured Modal */}
            <Modal
              isOpen={isFeaturedModalOpen}
              onClose={() => setIsFeaturedModalOpen(false)}
              title={post.featured ? "Remove Featured Status" : "Mark as Featured"}
              footer={
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setIsFeaturedModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleToggleFeatured}>
                    {post.featured ? "Remove Featured" : "Mark as Featured"}
                  </Button>
                </div>
              }
            >
              <div>
                {post.featured ? (
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Are you sure you want to remove the featured status from this job post? It will no longer be highlighted in job listings.
                  </p>
                ) : (
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Are you sure you want to mark this job post as featured? It will be highlighted in job listings and receive more visibility.
                  </p>
                )}
                <div className="bg-white p-4 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-1">{post.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{post.company} • {post.location}</p>
                </div>
              </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              title="Delete Job Post"
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
                  Are you sure you want to delete this job post? This action cannot be undone.
                </p>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 dark:bg-red-900/20 dark:border-red-700">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800 dark:text-red-400">{post.title}</p>
                      <p className="text-sm text-red-700 dark:text-red-300">{post.company} • {post.location}</p>
                    </div>
                  </div>
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

export default PostDetails;