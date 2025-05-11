import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Building, Clock, DollarSign, Briefcase, Share2, BookmarkPlus, Award, User, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockJobs } from '../data/mockJobs';

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const [showApplyForm, setShowApplyForm] = useState(false);
  
  // Find the job by ID
  const job = mockJobs.find(job => job.id.toString() === id);
  
  if (!job) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
        <p className="mb-6">The job listing you're looking for doesn't exist or has been removed.</p>
        <Link to="/jobs" className="btn btn-primary">
          Back to Jobs
        </Link>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job details - left column (2/3 width on large screens) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={job.logo} 
                    alt={job.company} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-grow">
                  <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
                  
                  <div className="flex flex-wrap gap-y-2 gap-x-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Building className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{job.company}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{job.location}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      <span>Posted {job.posted}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{job.salary}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="badge bg-blue-100 text-blue-800">
                      {job.type}
                    </span>
                    {job.featured && (
                      <span className="badge badge-success">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between mt-6 pt-6 border-t border-gray-100">
                <div className="flex gap-2 mb-4 sm:mb-0">
                  <button className="btn btn-outline flex items-center">
                    <BookmarkPlus className="h-4 w-4 mr-2" />
                    Save
                  </button>
                  <button className="btn btn-outline flex items-center">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </button>
                </div>
                
                <button 
                  onClick={() => setShowApplyForm(!showApplyForm)}
                  className="btn btn-primary"
                >
                  Apply Now
                </button>
              </div>
              
              {/* Apply form */}
              {showApplyForm && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  {isAuthenticated ? (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium mb-4">Submit Your Application</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="form-label">Full Name</label>
                          <input 
                            type="text" 
                            className="form-input"
                            defaultValue={user?.name || ''}
                          />
                        </div>
                        <div>
                          <label className="form-label">Email</label>
                          <input 
                            type="email" 
                            className="form-input"
                            defaultValue={user?.email || ''}
                          />
                        </div>
                        <div>
                          <label className="form-label">Phone</label>
                          <input type="tel" className="form-input" />
                        </div>
                        <div>
                          <label className="form-label">Resume/CV</label>
                          <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                              <div className="flex flex-col items-center justify-center pt-7">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                </svg>
                                <p className="pt-1 text-sm text-gray-500">
                                  Upload your resume or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">
                                  PDF, DOCX up to 5MB
                                </p>
                              </div>
                              <input type="file" className="opacity-0" />
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className="form-label">Cover Letter (Optional)</label>
                          <textarea 
                            className="form-input" 
                            rows={4}
                            placeholder="Why are you a good fit for this position?"
                          ></textarea>
                        </div>
                        <button className="btn btn-primary w-full">
                          Submit Application
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-6 rounded-lg text-center">
                      <h3 className="text-lg font-medium mb-2">Sign in to apply</h3>
                      <p className="text-gray-600 mb-4">
                        You need to be logged in to apply for this position.
                      </p>
                      <div className="flex gap-4 justify-center">
                        <Link to="/login" className="btn btn-primary">
                          Sign In
                        </Link>
                        <Link to="/register" className="btn btn-outline">
                          Create Account
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Job details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Job Description</h2>
              <div className="prose max-w-none">
                <p className="mb-4">{job.description}</p>
                
                <h3 className="text-lg font-medium mt-6 mb-3">Responsibilities:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Design and implement new features and functionality for our platform</li>
                  <li>Contribute to architectural decisions and help define best practices</li>
                  <li>Write clean, maintainable, and efficient code</li>
                  <li>Collaborate with cross-functional teams to define, design, and ship new features</li>
                  <li>Identify and address performance bottlenecks</li>
                  <li>Participate in code reviews and mentor junior developers</li>
                </ul>
                
                <h3 className="text-lg font-medium mt-6 mb-3">Requirements:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>3+ years of professional experience in software development</li>
                  <li>Proficiency in JavaScript/TypeScript and familiarity with React</li>
                  <li>Experience with responsive design and cross-browser compatibility</li>
                  <li>Understanding of RESTful APIs and modern authorization mechanisms</li>
                  <li>Experience with version control systems (Git)</li>
                  <li>Strong problem-solving skills and attention to detail</li>
                </ul>
                
                <h3 className="text-lg font-medium mt-6 mb-3">Benefits:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Competitive salary and equity</li>
                  <li>Health, dental, and vision insurance</li>
                  <li>Flexible work hours and remote work options</li>
                  <li>Professional development stipend</li>
                  <li>Paid time off and company holidays</li>
                  <li>Modern equipment and ergonomic workspace</li>
                </ul>
              </div>
            </div>
            
            {/* Company description */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">About {job.company}</h2>
              <p className="text-gray-700 mb-4">
                {job.company} is a leading technology company focused on revolutionizing the way people work. 
                Our platform helps businesses streamline their operations, improve collaboration, and drive growth. 
                Founded in 2015, we've grown to serve over 500 companies worldwide with our innovative solutions.
              </p>
              <div className="flex flex-wrap gap-4 items-center mt-6">
                <Link to={`/companies/${job.company}`} className="btn btn-outline">
                  View Company Profile
                </Link>
                <a href="#" className="text-primary-600 hover:text-primary-700 flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  Company Website
                </a>
              </div>
            </div>
          </div>
          
          {/* Job sidebar - right column (1/3 width on large screens) */}
          <div className="space-y-6">
            {/* Job overview */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Job Overview</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Posted Date</h3>
                    <p className="text-gray-600">October 15, 2025</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Briefcase className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Job Type</h3>
                    <p className="text-gray-600">{job.type}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Location</h3>
                    <p className="text-gray-600">{job.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Award className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Experience</h3>
                    <p className="text-gray-600">{job.experience}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <DollarSign className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Salary</h3>
                    <p className="text-gray-600">{job.salary}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <User className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Vacancies</h3>
                    <p className="text-gray-600">2 positions</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Skills */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Similar jobs */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Similar Jobs</h2>
              
              <div className="space-y-4">
                {mockJobs.slice(0, 3).map(similarJob => (
                  <Link
                    key={similarJob.id}
                    to={`/jobs/${similarJob.id}`}
                    className="block p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-medium text-primary-600">{similarJob.title}</h3>
                    <div className="flex items-center text-gray-600 text-sm mt-1">
                      <Building className="h-3 w-3 mr-1" />
                      <span>{similarJob.company}</span>
                      <span className="mx-2">•</span>
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{similarJob.location}</span>
                    </div>
                  </Link>
                ))}
              </div>
              
              <Link to="/jobs" className="btn btn-outline w-full mt-4">
                View All Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;