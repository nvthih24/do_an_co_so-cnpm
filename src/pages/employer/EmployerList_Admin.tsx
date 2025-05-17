import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Search, Filter, Plus } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import StatusBadge from '../../components/ui/StatusBadge';
import Tabs from '../../components/ui/Tab';
import { employers } from '../../utils/mockData';
import { formatDate } from '../../utils/helpers';
import Header from '../../components/layout/Header_Admin';
import Sidebar from '../../components/layout/Sidebar';
import { useTheme } from '../../contexts/ThemeContext';

const EmployerList: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { theme } = useTheme();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const tabs = [
    { id: 'all', label: 'All Employers', count: employers.length },
    { id: 'approved', label: 'Approved', count: employers.filter(e => e.status === 'approved').length },
    { id: 'pending', label: 'Pending', count: employers.filter(e => e.status === 'pending').length },
    { id: 'rejected', label: 'Rejected', count: employers.filter(e => e.status === 'rejected').length }
  ];

  const filteredEmployers = employers.filter(employer => {
    // Filter by tab
    if (activeTab !== 'all' && employer.status !== activeTab) {
      return false;
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        employer.companyName.toLowerCase().includes(query) ||
        employer.contactName.toLowerCase().includes(query) ||
        employer.email.toLowerCase().includes(query) ||
        employer.industry.toLowerCase().includes(query) ||
        employer.location.toLowerCase().includes(query)
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
                >
                  Add Employer
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
                  {filteredEmployers.map((employer) => (
                    <TableRow
                      key={employer.id}
                      onClick={() => navigate(`/employer/${employer.id}`)}
                    >
                      <TableCell>
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={employer.logoUrl || "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=100"}
                              alt={employer.companyName}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{employer.companyName}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{employer.size} employees</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{employer.contactName}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{employer.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{employer.industry}</TableCell>
                      <TableCell>{employer.location}</TableCell>
                      <TableCell>{employer.postCount}</TableCell>
                      <TableCell>
                        <StatusBadge status={employer.status} />
                      </TableCell>
                      <TableCell>{formatDate(employer.createdAt)}</TableCell>
                    </TableRow>
                  ))}
                  {filteredEmployers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">No employers found</p>
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

export default EmployerList;