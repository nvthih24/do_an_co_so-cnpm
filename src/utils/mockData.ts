import { Candidate, Employer, Post, DashboardStats, Activity, Company, Job,  Application, Interview } from './types';
import { format, subDays } from 'date-fns';

// Helper to generate dates
const generateDate = (daysAgo: number) => {
  return format(subDays(new Date(), daysAgo), "yyyy-MM-dd'T'HH:mm:ss");
};

// Mock candidates
export const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    status: 'active',
    skills: ['JavaScript', 'React', 'Node.js'],
    experience: 5,
    education: 'Bachelor in Computer Science',
    location: 'San Francisco, CA',
    appliedCount: 12,
    createdAt: generateDate(30),
    updatedAt: generateDate(2),
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        profilePicture: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    name: 'Samantha Williams',
    email: 'samantha.w@example.com',
    phone: '+1 (555) 987-6543',
    status: 'active',
    skills: ['UX/UI Design', 'Figma', 'Sketch'],
    experience: 3,
    education: 'Masters in Design',
    location: 'New York, NY',
    appliedCount: 8,
    createdAt: generateDate(45),
    updatedAt: generateDate(5),
        profilePicture: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  },
  {
    id: '3',
    name: 'David Rodriguez',
    email: 'david.r@example.com',
    phone: '+1 (555) 234-5678',
    status: 'inactive',
    skills: ['Python', 'Data Science', 'Machine Learning'],
    experience: 7,
    education: 'PhD in Computer Science',
    location: 'Austin, TX',
    appliedCount: 5,
    createdAt: generateDate(60),
    updatedAt: generateDate(15),
        profilePicture: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    avatarUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  },
  {
    id: '4',
    name: 'Emily Chen',
    email: 'emily.chen@example.com',
    phone: '+1 (555) 876-5432',
    status: 'active',
    skills: ['Java', 'Spring', 'Microservices'],
    experience: 4,
    education: 'Masters in Software Engineering',
    location: 'Seattle, WA',
    appliedCount: 15,
    createdAt: generateDate(20),
    updatedAt: generateDate(1),
        profilePicture: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    avatarUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  },
  {
    id: '5',
    name: 'Michael Thompson',
    email: 'michael.t@example.com',
    phone: '+1 (555) 345-6789',
    status: 'blacklisted',
    skills: ['Product Management', 'Agile', 'JIRA'],
    experience: 10,
    education: 'MBA',
    location: 'Chicago, IL',
    appliedCount: 0,
    createdAt: generateDate(90),
    updatedAt: generateDate(30),
        profilePicture: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    avatarUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  }
];

// Mock employers
export const employers: Employer[] = [
  {
    id: '1',
    companyName: 'TechInnovate',
    industry: 'Technology',
    contactName: 'John Smith',
    email: 'j.smith@techinnovate.com',
    phone: '+1 (555) 111-2222',
    status: 'approved',
    location: 'San Francisco, CA',
    size: '50-200',
    website: 'https://techinnovate.example.com',
    createdAt: generateDate(120),
    updatedAt: generateDate(10),
    logoUrl: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&h=250',
    postCount: 5
  },
  {
    id: '2',
    companyName: 'Global Finance',
    industry: 'Financial Services',
    contactName: 'Maria Garcia',
    email: 'maria@globalfinance.com',
    phone: '+1 (555) 333-4444',
    status: 'approved',
    location: 'New York, NY',
    size: '1000+',
    website: 'https://globalfinance.example.com',
    createdAt: generateDate(150),
    updatedAt: generateDate(20),
    logoUrl: 'https://images.pexels.com/photos/66100/pexels-photo-66100.jpeg?auto=compress&cs=tinysrgb&h=250',
    postCount: 8
  },
  {
    id: '3',
    companyName: 'Green Energy Solutions',
    industry: 'Energy',
    contactName: 'Robert Lee',
    email: 'r.lee@greenenergy.com',
    phone: '+1 (555) 555-6666',
    status: 'pending',
    location: 'Denver, CO',
    size: '10-50',
    website: 'https://greenenergy.example.com',
    createdAt: generateDate(5),
    updatedAt: generateDate(5),
    logoUrl: 'https://images.pexels.com/photos/2967770/pexels-photo-2967770.jpeg?auto=compress&cs=tinysrgb&h=250',
    postCount: 0
  },
  {
    id: '4',
    companyName: 'Health Innovations',
    industry: 'Healthcare',
    contactName: 'Sarah Johnson',
    email: 'sarah@healthinno.com',
    phone: '+1 (555) 777-8888',
    status: 'approved',
    location: 'Boston, MA',
    size: '200-500',
    website: 'https://healthinno.example.com',
    createdAt: generateDate(180),
    updatedAt: generateDate(30),
    logoUrl: 'https://images.pexels.com/photos/4492065/pexels-photo-4492065.jpeg?auto=compress&cs=tinysrgb&h=250',
    postCount: 3
  },
  {
    id: '5',
    companyName: 'Creative Media Group',
    industry: 'Media & Entertainment',
    contactName: 'James Wilson',
    email: 'james@creativemedia.com',
    phone: '+1 (555) 999-0000',
    status: 'rejected',
    location: 'Los Angeles, CA',
    size: '50-200',
    website: 'https://creativemedia.example.com',
    createdAt: generateDate(15),
    updatedAt: generateDate(2),
    logoUrl: 'https://images.pexels.com/photos/3585089/pexels-photo-3585089.jpeg?auto=compress&cs=tinysrgb&h=250',
    postCount: 0
  }
];

// Mock posts
export const posts: Post[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechInnovate',
    employerId: '1',
    location: 'San Francisco, CA',
    type: 'full-time',
    category: 'Engineering',
    description: 'We are looking for a Senior Frontend Developer with expertise in React...',
    requirements: ['5+ years of experience', 'Expert in React', 'TypeScript', 'State management'],
    salary: {
      min: 120000,
      max: 160000,
      currency: 'USD'
    },
    status: 'approved',
    featured: true,
    applicationCount: 35,
    createdAt: generateDate(30),
    updatedAt: generateDate(5)
  },
  {
    id: '2',
    title: 'Data Scientist',
    company: 'Global Finance',
    employerId: '2',
    location: 'New York, NY',
    type: 'full-time',
    category: 'Data Science',
    description: 'Join our data science team to build predictive models for financial markets...',
    requirements: ['Masters or PhD in relevant field', 'Python', 'Machine Learning', 'Statistical analysis'],
    salary: {
      min: 130000,
      max: 170000,
      currency: 'USD'
    },
    status: 'approved',
    featured: false,
    applicationCount: 22,
    createdAt: generateDate(45),
    updatedAt: generateDate(10)
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    company: 'TechInnovate',
    employerId: '1',
    location: 'Remote',
    type: 'full-time',
    category: 'Design',
    description: 'Design beautiful and intuitive user interfaces for our flagship product...',
    requirements: ['3+ years of experience', 'Figma', 'User research', 'Interaction design'],
    salary: {
      min: 90000,
      max: 120000,
      currency: 'USD'
    },
    status: 'pending',
    featured: false,
    applicationCount: 0,
    createdAt: generateDate(2),
    updatedAt: generateDate(2)
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'Health Innovations',
    employerId: '4',
    location: 'Boston, MA',
    type: 'full-time',
    category: 'Engineering',
    description: 'Manage our cloud infrastructure and CI/CD pipelines...',
    requirements: ['AWS/Azure experience', 'Kubernetes', 'Terraform', 'CI/CD'],
    salary: {
      min: 110000,
      max: 150000,
      currency: 'USD'
    },
    status: 'approved',
    featured: false,
    applicationCount: 15,
    createdAt: generateDate(60),
    updatedAt: generateDate(15)
  },
  {
    id: '5',
    title: 'Product Manager',
    company: 'Global Finance',
    employerId: '2',
    location: 'New York, NY',
    type: 'full-time',
    category: 'Product',
    description: 'Lead the development of new financial products for our digital platform...',
    requirements: ['5+ years in product management', 'Financial services background', 'Agile methodologies'],
    salary: {
      min: 130000,
      max: 180000,
      currency: 'USD'
    },
    status: 'pending',
    featured: false,
    applicationCount: 0,
    createdAt: generateDate(1),
    updatedAt: generateDate(1)
  }
];

// Dashboard statistics
export const dashboardStats: DashboardStats = {
  candidates: {
    total: 1245,
    active: 978,
    new: 87
  },
  employers: {
    total: 312,
    pending: 14,
    active: 289
  },
  posts: {
    total: 756,
    pending: 23,
    approved: 712
  },
  applications: {
    total: 8734,
    thisWeek: 342
  }
};

// Recent activity
export const recentActivity: Activity[] = [
  {
    id: '1',
    type: 'new_employer',
    entityId: '3',
    entityName: 'Green Energy Solutions',
    timestamp: generateDate(5)
  },
  {
    id: '2',
    type: 'new_post',
    entityId: '3',
    entityName: 'UX/UI Designer',
    timestamp: generateDate(2)
  },
  {
    id: '3',
    type: 'post_approved',
    entityId: '1',
    entityName: 'Senior Frontend Developer',
    timestamp: generateDate(5)
  },
  {
    id: '4',
    type: 'new_candidate',
    entityId: '4',
    entityName: 'Emily Chen',
    timestamp: generateDate(1)
  },
  {
    id: '5',
    type: 'new_post',
    entityId: '5',
    entityName: 'Product Manager',
    timestamp: generateDate(1)
  }
];

// Charts data
export const candidatesChartData = [
  { month: 'Jan', count: 45 },
  { month: 'Feb', count: 52 },
  { month: 'Mar', count: 61 },
  { month: 'Apr', count: 58 },
  { month: 'May', count: 63 },
  { month: 'Jun', count: 72 },
  { month: 'Jul', count: 68 },
  { month: 'Aug', count: 79 },
  { month: 'Sep', count: 87 },
  { month: 'Oct', count: 93 },
  { month: 'Nov', count: 85 },
  { month: 'Dec', count: 82 }
];

export const jobPostsChartData = [
  { month: 'Jan', pending: 12, approved: 35 },
  { month: 'Feb', pending: 14, approved: 42 },
  { month: 'Mar', pending: 18, approved: 48 },
  { month: 'Apr', pending: 15, approved: 51 },
  { month: 'May', pending: 21, approved: 55 },
  { month: 'Jun', pending: 19, approved: 59 },
  { month: 'Jul', pending: 23, approved: 63 },
  { month: 'Aug', pending: 26, approved: 68 },
  { month: 'Sep', pending: 24, approved: 72 },
  { month: 'Oct', pending: 28, approved: 75 },
  { month: 'Nov', pending: 22, approved: 78 },
  { month: 'Dec', pending: 23, approved: 81 }
];

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'TechNova Solutions',
    logo: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Leading technology solutions provider specializing in AI and machine learning applications.',
    industry: 'Technology',
    location: 'San Francisco, CA',
    website: 'www.technovasolutions.com',
    size: '100-500 employees',
    founded: 2015,
  },
  {
    id: '2',
    name: 'GreenEarth Renewables',
    logo: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Sustainable energy company focused on renewable solutions and green technology.',
    industry: 'Energy',
    location: 'Boulder, CO',
    website: 'www.greenearthenergy.com',
    size: '50-100 employees',
    founded: 2018,
  },
];

export const mockJobs: Job[] = [
  {
    id: '1',
    companyId: '1',
    title: 'Senior Frontend Developer',
    description: 'Join our team to build cutting-edge web applications using the latest technologies.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120,000 - $150,000',
    requirements: [
      'Proficient in React, TypeScript, and modern frontend frameworks',
      '5+ years of experience in frontend development',
      'Experience with state management solutions',
      'Strong problem-solving skills',
    ],
    responsibilities: [
      'Develop user interfaces for web applications',
      'Collaborate with designers and backend developers',
      'Implement responsive designs for all device sizes',
      'Optimize application performance',
    ],
    postedDate: '2023-09-15',
    deadline: '2023-10-15',
    status: 'Active',
  },
  {
    id: '2',
    companyId: '1',
    title: 'Product Manager',
    description: 'Lead product strategy and execution for our AI-powered solutions.',
    location: 'Remote',
    type: 'Full-time',
    salary: '$130,000 - $160,000',
    requirements: [
      'Proven experience in product management',
      'Understanding of AI and machine learning concepts',
      'Strong communication and leadership skills',
      'Ability to translate business requirements into product features',
    ],
    responsibilities: [
      'Define product vision and strategy',
      'Create and manage product roadmap',
      'Work with engineering teams to deliver features',
      'Analyze market trends and competitor products',
    ],
    postedDate: '2023-09-20',
    deadline: '2023-10-20',
    status: 'Active',
  },
  {
    id: '3',
    companyId: '2',
    title: 'Renewable Energy Engineer',
    description: 'Design and implement sustainable energy solutions for residential and commercial projects.',
    location: 'Boulder, CO',
    type: 'Full-time',
    salary: '$90,000 - $120,000',
    requirements: [
      'Degree in Mechanical or Electrical Engineering',
      'Experience with renewable energy systems',
      'Knowledge of energy efficiency standards',
      'Project management skills',
    ],
    responsibilities: [
      'Design solar and wind energy systems',
      'Perform energy audits and efficiency analyses',
      'Coordinate with installation teams',
      'Ensure compliance with regulations and standards',
    ],
    postedDate: '2023-09-10',
    deadline: '2023-10-10',
    status: 'Active',
  },
];

export const mockApplications: Application[] = [
  {
    id: '1',
    jobId: '1',
    candidateId: '1',
    status: 'Interview',
    appliedDate: '2023-09-20',
    notes: ['Strong technical skills', 'Good culture fit', 'Passed technical assessment'],
    rating: 4,
  },
  {
    id: '2',
    jobId: '2',
    candidateId: '2',
    status: 'Reviewing',
    appliedDate: '2023-09-22',
    notes: ['Extensive product management experience', 'Previous startup background'],
    rating: 3,
  },
  {
    id: '3',
    jobId: '3',
    candidateId: '3',
    status: 'Applied',
    appliedDate: '2023-09-15',
    notes: ['Relevant experience in renewable energy'],
    rating: 2,
  },
];

export const mockInterviews: Interview[] = [
  {
    id: '1',
    applicationId: '1',
    date: '2023-10-05',
    time: '10:00 AM',
    type: 'Video',
    notes: 'Prepare technical questions related to React and TypeScript',
    feedback: '',
    status: 'Scheduled',
  },
];