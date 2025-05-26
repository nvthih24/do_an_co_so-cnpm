import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';

// Public pages
import HomePage from '../pages/HomePage';
import JobSearchPage from '../pages/JobSearchPage';
import JobDetailPage from '../pages/JobDetailPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import EmployersPage from '../pages/EmployersPage';
import CareerResourcesPage from '../pages/resources/CareerResourcesPage';
import JobAlertsPage from '../pages/jobs/JobAlertsPage';
import PrivacyPolicyPage from '../pages/legal/PrivacyPolicyPage';
import TermsOfServicePage from '../pages/legal/TermsOfServicePage';
import CreateProfilePage from '../pages/profile/CreateProfilePage';
import PricingPlansPage from '../pages/pricing/PricingPlansPage';
import EmployerResourcesPage from '../pages/employer/EmployerResourcesPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import SavedJobsPage from '../pages/SavedJobsPage';
import CVTemplates from "../pages/CVTemplates";
import EditCVPage from "../pages/EditCVPage";

// Protected pages
import Dashboard from '../pages/dashboard/Dashboard';
import ProfilePage from '../pages/profile/ProfilePage';
import JobPostPage from '../pages/employer/JobPostPage';
import ApplicationsPage from '../pages/dashboard/ApplicationsPage';
import CompanyProfilePage from '../pages/employer/CompanyProfilePage';
import ResumeSearchPage from '../pages/employer/ResumeSearchPage';
import NotFoundPage from '../pages/NotFoundPage';
import AdminDashboard from "../pages/admin/Dashboard_Admin";
import EmployerList from '../pages/employer/EmployerList_Admin';
import EmployerDetails from '../pages/employer/EmployerDetails_Admin';
import CandidateDetails from '../pages/candidates/CandidateDetails';
import CandidateList from '../pages/candidates/CandidateList';
import PostList from '../pages/posts/PostList_Admin';
import PostDetails from '../pages/posts/PostDetails_Admin';
import PostForm from '../pages/posts/PostForm_Admin';
import JobsPosted from '../pages/dashboard/JobsPosted';
import CandidatePage_Employer from '../pages/CandidatePage_Employer'

// Route guard component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/jobs" element={<JobSearchPage />} />
      <Route path="/jobs/:id" element={<JobDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/employer-user" element={<EmployersPage />} />
      <Route path="/career-resources" element={<CareerResourcesPage />} />
      <Route path="/job-alerts" element={<JobAlertsPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsOfServicePage />} />
      <Route path="/create-profile" element={<CreateProfilePage />} />
      <Route path="/pricing" element={<PricingPlansPage />} />
      <Route path="/employer-resources" element={<EmployerResourcesPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/saved-jobs" element={<SavedJobsPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/employer-admin" element={<EmployerList />} />
      <Route path="employer-admin/:id" element={<EmployerDetails />} />
      <Route path="candidates-admin" element={<CandidateList />} />
      <Route path="candidates-admin/:id" element={<CandidateDetails />} />
      <Route path="posts" element={<PostList />} />
      <Route path="posts/new" element={<PostForm />} />
      <Route path="posts/:id" element={<PostDetails />} />
      <Route path="posts/:id/edit" element={<PostForm />} />
      <Route path="/create-cv" element={<CVTemplates />} />
      <Route path="/edit-cv/:id" element={<EditCVPage />} />
      <Route path="/jobs-posted" element={<JobsPosted />} />
      <Route path="/candidates-employer" element={<CandidatePage_Employer />} />

      {/* Redirects */}

      {/* Redirect from old routes */}

      {/* Protected routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      } />
      <Route path="/post-job" element={
        <ProtectedRoute>
          <JobPostPage />
        </ProtectedRoute>
      } />
      <Route path="/applications" element={
        <ProtectedRoute>
          <ApplicationsPage />
        </ProtectedRoute>
      } />
      <Route path="/company-profile" element={
        <ProtectedRoute>
          <CompanyProfilePage />
        </ProtectedRoute>
      } />
      <Route path="/resume-search" element={
        <ProtectedRoute>
          <ResumeSearchPage />
        </ProtectedRoute>
      } />
      

      {/* Catch-all route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>


  );
};

export default AppRoutes;