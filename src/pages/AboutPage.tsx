import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Users, Globe, Award, CheckCircle, Clock } from 'lucide-react';

const AboutPage: React.FC = () => {
  const stats = [
    { icon: <Users className="h-8 w-8 text-primary-500" />, value: '1M+', label: 'Active Users' },
    { icon: <Building className="h-8 w-8 text-primary-500" />, value: '50K+', label: 'Companies' },
    { icon: <Globe className="h-8 w-8 text-primary-500" />, value: '100+', label: 'Countries' },
    { icon: <Award className="h-8 w-8 text-primary-500" />, value: '95%', label: 'Success Rate' },
  ];

  const values = [
    {
      icon: <CheckCircle className="h-12 w-12 text-primary-500" />,
      title: 'Quality First',
      description: 'We maintain high standards in every aspect of our service, ensuring the best experience for both employers and job seekers.'
    },
    {
      icon: <Users className="h-12 w-12 text-primary-500" />,
      title: 'User-Centric',
      description: 'Our platform is designed with users in mind, making job searching and recruitment processes seamless and efficient.'
    },
    {
      icon: <Globe className="h-12 w-12 text-primary-500" />,
      title: 'Global Reach',
      description: 'We connect talented individuals with opportunities worldwide, breaking down geographical barriers in recruitment.'
    },
    {
      icon: <Clock className="h-12 w-12 text-primary-500" />,
      title: 'Innovation',
      description: 'We continuously evolve our platform with cutting-edge technology to stay ahead in the recruitment industry.'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero section */}
      <section className="relative bg-primary-700 text-white py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-900 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transforming the Way People Find Their Dream Careers
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Job247 is revolutionizing the recruitment industry by connecting talented individuals with outstanding opportunities through innovative technology and personalized experiences.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/jobs" className="btn btn-accent">
                Find Jobs
              </Link>
              <Link to="/contact" className="btn bg-white text-primary-600 hover:bg-gray-100">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600">
              To create meaningful connections between employers and job seekers, fostering growth and success in the global workforce through innovative technology and personalized experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join millions of professionals who have found their dream careers through Job247
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="btn bg-white text-primary-600 hover:bg-gray-100">
              Create an Account
            </Link>
            <Link to="/contact" className="btn border-white text-white hover:bg-primary-600">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;