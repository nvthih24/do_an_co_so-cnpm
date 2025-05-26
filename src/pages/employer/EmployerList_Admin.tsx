import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Search, Filter, Plus } from 'lucide-react';
import axios from 'axios';

import { Card } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import StatusBadge from '../../components/ui/StatusBadge';
import Tabs from '../../components/ui/Tab';
import { formatDate } from '../../utils/helpers';
import Header from '../../components/layout/Header_Admin';
import Sidebar from '../../components/layout/Sidebar';
import { useTheme } from '../../contexts/ThemeContext';

interface Employer {
  id: string;
  name: string;
  email: string;
  companyName?: string;
  industry?: string;
  location?: string;
  description?: string;
  createdAt?: string;
  status?: 'approved' | 'pending' | 'rejected';
  postCount?: number;
  // thêm các trường khác nếu có
}

const EmployerList: React.FC = () => {
  const navigate = useNavigate();
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const res = await axios.get('/api/employers');
        // Giả sử backend trả về danh sách employer có thêm status và postCount (nếu không thì bạn tùy chỉnh)
        setEmployers(res.data);
      } catch (err) {
        console.error('Failed to fetch employers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployers();
  }, []);

  // Tính count cho từng tab dựa trên dữ liệu thật
  const tabs = [
    { id: 'all', label: 'All Employers', count: employers.length },
    { id: 'approved', label: 'Approved', count: employers.filter(e => e.status === 'approved').length },
    { id: 'pending', label: 'Pending', count: employers.filter(e => e.status === 'pending').length },
    { id: 'rejected', label: 'Rejected', count: employers.filter(e => e.status === 'rejected').length }
  ];

  const filteredEmployers = employers.filter(employer => {
    if (activeTab !== 'all' && employer.status !== activeTab) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        (employer.companyName?.toLowerCase().includes(q) ?? false) ||
        employer.name.toLowerCase().includes(q) ||
        employer.email.toLowerCase().includes(q) ||
        (employer.industry?.toLowerCase().includes(q) ?? false) ||
        (employer.location?.toLowerCase().includes(q) ?? false)
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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Employers</h1>
                <p className="text-gray-500 dark:text-gray-400">Manage employers and company accounts</p>
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search employers..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" icon={<Filter size={18} />}>Filter</Button>
                <Button icon={<Plus size={18} />}>Add Employer</Button>
              </div>
            </div>

            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

            <Card className="overflow-hidden">
              {loading ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">Loading employers...</div>
              ) : (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Company</TableHeaderCell>
                      <TableHeaderCell>Contact</TableHeaderCell>
                      <TableHeaderCell>Industry</TableHeaderCell>
                      <TableHeaderCell>Location</TableHeaderCell>
                      <TableHeaderCell>Job Posts</TableHeaderCell>
                      <TableHeaderCell>Status</TableHeaderCell>
                      <TableHeaderCell>Registered</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredEmployers.length > 0 ? filteredEmployers.map(employer => (
                      <TableRow
                        key={employer.id}
                        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => navigate(`/employer/${employer.id}`)}
                      >
                        <TableCell>
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-full flex items-center justify-center dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                              {/* Nếu bạn có logo url, đổi ở đây */}
                              {employer.companyName?.charAt(0).toUpperCase() ?? 'E'}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{employer.companyName || 'N/A'}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Company</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{employer.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{employer.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{employer.industry || '—'}</TableCell>
                        <TableCell>{employer.location || '—'}</TableCell>
                        <TableCell>{employer.postCount ?? 0}</TableCell>
                        <TableCell>
                          <StatusBadge status={employer.status ?? 'approved'} />
                        </TableCell>
                        <TableCell>{formatDate(employer.createdAt || new Date().toString())}</TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          <p className="text-gray-500 dark:text-gray-400">No employers found</p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </Card>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployerList;
