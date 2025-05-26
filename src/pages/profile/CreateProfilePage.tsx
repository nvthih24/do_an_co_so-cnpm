import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../contexts/ToastContext';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Plus, X } from 'lucide-react';

const CreateProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [degree, setDegree] = useState('');
  const [school, setSchool] = useState('');
  const [gradYear, setGradYear] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser._id);
      setEmail(parsedUser.email);
    }
  }, []);

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
      const token = localStorage.getItem('token');

      const formData = new FormData();
      //formData.append('userId', userId);
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('location', location);
      formData.append('title', title);
      formData.append('summary', summary);
      formData.append('skills', JSON.stringify(skills));  
      formData.append('degree', degree);
      formData.append('school', school);
      formData.append('gradYear', gradYear);
      if (resumeFile) formData.append('resume', resumeFile);

      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'POST',
              headers: {
        Authorization: `Bearer ${token}`,  // **Thêm dòng này**
      },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        showToast('Profile created successfully!', 'success');
        navigate('/dashboard');
      } else {
        showToast(data.message || 'Failed to create profile.', 'error');
      }
    } catch (error) {
      console.error(error);
      showToast('Failed to create profile. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 dark:text-gray-100">Create Your Profile</h1>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h2 className="text-xl font-semibold mb-4 dark:text-gray-50">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input type="text" id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="form-input pl-10" required />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="form-label">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input pl-10" required />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-input pl-10" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="location" className="form-label">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="form-input pl-10" required />
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h2 className="text-xl font-semibold mb-4 dark:text-gray-50">Professional Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="form-label">Professional Title</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="form-input pl-10" required />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="summary" className="form-label">Professional Summary</label>
                    <textarea id="summary" rows={4} value={summary} onChange={(e) => setSummary(e.target.value)} className="form-input" required></textarea>
                  </div>

                  <div>
                    <label className="form-label">Skills</label>
                    <div className="flex gap-2 mb-2">
                      <div className="relative flex-grow">
                        <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} className="form-input pr-24" placeholder="Add a skill" />
                        <button type="button" onClick={handleAddSkill} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary-600 hover:text-primary-700">
                          <Plus className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <span key={index} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm flex items-center">
                          {skill}
                          <button type="button" onClick={() => handleRemoveSkill(skill)} className="ml-2 text-primary-600 hover:text-primary-700">
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
                <h2 className="text-xl font-semibold mb-4 dark:text-gray-50">Education</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="degree" className="form-label">Degree</label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input type="text" id="degree" value={degree} onChange={(e) => setDegree(e.target.value)} className="form-input pl-10" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="school" className="form-label">School</label>
                      <input type="text" id="school" value={school} onChange={(e) => setSchool(e.target.value)} className="form-input" />
                    </div>

                    <div>
                      <label htmlFor="gradYear" className="form-label">Graduation Year</label>
                      <input type="text" id="gradYear" value={gradYear} onChange={(e) => setGradYear(e.target.value)} className="form-input" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Resume Upload */}
              <div>
                <h2 className="text-xl font-semibold mb-4 dark:text-gray-50">Resume</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Upload your resume</p>
                    <p className="text-sm text-gray-500 mb-4">PDF, DOC, DOCX up to 5MB</p>
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx" id="resume" onChange={(e) => e.target.files && setResumeFile(e.target.files[0])} />
                    <label htmlFor="resume" className="btn btn-outline cursor-pointer">Choose File</label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button type="submit" disabled={loading} className="btn btn-primary text-gray-500 bg-white hover:bg-gray-100 ">
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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