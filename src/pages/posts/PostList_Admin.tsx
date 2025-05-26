import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Search, Filter, Plus } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import StatusBadge from '../../components/ui/StatusBadge';
import Tabs from '../../components/ui/Tab';
import { formatDate, formatCurrency } from '../../utils/helpers';
import Header from '../../components/layout/Header_Admin';
import Sidebar from '../../components/layout/Sidebar';
import { useTheme } from '../../contexts/ThemeContext';

// Định nghĩa interface Job
interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  description: string;
  requirements: string;
  benefits: string;
  featured: boolean;
  createdAt: string | Date;
  isApproved: boolean;
  applicationCount: number;
}

const PostList: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]); // Chỉ định kiểu Job[]
  const { theme } = useTheme();

  // Hàm lấy dữ liệu từ API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        const data = await response.json();
        console.log('API response:', data);
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Cập nhật tabs dựa trên dữ liệu thật
  const tabs = [
    { id: 'all', label: 'All Posts', count: jobs.length },
    {
      id: 'pending',
      label: 'Pending',
      count: jobs.filter((p) => !p.isApproved).length,
    },
    {
      id: 'approved',
      label: 'Approved',
      count: jobs.filter((p) => p.isApproved).length,
    },
    {
      id: 'featured',
      label: 'Featured',
      count: jobs.filter((p) => p.featured).length,
    },
  ];

  // Lọc bài đăng theo tab và tìm kiếm
  const filteredPosts = jobs.filter((post) => {
    // Filter by tab
    if (activeTab === 'pending' && post.isApproved) return false;
    if (activeTab === 'approved' && !post.isApproved) return false;
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
                <Button variant="outline" icon={<Filter size={18} />}>
                  Filter
                </Button>
                <Button icon={<Plus size={18} />} onClick={() => navigate('/posts/new')}>
                  Add Post
                </Button>
              </div>
            </div>

            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

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
                    <TableRow key={post._id} onClick={() => navigate(`/posts/${post._id}`)}>
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
                            <div className="text-xs text-gray-500 dark:text-gray-400">{post.experience}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{post.company}</TableCell>
                      <TableCell>{post.location}</TableCell>
                      <TableCell>
                        <span className="capitalize">{post.type ? post.type.replace('-', ' ') : 'N/A'}</span>
                      </TableCell>
                      <TableCell>{post.applicationCount}</TableCell>
                      <TableCell>{post.salary}</TableCell>
                      <TableCell>
                        <StatusBadge status={post.isApproved ? 'approved' : 'pending'} />
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