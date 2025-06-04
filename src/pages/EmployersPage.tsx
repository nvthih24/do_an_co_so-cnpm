import React from 'react';
import { Link } from 'react-router-dom';
import { Users, BarChart2, Clock, Shield } from 'lucide-react';

const EmployersPage: React.FC = () => {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-primary-500" />,
      title: 'Access Top Talent',
      description: 'Connect with qualified candidates from our extensive pool of professionals.'
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-primary-500" />,
      title: 'Smart Analytics',
      description: 'Get detailed insights into your job postings and candidate engagement.'
    },
    {
      icon: <Clock className="h-8 w-8 text-primary-500" />,
      title: 'Efficient Hiring',
      description: 'Streamline your recruitment process with our advanced tools and features.'
    },
    {
      icon: <Shield className="h-8 w-8 text-primary-500" />,
      title: 'Verified Candidates',
      description: 'Access pre-screened candidates with verified skills and experience.'
    }
  ];

  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      features: [
        '1 job posting',
        'Basic candidate search',
        'Standard support',
        '30-day listing'
      ]
    },
    {
      name: 'Professional',
      price: '$99',
      period: '/month',
      popular: true,
      features: [
        '5 job postings',
        'Advanced candidate search',
        'Priority support',
        'Featured listings',
        'Analytics dashboard'
      ]
    },
    {
      name: 'Enterprise',
      price: '$299',
      period: '/month',
      features: [
        'Unlimited job postings',
        'Advanced candidate search',
        'Dedicated account manager',
        'Custom branding',
        'API access',
        'Advanced analytics'
      ]
    }
  ];
  return (
    
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Hero section */}
      <section className="relative bg-primary-100 text-black py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-900 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl dark:text-gray-50 font-bold mb-6">
              Find Your Next Great Hire
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Post jobs, find qualified candidates, and grow your team with our powerful recruitment platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="btn btn-accent text-gray-500 hover:bg-gray-100">
                Get Started
              </Link>
              <Link to="/contact" className="btn bg-white text-gray-500 hover:bg-gray-100">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl dark:text-gray-50 font-bold mb-4">Why Choose Job247?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform provides everything you need to streamline your recruitment process and find the best talent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl dark:text-gray-50 font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 dark:text-gray-50">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the plan that best fits your recruitment needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-sm p-6 relative ${plan.popular ? 'border-2 border-primary-500' : ''
                  }`}
              >
                {plan.popular && (
                  <span className="absolute top-0 right-0 bg-primary-500 text-black px-3 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
                    Popular
                  </span>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl dark:text-gray-950 font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-gray-500 ml-1">{plan.period}</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-6 dark:text-gray-950">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`w-full btn ${plan.popular ? 'btn-primary text-gray-700 border-t border-gray-300' : 'btn-outline'
                  }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-primary-700 text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 dark:text-gray-50">Ready to Find Your Next Great Hire?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-500">
            Join thousands of companies who have found exceptional talent through Job247
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="btn bg-gray-100 text-primary-600 hover:bg-gray-200">
              Get Started Now
            </Link>
            <Link to="/contact" className="btn border-gray-200 text-gray-500 hover:bg-primary-600">
              Schedule a Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmployersPage;