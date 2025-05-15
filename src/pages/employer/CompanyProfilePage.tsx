import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const CompanyProfilePage = () => {
  const { user } = useAuth();
  const userId = user?.id;
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    description: '',
    location: ''
  });

  const fetchCompanyProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/company/${userId}`);
      if (res.data) setFormData(res.data);
    } catch (error) {
      console.log('No existing profile');
    }
  };

  useEffect(() => {
      console.log("User from context:", user);
    if (userId) fetchCompanyProfile();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Submitting with data:", { userId, ...formData });

    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/company/save-profile', {
        userId,
        ...formData
      });
      alert('Profile saved!');
    } catch (err) {
      alert('Error saving profile');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Company Profile</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Industry</label>
              <input
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter industry"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Company Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter company description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter company location"
              />
            </div>

            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfilePage;
