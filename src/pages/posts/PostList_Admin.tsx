import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Search, Filter, Plus } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import StatusBadge from '../../components/ui/StatusBadge';
import Tabs from '../../components/ui/Tab';
import { posts } from '../../utils/mockData';
import { formatDate, formatCurrency } from '../../utils/helpers';
import Header from '../../components/layout/Header_Admin';
import Sidebar from '../../components/layout/Sidebar';
import { useTheme } from '../../contexts/ThemeContext';

const PostList: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { theme } = useTheme();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  const tabs = [
    { id: 'all', label: 'All Posts', count: posts.length },
    { id: 'pending', label: 'Pending', count: posts.filter(p => p.status === 'pending').length },
    { id: 'approved', label: 'Approved', count: posts.filter(p => p.status === 'approved').length },
    { id: 'featured', label: 'Featured', count: posts.filter(p => p.featured).length }
  ];

  const filteredPosts = posts.filter(post => {
    // Filter by tab
    if (activeTab === 'pending' && post.status !== 'pending') return false;
    if (activeTab === 'approved' && post.status !== 'approved') return false;
    if (activeTab === 'featured' && !post.featured) return false;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(query) ||
        post.company.toLowerCase().includes(query) ||
        post.location.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query)
      );
    }

    return true;
  });

  return (
    <div className={`flex h-screen bg-gray-50 ${theme === 'dark' ? 'dark' : ''}`}>
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300 dark:bg-gray-900">
        <Header sidebarCollapsed={sidebarCollapsed} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Job Posts</h1>
                <p className="text-gray-500 dark:text-gray-400">Manage all job postings on the platform</p>
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search job posts..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  icon={<Filter size={18} />}
                >
                  Filter
                </Button>
                <Button
                  icon={<Plus size={18} />}
                  onClick={() => navigate('/posts/new')}
                >
                  Add Post
                </Button>
              </div>
            </div>

            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            <Card className="overflow-hidden">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Title</TableHeaderCell>
                    <TableHeaderCell>Company</TableHeaderCell>
                    <TableHeaderCell>Location</TableHeaderCell>
                    <TableHeaderCell>Type</TableHeaderCell>
                    <TableHeaderCell>Applications</TableHeaderCell>
                    <TableHeaderCell>Salary</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Posted</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow
                      key={post.id}
                      onClick={() => navigate(`/posts/${post.id}`)}
                    >
                      <TableCell>
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {post.title}
                              {post.featured && (
                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                                  Featured
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{post.category}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{post.company}</TableCell>
                      <TableCell>{post.location}</TableCell>
                      <TableCell>
                        <span className="capitalize">{post.type.replace('-', ' ')}</span>
                      </TableCell>
                      <TableCell>{post.applicationCount}</TableCell>
                      <TableCell>
                        {formatCurrency(post.salary.min, post.salary.currency)} - {formatCurrency(post.salary.max, post.salary.currency)}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={post.status} />
                      </TableCell>
                      <TableCell>{formatDate(post.createdAt)}</TableCell>
                    </TableRow>
                  ))}
                  {filteredPosts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">No job posts found</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </div>
          <Outlet />
        </main>
      </div>
    </div>

  );
};

export default PostList;