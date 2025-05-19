import React, { useState, useEffect, Component, ErrorInfo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Building, Clock, DollarSign, Briefcase, Share2, BookmarkPlus, Award, User, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  description: string;
  requirements: string;
  benefits: string;
  featured: boolean;
  isApproved: boolean;
  createdAt: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError(_: Error): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <h3 className="text-xl font-semibold mb-2">Something went wrong</h3>
          <p className="text-gray-500">Unable to display content. Please try again later.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const { showToast } = useToast();
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [job, setJob] = useState<Job | null>(null);
  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false); // Trạng thái nút Save

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError(null);

        const jobResponse = await fetch(`http://localhost:5000/api/jobs/${id}`);
        if (!jobResponse.ok) {
          throw new Error(`HTTP error ${jobResponse.status}: ${jobResponse.statusText}`);
        }
        const jobData: Job = await jobResponse.json();
        console.log('Fetched job:', jobData);

        const similarResponse = await fetch(`http://localhost:5000/api/jobs/approved?limit=3`);
        if (!similarResponse.ok) {
          throw new Error(`HTTP error ${similarResponse.status}: ${similarResponse.statusText}`);
        }
        const similarData: Job[] = await similarResponse.json();
        console.log('Fetched similar jobs:', similarData);

        setJob(jobData);
        setSimilarJobs(similarData.filter((j) => j._id !== jobData._id));

        // Kiểm tra xem job đã được lưu chưa
        if (isAuthenticated && user?.id) {
          const savedResponse = await fetch(`http://localhost:5000/api/jobs/saved${user.id}`);
          if (savedResponse.ok) {
            const savedJobs: Job[] = await savedResponse.json();
            setIsSaved(savedJobs.some((savedJob) => savedJob._id === id));
          }
        }
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(err.message || 'Error fetching job details');
        showToast(err.message || 'Failed to load job details', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, showToast, isAuthenticated, user]);

  const handleSaveJob = async () => {
    if (!isAuthenticated || !user?.id) {
      showToast('Please sign in to save jobs', 'error');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/jobs/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, jobId: id }),
      });

      let errorData;
      try {
        errorData = await response.json();
      } catch (jsonError) {
        errorData = { message: `Server error: ${response.statusText}` };
      }

      if (!response.ok) {
        throw new Error(errorData.message || 'Failed to save job');
      }

      setIsSaved(true);
      showToast('Job saved successfully', 'success');
    } catch (err: any) {
      console.error('Save job error:', err);
      showToast(err.message || 'Failed to save job', 'error');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">Loading job details...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
        <p className="mb-6">{error || "The job listing you're looking for doesn't exist or has been removed."}</p>
        <Link to="/jobs" className="btn btn-primary">
          Back to Jobs
        </Link>
      </div>
    );
  }

  const tags = job.requirements ? job.requirements.split(',').map((item) => item.trim()) : [];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=120"
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
                      <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{job.salary}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="badge bg-blue-100 text-blue-800">{job.type}</span>
                    {job.featured && (
                      <span className="badge badge-success">Featured</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between mt-6 pt-6 border-t border-gray-100">
                <div className="flex gap-2 mb-4 sm:mb-0">
                  <button
                    onClick={handleSaveJob}
                    className={`btn btn-outline flex items-center ${isSaved ? 'bg-green-100 text-green-700' : ''}`}
                    disabled={isSaved}
                  >
                    <BookmarkPlus className="h-4 w-4 mr-2" />
                    {isSaved ? 'Saved' : 'Save'}
                  </button>
                  <button className="btn btn-outline flex items-center">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </button>
                </div>
                <button
                  onClick={() => setShowApplyForm(!showApplyForm)}
                  className="btn btn-primary text-gray-400 flex items-center"
                >
                  Apply Now
                </button>
              </div>
              {showApplyForm && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  {isAuthenticated ? (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium mb-4">Submit Your Application</h3>
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          if (isSubmitting) return;
                          setIsSubmitting(true);

                          try {
                            const formData = new FormData(e.currentTarget);
                            const resumeFile = formData.get('resume') as File;

                            if (!resumeFile || resumeFile.size === 0) {
                              throw new Error('Please upload a resume');
                            }
                            if (resumeFile.size > 5 * 1024 * 1024) {
                              throw new Error('Resume file size exceeds 5MB');
                            }
                            if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(resumeFile.type)) {
                              throw new Error('Only PDF or DOCX files are allowed');
                            }

                            const applicationData = new FormData();
                            applicationData.append('jobId', job._id);
                            applicationData.append('userId', user?.id || '');
                            applicationData.append('fullName', formData.get('fullName') as string);
                            applicationData.append('email', formData.get('email') as string);
                            applicationData.append('phone', formData.get('phone') as string);
                            applicationData.append('resume', resumeFile);
                            applicationData.append('coverLetter', formData.get('coverLetter') as string);

                            console.log('Submitting application:', Object.fromEntries(applicationData));

                            const response = await fetch('http://localhost:5000/api/jobs/applications', {
                              method: 'POST',
                              body: applicationData,
                            });

                            let errorData;
                            try {
                              errorData = await response.json();
                            } catch (jsonError) {
                              errorData = { message: `Server error: ${response.statusText}` };
                            }

                            if (!response.ok) {
                              throw new Error(errorData.message || 'Failed to submit application');
                            }

                            showToast('Application submitted successfully', 'success');
                            setShowApplyForm(false);
                          } catch (err: any) {
                            console.error('Submit error:', err);
                            showToast(err.message || 'Failed to submit application', 'error');
                          } finally {
                            setIsSubmitting(false);
                          }
                        }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="form-label">Full Name</label>
                          <input
                            type="text"
                            name="fullName"
                            className="form-input"
                            defaultValue={user?.name || ''}
                            required
                          />
                        </div>
                        <div>
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            name="email"
                            className="form-input"
                            defaultValue={user?.email || ''}
                            required
                          />
                        </div>
                        <div>
                          <label className="form-label">Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            className="form-input"
                            required
                          />
                        </div>
                        <div>
                          <label className="form-label">Resume/CV</label>
                          <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                              <div className="flex flex-col items-center justify-center pt-7">
                                <svg
                                  className="w-8 h-8 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                  ></path>
                                </svg>
                                <p className="pt-1 text-sm text-gray-500">
                                  Upload your resume or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">
                                  PDF, DOCX up to 5MB
                                </p>
                              </div>
                              <input
                                type="file"
                                name="resume"
                                accept=".pdf,.docx"
                                className="opacity-0"
                                required
                              />
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className="form-label">Cover Letter (Optional)</label>
                          <textarea
                            name="coverLetter"
                            className="form-input"
                            rows={4}
                            placeholder="Why are you a good fit for this position?"
                          ></textarea>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary text-black w-full"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-6 rounded-lg text-center">
                      <h3 className="text-lg font-medium mb-2">Sign in to apply</h3>
                      <p className="text-gray-600 mb-4">
                        You need to be logged in to apply for this position.
                      </p>
                      <div className="flex gap-4 justify-center">
                        <Link to="/login" className="btn btn-primary text-gray-400">
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
            <ErrorBoundary>
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
                    {tags.length > 0 ? (
                      tags.map((req, index) => <li key={index}>{req}</li>)
                    ) : (
                      <li>No requirements listed</li>
                    )}
                  </ul>
                  <h3 className="text-lg font-medium mt-6 mb-3">Benefits:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {job.benefits ? (
                      job.benefits.split(',').map((benefit, index) => <li key={index}>{benefit.trim()}</li>)
                    ) : (
                      <li>No benefits listed</li>
                    )}
                  </ul>
                </div>
              </div>
            </ErrorBoundary>
            <ErrorBoundary>
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
            </ErrorBoundary>
          </div>
          <div className="space-y-6">
            <ErrorBoundary>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Job Overview</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Posted Date</h3>
                      <p className="text-gray-600">{new Date(job.createdAt).toLocaleDateString()}</p>
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
            </ErrorBoundary>
            <ErrorBoundary>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {tags.length > 0 ? (
                    tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">No skills listed</span>
                  )}
                </div>
              </div>
            </ErrorBoundary>
            <ErrorBoundary>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Similar Jobs</h2>
                <div className="space-y-4">
                  {similarJobs.length > 0 ? (
                    similarJobs.map((similarJob) => (
                      <Link
                        key={similarJob._id}
                        to={`/jobs/${similarJob._id}`}
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
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No similar jobs found</p>
                  )}
                </div>
                <Link to="/jobs" className="btn btn-outline w-full mt-4">
                  View All Jobs
                </Link>
              </div>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;