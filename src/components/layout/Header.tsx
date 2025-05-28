import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, Briefcase as BriefcaseBusiness, User, Search, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const isEmployer = user?.role === 'employer';

  // Xử lý sự kiện cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tắt menu mobile khi chuyển route
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Đặt sau hooks để tránh lỗi hook
  const isAdminRoute =
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/employer-admin') ||
    location.pathname.startsWith('/candidates-admin') ||
    location.pathname.startsWith('/posts');

  if (isAdminRoute) return null;

  return (
    <header
      className={`sticky top-0 z-30 w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2 dark:bg-gray-800' : 'bg-transparent py-4'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BriefcaseBusiness className="h-8 w-8 text-primary-500 dark:text-white" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">Job247</span>
          </Link>

          {/* Menu cho desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {isEmployer ? (
              <>
                <Link to="/dashboard" className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 rounded font-medium">Dashboard</Link>
                <Link to="/company-profile" className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 rounded font-medium">Company</Link>
                <Link to="/jobs-posted" className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 rounded font-medium">Jobs</Link>
                <Link to="/candidates-employer" className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 rounded font-medium">Candidates</Link>
                <Link to="/applications" className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 rounded font-medium">Applications</Link>
                <Link to="/interviews" className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 rounded font-medium">Interviews</Link>
              </>
            ) : (
              <>
                <Link to="/create-cv" className="text-gray-700 dark:text-white hover:text-primary-600 font-medium">Create CV</Link>
                <Link to="/jobs" className="dark:text-white hover:text-primary-600 font-medium">Find Jobs</Link>
                <Link to="/employer-user" className="dark:text-white hover:text-primary-600 font-medium">For Employers</Link>
                <Link to="/about" className="dark:text-white hover:text-primary-600 font-medium">About</Link>
                <Link to="/contact" className="dark:text-white hover:text-primary-600 font-medium">Contact</Link>
              </>
            )}
          </nav>

          {/* Nút theme, tài khoản, menu mobile */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-gray-500" />
              )}
            </button>

            {/* Auth buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 btn btn-outline rounded-full">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                    <span>{user?.name || "Account"}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 invisible group-hover:visible transition-all duration-300 opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-1">
                    <div className="py-2">
                      <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                      {user?.role === 'employer' && (
                        <Link to="/post-job" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Post a Job</Link>
                      )}
                      <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Out</button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline">Sign In</Link>
                  <Link to="/register" className="btn bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-gray-100 dark:border-gray-700 border-t border-gray-200 text-gray-700">Sign Up</Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-700 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white px-4 py-5 shadow-lg">
            <nav className="flex flex-col space-y-4">
              <Link to="/jobs" className="text-gray-700 hover:text-primary-600 font-medium py-2">Find Jobs</Link>
              <Link to="/employer-user" className="text-gray-700 hover:text-primary-600 font-medium py-2">For Employers</Link>
              <Link to="/about" className="text-gray-700 hover:text-primary-600 font-medium py-2">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary-600 font-medium py-2">Contact</Link>

              {/* Mobile auth */}
              <div className="pt-4 border-t border-gray-200 flex flex-col space-y-3">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center space-x-3 pb-3">
                      {user?.avatar ? (
                        <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <User className="w-10 h-10 p-2 bg-gray-100 rounded-full" />
                      )}
                      <div>
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    <Link to="/dashboard" className="text-gray-700 hover:text-primary-600 py-2">Dashboard</Link>
                    {user?.role === 'employer' && (
                      <Link to="/post-job" className="text-gray-700 hover:text-primary-600 py-2">Post a Job</Link>
                    )}
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Out</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn btn-outline">Sign In</Link>
                    <Link to="/register" className="btn btn-primary border-t border-gray-200 text-gray-700">Sign Up</Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
