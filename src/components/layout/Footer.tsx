import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase as BriefcaseBusiness, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and company info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <BriefcaseBusiness className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-bold">Job247</span>
            </div>
            <p className="text-gray-400 mb-4">
              Connecting top talent with exceptional opportunities. 
              Your career journey starts here.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* For Job Seekers */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-slate-300">For Job Seekers</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/jobs" className="text-gray-400 hover:text-white transition-colors">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link to="/create-profile" className="text-gray-400 hover:text-white transition-colors">
                  Create Profile
                </Link>
              </li>
              <li>
                <Link to="/career-resources" className="text-gray-400 hover:text-white transition-colors">
                  Career Resources
                </Link>
              </li>
              <li>
                <Link to="/job-alerts" className="text-gray-400 hover:text-white transition-colors">
                  Job Alerts
                </Link>
              </li>
            </ul>
          </div>
          
          {/* For Employers */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-slate-300">For Employers</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/post-job" className="text-gray-400 hover:text-white transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link to="/resume-search" className="text-gray-400 hover:text-white transition-colors">
                  Resume Search
                </Link>
              </li>
              <li>
                <Link to="/employer-resources" className="text-gray-400 hover:text-white transition-colors">
                  Employer Resources
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-slate-300">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Job247. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0">
            <ul className="flex space-x-6">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;