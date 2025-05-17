import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Search, Filter, Plus } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import StatusBadge from '../../components/ui/StatusBadge';
import Tabs from '../../components/ui/Tab';
import { candidates } from '../../utils/mockData';
import { formatDate } from '../../utils/helpers';
import Header from '../../components/layout/Header_Admin';
import Sidebar from '../../components/layout/Sidebar';
import { useTheme } from '../../contexts/ThemeContext';

const CandidateList: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { theme } = useTheme();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const tabs = [
    { id: 'all', label: 'All Candidates', count: candidates.length },
    { id: 'active', label: 'Active', count: candidates.filter(c => c.status === 'active').length },
    { id: 'inactive', label: 'Inactive', count: candidates.filter(c => c.status === 'inactive').length },
    { id: 'blacklisted', label: 'Blacklisted', count: candidates.filter(c => c.status === 'blacklisted').length }
  ];

  const filteredCandidates = candidates.filter(candidate => {
    // Filter by tab
    if (activeTab !== 'all' && candidate.status !== activeTab) {
      return false;
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        candidate.name.toLowerCase().includes(query) ||
        candidate.email.toLowerCase().includes(query) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(query)) ||
        candidate.location.toLowerCase().includes(query)
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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Candidates</h1>
                <p className="text-gray-500 dark:text-gray-400">Manage all job candidates in the system</p>
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search candidates..."
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
                  Add Candidate
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
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Email</TableHeaderCell>
                    <TableHeaderCell>Skills</TableHeaderCell>
                    <TableHeaderCell>Location</TableHeaderCell>
                    <TableHeaderCell>Applications</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Joined</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCandidates.map((candidate) => (
                    <TableRow
                      key={candidate.id}
                      onClick={() => navigate(`/candidates/${candidate.id}`)}
                    >
                      <TableCell>
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={candidate.avatarUrl || "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100"}
                              alt={candidate.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{candidate.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{candidate.experience} years exp.</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{candidate.email}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.slice(0, 3).map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded dark:bg-gray-700 dark:text-gray-300"
                            >
                              {skill}
                            </span>
                          ))}
                          {candidate.skills.length > 3 && (
                            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded dark:bg-gray-700 dark:text-gray-300">
                              +{candidate.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{candidate.location}</TableCell>
                      <TableCell>{candidate.appliedCount}</TableCell>
                      <TableCell>
                        <StatusBadge status={candidate.status} />
                      </TableCell>
                      <TableCell>{formatDate(candidate.createdAt)}</TableCell>
                    </TableRow>
                  ))}
                  {filteredCandidates.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">No candidates found</p>
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

export default CandidateList;