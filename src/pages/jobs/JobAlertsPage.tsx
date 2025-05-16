import React, { useState } from 'react';
import { Bell, Search, MapPin, Briefcase, Sliders, Plus } from 'lucide-react';

const JobAlertsPage: React.FC = () => {
  const [showNewAlertForm, setShowNewAlertForm] = useState(false);

  const existingAlerts = [
    {
      id: 1,
      keywords: 'Frontend Developer',
      location: 'San Francisco, CA',
      frequency: 'Daily',
      type: 'Full-time',
      active: true
    },
    {
      id: 2,
      keywords: 'UX Designer',
      location: 'Remote',
      frequency: 'Weekly',
      type: 'Contract',
      active: true
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Job Alerts</h1>
            <button 
              onClick={() => setShowNewAlertForm(!showNewAlertForm)}
              className="btn btn-primary flex items-center text-gray-600 bg-white hover:bg-gray-100"
            >
              <Plus className="h-5 w-5 mr-2 text-gray-600" />
              Create Alert
            </button>
          </div>

          {/* New Alert Form */}
          {showNewAlertForm && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Create New Job Alert</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Keywords</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        className="form-input pl-10"
                        placeholder="Job title, skills, or company"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        className="form-input pl-10"
                        placeholder="City, state, or remote"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Job Type</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <select className="form-input pl-10">
                        <option value="">Any</option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                        <option value="remote">Remote</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Alert Frequency</label>
                    <div className="relative">
                      <Bell className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <select className="form-input pl-10">
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="instant">Instant</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button 
                    type="button"
                    onClick={() => setShowNewAlertForm(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary text-gray-600 border-t border-gray-300 shadow-gray-200 hover:bg-gray-50">
                    Create Alert
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Existing Alerts */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold">Your Job Alerts</h2>
            </div>

            <div className="divide-y divide-gray-100">
              {existingAlerts.map(alert => (
                <div key={alert.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-lg mb-2">{alert.keywords}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {alert.location}
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-1" />
                          {alert.type}
                        </div>
                        <div className="flex items-center">
                          <Bell className="h-4 w-4 mr-1" />
                          {alert.frequency}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <button className="text-gray-600 hover:text-primary-600">
                        <Sliders className="h-5 w-5" />
                      </button>
                      <div className="relative inline-block w-12 h-6">
                        <input
                          type="checkbox"
                          className="opacity-0 w-0 h-0"
                          checked={alert.active}
                          onChange={() => {}}
                        />
                        <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${
                          alert.active ? 'bg-primary-500' : 'bg-gray-300'
                        }`}>
                          <span className={`absolute h-4 w-4 left-1 bottom-1 bg-white rounded-full transition-all duration-300 ${
                            alert.active ? 'transform translate-x-6' : ''
                          }`}></span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobAlertsPage;