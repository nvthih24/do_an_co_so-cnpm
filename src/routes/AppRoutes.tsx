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

// Protected pages
import Dashboard from '../pages/dashboard/Dashboard';
import ProfilePage from '../pages/profile/ProfilePage';
import JobPostPage from '../pages/employer/JobPostPage';
import ApplicationsPage from '../pages/dashboard/ApplicationsPage';
import CompanyProfilePage from '../pages/employer/CompanyProfilePage';
import ResumeSearchPage from '../pages/employer/ResumeSearchPage';
import NotFoundPage from '../pages/NotFoundPage';
import AdminDashboard from "../pages/admin/Dashboard_Admin";



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
      <Route path="/employers" element={<EmployersPage />} />
      <Route path="/career-resources" element={<CareerResourcesPage />} />
      <Route path="/job-alerts" element={<JobAlertsPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsOfServicePage />} />
      <Route path="/create-profile" element={<CreateProfilePage />} />
      <Route path="/pricing" element={<PricingPlansPage />} />
      <Route path="/employer-resources" element={<EmployerResourcesPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/admin" element={<AdminDashboard />} />


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