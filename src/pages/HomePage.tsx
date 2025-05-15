import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Building, Users, Briefcase, TrendingUp, Star } from 'lucide-react';
import JobSearchBox from '../components/jobs/JobSearchBox';
import FeaturedJobs from '../components/jobs/FeaturedJobs';

const HomePage: React.FC = () => {
  const stats = [
    { icon: <Briefcase className="h-8 w-8 text-primary-500" />, value: '10,000+', label: 'Jobs Available' },
    { icon: <Building className="h-8 w-8 text-primary-500" />, value: '5,000+', label: 'Companies' },
    { icon: <Users className="h-8 w-8 text-primary-500" />, value: '1M+', label: 'Job Seekers' },
    { icon: <TrendingUp className="h-8 w-8 text-primary-500" />, value: '20K+', label: 'Successful Hires' },
  ];

  const categories = [
    { name: 'Software Development', count: 1254, icon: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Marketing', count: 863, icon: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Customer Service', count: 712, icon: 'https://images.pexels.com/photos/7709287/pexels-photo-7709287.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Design', count: 531, icon: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Sales', count: 491, icon: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Finance', count: 412, icon: 'https://images.pexels.com/photos/210574/pexels-photo-210574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Engineering', count: 387, icon: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Human Resources', count: 274, icon: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  ];

  return (
    <div>
      {/* Hero section */}
      <section className="relative bg-gradient-to-r from-primary-700 to-primary-900 text-gray-500 py-24 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-900 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Find Your Dream Job, Build Your Career
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-500">
              Connect with top employers and discover opportunities that match your skills and aspirations.
            </p>

            <JobSearchBox />

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/jobs" className="btn btn-accent text-gray-400">
                Browse All Jobs
              </Link>
              <Link to="/register" className="btn bg-white text-primary-600 hover:bg-gray-100">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 transition-transform duration-300 hover:transform hover:scale-105">
                <div className="flex justify-center mb-3">
                  {stat.icon}
                </div>
                <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured jobs section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Jobs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore the latest opportunities from top employers across various industries
            </p>
          </div>

          <FeaturedJobs />

          <div className="text-center mt-10">
            <Link to="/jobs" className="btn btn-primary text-gray-400">
              View All Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Job categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore jobs by industry categories and find the perfect match for your expertise
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/jobs?category=${encodeURIComponent(category.name)}`}
                className="group relative rounded-lg overflow-hidden h-48 transition-all"
              >
                <img
                  src={category.icon}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 z-10">
                  <h3 className="text-white text-xl font-medium mb-1">{category.name}</h3>
                  <p className="text-gray-300 text-sm">{category.count} jobs available</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from professionals who found their perfect match through our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">
                  "Job247 completely transformed my job search experience. Within weeks, I found a position that perfectly matched my skills and career goals."
                </p>
                <div className="flex items-center">
                  <img
                    src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'women' : 'men'}/${index + 1}.jpg`}
                    alt="Testimonial"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-medium text-gray-900">
                      {index === 0 ? 'Sarah Johnson' : index === 1 ? 'Michael Chen' : 'Emily Rodriguez'}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {index === 0 ? 'Product Designer' : index === 1 ? 'Software Engineer' : 'Marketing Manager'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-secondary-600 text-gray-400">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Take the Next Step in Your Career?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who found their dream jobs through Job247
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="btn bg-white text-gray-400 hover:bg-gray-100">
              Create an Account
            </Link>
            <Link to="/jobs" className="btn border-white text-gray-400 hover:bg-gray-100 ">
              Browse Open Positions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;