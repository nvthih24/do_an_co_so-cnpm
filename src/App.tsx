import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { ToastProvider } from './contexts/ToastContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Admin layout và các trang con
import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './pages/admin/Dashboard_Admin';
import CandidateList from './pages/candidates/CandidateList';
import CandidateDetails from './pages/candidates/CandidateDetails';
import EmployerList from './pages/employer/EmployerList_Admin';
import EmployerDetails from './pages/employer/EmployerDetails_Admin';
import PostList from './pages/posts/PostList_Admin';
import PostDetails from './pages/posts/PostDetails_Admin';
import PostForm from './pages/posts/PostForm_Admin';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <ToastProvider>
            <Routes>
              {/* Admin layout riêng */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="candidates" element={<CandidateList />} />
                <Route path="candidates/:id" element={<CandidateDetails />} />
                <Route path="employers" element={<EmployerList />} />
                <Route path="employers/:id" element={<EmployerDetails />} />
                <Route path="posts" element={<PostList />} />
                <Route path="posts/new" element={<PostForm />} />
                <Route path="posts/:id" element={<PostDetails />} />
                <Route path="posts/:id/edit" element={<PostForm />} />
              </Route>

              {/* Website người dùng */}
              <Route
                path="/*"
                element={
                  <div className="flex flex-col min-h-screen bg-gray-50">
                    <Header />
                    <main className="flex-grow">
                      <AppRoutes />
                    </main>
                    <Footer />
                  </div>
                }
              />
            </Routes>
          </ToastProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
