import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Target, TrendingUp, FileText, Video, Download, ExternalLink } from 'lucide-react';

const EmployerResourcesPage: React.FC = () => {
  const resources = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary-500" />,
      title: 'Hiring Guides',
      description: 'Comprehensive guides on recruitment best practices.',
      items: [
        'Creating Effective Job Descriptions',
        'Interview Best Practices',
        'Remote Hiring Guide',
        'Building Inclusive Teams'
      ]
    },
    {
      icon: <Target className="h-8 w-8 text-primary-500" />,
      title: 'Talent Acquisition',
      description: 'Strategies for attracting and retaining top talent.',
      items: [
        'Employer Branding Guide',
        'Candidate Sourcing Strategies',
        'Employee Value Proposition',
        'Talent Pipeline Development'
      ]
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary-500" />,
      title: 'HR Analytics',
      description: 'Data-driven insights for better hiring decisions.',
      items: [
        'Recruitment Metrics Guide',
        'Performance Analytics',
        'Cost-per-Hire Calculator',
        'Time-to-Fill Optimization'
      ]
    },
    {
      icon: <Users className="h-8 w-8 text-primary-500" />,
      title: 'Onboarding',
      description: 'Resources for successful employee integration.',
      items: [
        'Onboarding Checklist',
        'Remote Onboarding Guide',
        'First 90 Days Plan',
        'Team Integration Tips'
      ]
    }
  ];

  const featuredWebinars = [
    {
      title: 'Building a Strong Employer Brand',
      date: 'March 25, 2025',
      duration: '60 min',
      speaker: 'Sarah Johnson',
      role: 'Head of Talent Acquisition, TechCorp',
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      title: 'Data-Driven Recruitment Strategies',
      date: 'April 2, 2025',
      duration: '45 min',
      speaker: 'Michael Chen',
      role: 'HR Analytics Director, InnovateLabs',
      image: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      title: 'Creating an Inclusive Hiring Process',
      date: 'April 10, 2025',
      duration: '60 min',
      speaker: 'Emily Rodriguez',
      role: 'DEI Consultant',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section */}
      <section className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Employer Resources</h1>
            <p className="text-xl text-gray-200">
              Tools, guides, and insights to help you build and manage great teams
            </p>
          </div>
        </div>
      </section>

      {/* Resources grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map((resource, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start mb-4">
                  <div className="mr-4">
                    {resource.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{resource.title}</h2>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {resource.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center">
                      <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                      <Link to="#" className="text-gray-700 hover:text-primary-600">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured webinars */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Upcoming Webinars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredWebinars.map((webinar, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden">
                <img
                  src={webinar.image}
                  alt={webinar.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{webinar.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <Video className="h-4 w-4 mr-2" />
                    <span>{webinar.duration}</span>
                    <span className="mx-2">•</span>
                    <span>{webinar.date}</span>
                  </div>
                  <div className="mb-4">
                    <p className="font-medium">{webinar.speaker}</p>
                    <p className="text-gray-600 text-sm">{webinar.role}</p>
                  </div>
                  <button className="btn btn-primary w-full">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Free Downloads</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: 'Interview Question Template',
                description: 'Comprehensive guide with role-specific questions',
                format: 'PDF'
              },
              {
                title: 'Onboarding Checklist',
                description: 'Step-by-step guide for new hire integration',
                format: 'XLSX'
              },
              {
                title: 'Recruitment Metrics Dashboard',
                description: 'Track and analyze your hiring performance',
                format: 'XLSX'
              }
            ].map((download, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <Download className="h-8 w-8 text-primary-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{download.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{download.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{download.format}</span>
                  <button className="btn btn-outline py-1 px-3 text-sm">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Latest Articles</h2>
            <div className="space-y-8">
              {[
                {
                  title: 'The Future of Remote Work: Trends and Best Practices',
                  excerpt: 'Discover how leading companies are adapting their hiring strategies for remote work...',
                  author: 'David Kim',
                  date: 'March 15, 2025',
                  readTime: '5 min read'
                },
                {
                  title: 'Building a Diverse and Inclusive Workplace',
                  excerpt: 'Learn effective strategies for creating an inclusive hiring process and workplace culture...',
                  author: 'Sarah Martinez',
                  date: 'March 12, 2025',
                  readTime: '7 min read'
                },
                {
                  title: 'Leveraging AI in Recruitment',
                  excerpt: 'Explore how artificial intelligence is transforming the recruitment landscape...',
                  author: 'James Wilson',
                  date: 'March 10, 2025',
                  readTime: '6 min read'
                }
              ].map((article, index) => (
                <div key={index} className="border-b border-gray-100 pb-8">
                  <h3 className="text-xl font-semibold mb-2">
                    <Link to="#" className="hover:text-primary-600">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{article.author}</span>
                    <span className="mx-2">•</span>
                    <span>{article.date}</span>
                    <span className="mx-2">•</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="#" className="btn btn-outline">
                View All Articles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need More Help?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our team of recruitment experts is here to help you build and scale your team
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="btn bg-white text-primary-600 hover:bg-gray-100">
              Contact Us
            </Link>
            <Link to="/pricing" className="btn border-white text-white hover:bg-primary-600">
              View Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmployerResourcesPage;