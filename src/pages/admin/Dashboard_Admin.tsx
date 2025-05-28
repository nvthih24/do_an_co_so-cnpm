import {
  Users,
  Building2,
  FileText,
  Mail,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '../../components/ui/Table';
import { useEffect, useState } from 'react';

interface DashboardStats {
  candidates: { total: number; active: number; new: number };
  employers: { total: number; active: number; pending: number };
  posts: { total: number; approved: number; pending: number };
  applications: { total: number; thisWeek: number };
}

interface CandidateChartData {
  month: string;
  count: number;
}

interface JobPostChartData {
  month: string;
  pending: number;
  approved: number;
}

interface RecentActivity {
  id: string;
  type: 'new_employer' | 'new_post' | 'post_approved' | 'new_candidate';
  entityName: string;
  timestamp: string | Date;
}

const formatTimeAgo = (date: Date | string): string => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - parsedDate.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
};

const Dashboard_Admin: React.FC = () => {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    candidates: { total: 0, active: 0, new: 0 },
    employers: { total: 0, active: 0, pending: 0 },
    posts: { total: 0, approved: 0, pending: 0 },
    applications: { total: 0, thisWeek: 0 },
  });
  const [candidatesChartData, setCandidatesChartData] = useState<CandidateChartData[]>([]);
  const [jobPostsChartData, setJobPostsChartData] = useState<JobPostChartData[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);

  const fetchDashboardData = async () => {
    try {
      const statsResponse = await fetch('/api/dashboard/stats');
      const statsData = await statsResponse.json();
      setDashboardStats(statsData);

      const candidatesResponse = await fetch('/api/dashboard/candidates/monthly');
      const candidatesData = await candidatesResponse.json();
      setCandidatesChartData(candidatesData);

      const jobsResponse = await fetch('/api/dashboard/jobs/monthly');
      const jobsData = await jobsResponse.json();
      setJobPostsChartData(jobsData);

      const activityResponse = await fetch('/api/dashboard/activities/recent');
      const activityData = await activityResponse.json();
      setRecentActivity(activityData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Welcome to the recruitment management dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 mr-4">
                <Users size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Candidates</p>
                <div className="flex items-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mr-2">{dashboardStats.candidates.total}</h3>
                  <span className="text-xs font-medium text-green-600 dark:text-green-400 flex items-center">
                    <ArrowUp size={12} className="mr-1" />
                    {dashboardStats.candidates.total ? Math.round((dashboardStats.candidates.new / dashboardStats.candidates.total) * 100) : 0}%
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Active: {dashboardStats.candidates.active}</span>
                <span>New this week: {dashboardStats.candidates.new}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-1 dark:bg-gray-700">
                <div
                  className="h-2 bg-blue-600 rounded-full dark:bg-blue-500"
                  style={{ width: `${dashboardStats.candidates.total ? (dashboardStats.candidates.active / dashboardStats.candidates.total) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-300 mr-4">
                <Building2 size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Employers</p>
                <div className="flex items-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mr-2">{dashboardStats.employers.total}</h3>
                  <span className="text-xs font-medium text-green-600 dark:text-green-400 flex items-center">
                    <ArrowUp size={12} className="mr-1" />
                    {dashboardStats.employers.total ? Math.round((dashboardStats.employers.pending / dashboardStats.employers.total) * 100) : 0}%
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Active: {dashboardStats.employers.active}</span>
                <span>Pending: {dashboardStats.employers.pending}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-1 dark:bg-gray-700">
                <div
                  className="h-2 bg-teal-600 rounded-full dark:bg-teal-500"
                  style={{ width: `${dashboardStats.employers.total ? (dashboardStats.employers.active / dashboardStats.employers.total) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300 mr-4">
                <FileText size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Job Posts</p>
                <div className="flex items-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mr-2">{dashboardStats.posts.total}</h3>
                  <span className="text-xs font-medium text-green-600 dark:text-green-400 flex items-center">
                    <ArrowUp size={12} className="mr-1" />
                    {dashboardStats.posts.total ? Math.round((dashboardStats.posts.pending / dashboardStats.posts.total) * 100) : 0}%
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Approved: {dashboardStats.posts.approved}</span>
                <span>Pending: {dashboardStats.posts.pending}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-1 dark:bg-gray-700">
                <div
                  className="h-2 bg-amber-600 rounded-full dark:bg-amber-500"
                  style={{ width: `${dashboardStats.posts.total ? (dashboardStats.posts.approved / dashboardStats.posts.total) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 mr-4">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Applications</p>
                <div className="flex items-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mr-2">{dashboardStats.applications.total}</h3>
                  <span className="text-xs font-medium text-red-600 dark:text-red-400 flex items-center">
                    <ArrowDown size={12} className="mr-1" />
                    {dashboardStats.applications.total ? Math.round((dashboardStats.applications.thisWeek / dashboardStats.applications.total) * 100) : 0}%
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Total: {dashboardStats.applications.total}</span>
                <span>This week: {dashboardStats.applications.thisWeek}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-1 dark:bg-gray-700">
                <div
                  className="h-2 bg-purple-600 rounded-full dark:bg-purple-500"
                  style={{ width: `${dashboardStats.applications.total ? (dashboardStats.applications.thisWeek / 500) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>New Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={candidatesChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    name="New Candidates"
                    stroke="#2563eb"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Job Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={jobPostsChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pending" name="Pending" fill="#f59e0b" />
                  <Bar dataKey="approved" name="Approved" fill="#0d9488" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Activity</TableHeaderCell>
                <TableHeaderCell>Entity</TableHeaderCell>
                <TableHeaderCell>Time</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentActivity.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {activity.type === 'new_employer' && 'New employer registration'}
                      {activity.type === 'new_post' && 'New job post submitted'}
                      {activity.type === 'post_approved' && 'Job post approved'}
                      {activity.type === 'new_candidate' && 'New candidate registration'}
                    </div>
                  </TableCell>
                  <TableCell>{activity.entityName}</TableCell>
                  <TableCell>{formatTimeAgo(activity.timestamp)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard_Admin;