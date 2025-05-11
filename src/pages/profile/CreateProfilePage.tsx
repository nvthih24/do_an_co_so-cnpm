import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../contexts/ToastContext';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Plus, X } from 'lucide-react';

const CreateProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast('Profile created successfully!', 'success');
      navigate('/dashboard');
    } catch (error) {
      showToast('Failed to create profile. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Create Your Profile</h1>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        id="name"
                        className="form-input pl-10"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="form-label">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="email"
                        id="email"
                        className="form-input pl-10"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="tel"
                        id="phone"
                        className="form-input pl-10"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="location" className="form-label">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        id="location"
                        className="form-input pl-10"
                        placeholder="City, State"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Professional Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="form-label">Professional Title</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        id="title"
                        className="form-input pl-10"
                        placeholder="e.g. Senior Frontend Developer"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="summary" className="form-label">Professional Summary</label>
                    <textarea
                      id="summary"
                      rows={4}
                      className="form-input"
                      placeholder="Brief overview of your professional background and career goals..."
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="form-label">Skills</label>
                    <div className="flex gap-2 mb-2">
                      <div className="relative flex-grow">
                        <input
                          type="text"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          className="form-input pr-24"
                          placeholder="Add a skill"
                        />
                        <button
                          type="button"
                          onClick={handleAddSkill}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary-600 hover:text-primary-700"
                        >
                          <Plus className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm flex items-center"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-2 text-primary-600 hover:text-primary-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Education</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="degree" className="form-label">Degree</label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        id="degree"
                        className="form-input pl-10"
                        placeholder="e.g. Bachelor of Science in Computer Science"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="school" className="form-label">School</label>
                      <input
                        type="text"
                        id="school"
                        className="form-input"
                        placeholder="University name"
                      />
                    </div>

                    <div>
                      <label htmlFor="gradYear" className="form-label">Graduation Year</label>
                      <input
                        type="text"
                        id="gradYear"
                        className="form-input"
                        placeholder="e.g. 2020"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Resume Upload */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Resume</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Upload your resume</p>
                    <p className="text-sm text-gray-500 mb-4">PDF, DOC, DOCX up to 5MB</p>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      id="resume"
                    />
                    <label
                      htmlFor="resume"
                      className="btn btn-outline cursor-pointer"
                    >
                      Choose File
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Profile...
                    </span>
                  ) : (
                    'Create Profile'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfilePage;