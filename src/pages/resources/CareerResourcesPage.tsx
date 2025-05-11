import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Video, FileText, Users, Briefcase, Award } from 'lucide-react';

const CareerResourcesPage: React.FC = () => {
  const resources = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary-500" />,
      title: 'Career Guides',
      description: 'Comprehensive guides on various career paths and industries.',
      items: [
        'How to Choose the Right Career Path',
        'Switching Careers Successfully',
        'Industry Insights and Trends',
        'Career Development Strategies'
      ]
    },
    {
      icon: <FileText className="h-8 w-8 text-primary-500" />,
      title: 'Resume Writing',
      description: 'Tips and templates for creating standout resumes.',
      items: [
        'Resume Writing Best Practices',
        'Professional Resume Templates',
        'Cover Letter Guidelines',
        'Portfolio Building Tips'
      ]
    },
    {
      icon: <Users className="h-8 w-8 text-primary-500" />,
      title: 'Interview Preparation',
      description: 'Resources to help you ace your interviews.',
      items: [
        'Common Interview Questions',
        'Interview Tips and Techniques',
        'Behavioral Interview Guide',
        'Technical Interview Prep'
      ]
    },
    {
      icon: <Video className="h-8 w-8 text-primary-500" />,
      title: 'Video Tutorials',
      description: 'Learn from industry experts through video content.',
      items: [
        'Job Search Strategies',
        'Personal Branding',
        'Networking Tips',
        'Salary Negotiation'
      ]
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section */}
      <section className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Career Resources</h1>
            <p className="text-xl text-gray-200">
              Everything you need to succeed in your career journey
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

      {/* Featured content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Briefcase className="h-6 w-6 text-primary-500" />,
                title: 'Job Search Masterclass',
                description: 'Learn effective strategies for finding and landing your dream job.'
              },
              {
                icon: <Award className="h-6 w-6 text-primary-500" />,
                title: 'Career Development',
                description: 'Discover how to advance your career and achieve your professional goals.'
              },
              {
                icon: <Users className="h-6 w-6 text-primary-500" />,
                title: 'Networking Guide',
                description: 'Master the art of professional networking and relationship building.'
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-6 border rounded-lg">
                <div className="flex justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                <Link to="#" className="mt-4 inline-block text-primary-600 hover:text-primary-700">
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerResourcesPage;