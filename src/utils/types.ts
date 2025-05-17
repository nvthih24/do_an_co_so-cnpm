export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'blacklisted';
  skills: string[];
  experience: number;
  education: string;
  location: string;
  appliedCount: number;
  createdAt: string;
  updatedAt: string;
  avatarUrl?: string;
}

export interface Employer {
  id: string;
  companyName: string;
  industry: string;
  contactName: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected';
  location: string;
  size: string;
  website: string;
  createdAt: string;
  updatedAt: string;
  logoUrl?: string;
  postCount: number;
}

export interface Post {
  id: string;
  title: string;
  company: string;
  employerId: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  category: string;
  description: string;
  requirements: string[];
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  featured: boolean;
  applicationCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  candidates: {
    total: number;
    active: number;
    new: number;
  };
  employers: {
    total: number;
    pending: number;
    active: number;
  };
  posts: {
    total: number;
    pending: number;
    approved: number;
  };
  applications: {
    total: number;
    thisWeek: number;
  };
}

export interface Activity {
  id: string;
  type: 'new_employer' | 'new_post' | 'post_approved' | 'new_candidate';
  entityId: string;
  entityName: string;
  timestamp: string;
}