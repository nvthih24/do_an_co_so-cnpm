import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { posts, employers } from '../../utils/mockData';
import { formatCurrency } from '../../utils/helpers';

const PostForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    employerId: '',
    location: '',
    type: 'full-time',
    category: '',
    description: '',
    requirements: [''],
    salary: {
      min: 0,
      max: 0,
      currency: 'USD'
    },
    featured: false
  });

  useEffect(() => {
    if (isEditMode) {
      const post = posts.find(p => p.id === id);
      if (post) {
        setFormData({
          title: post.title,
          employerId: post.employerId,
          location: post.location,
          type: post.type,
          category: post.category,
          description: post.description,
          requirements: [...post.requirements],
          salary: {
            min: post.salary.min,
            max: post.salary.max,
            currency: post.salary.currency
          },
          featured: post.featured
        });
      }
    }
  }, [id, isEditMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      salary: {
        ...prev.salary,
        [name]: name === 'currency' ? value : parseInt(value, 10)
      }
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleRequirementChange = (index: number, value: string) => {
    const updatedRequirements = [...formData.requirements];
    updatedRequirements[index] = value;
    setFormData(prev => ({ ...prev, requirements: updatedRequirements }));
  };

  const addRequirement = () => {
    setFormData(prev => ({ 
      ...prev, 
      requirements: [...prev.requirements, ''] 
    }));
  };

  const removeRequirement = (index: number) => {
    if (formData.requirements.length > 1) {
      const updatedRequirements = [...formData.requirements];
      updatedRequirements.splice(index, 1);
      setFormData(prev => ({ 
        ...prev, 
        requirements: updatedRequirements 
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty requirements
    const filteredRequirements = formData.requirements.filter(req => req.trim() !== '');
    
    const postData = {
      ...formData,
      requirements: filteredRequirements
    };
    
    console.log('Submit post:', postData);
    
    // Redirect to post list or details
    navigate('/posts');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm"
            className="mr-4"
            onClick={() => navigate('/posts')}
            icon={<ArrowLeft size={18} />}
          >
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isEditMode ? 'Edit Job Post' : 'Create New Job Post'}
          </h1>
        </div>
      </div>

      {/* Form */}
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>{isEditMode ? 'Edit Post Details' : 'Post Details'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="e.g. Senior Frontend Developer"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="employerId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Employer *
                  </label>
                  <select
                    id="employerId"
                    name="employerId"
                    value={formData.employerId}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  >
                    <option value="">Select an employer</option>
                    {employers.map(employer => (
                      <option key={employer.id} value={employer.id}>
                        {employer.companyName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="e.g. San Francisco, CA or Remote"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Job Type *
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category *
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="e.g. Engineering, Design, Marketing"
                    required
                  />
                </div>
                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <label htmlFor="min" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Min Salary *
                    </label>
                    <input
                      type="number"
                      id="min"
                      name="min"
                      value={formData.salary.min}
                      onChange={handleSalaryChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                      min="0"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="max" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Max Salary *
                    </label>
                    <input
                      type="number"
                      id="max"
                      name="max"
                      value={formData.salary.max}
                      onChange={handleSalaryChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                      min={formData.salary.min}
                    />
                  </div>
                  <div className="w-24">
                    <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Currency
                    </label>
                    <select
                      id="currency"
                      name="currency"
                      value={formData.salary.currency}
                      onChange={handleSalaryChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="CAD">CAD</option>
                      <option value="AUD">AUD</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Job Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Provide a detailed description of the job..."
                  required
                ></textarea>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Requirements *
                  </label>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    icon={<Plus size={14} />}
                    onClick={addRequirement}
                  >
                    Add Requirement
                  </Button>
                </div>
                <div className="space-y-3">
                  {formData.requirements.map((requirement, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={requirement}
                        onChange={(e) => handleRequirementChange(index, e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder={`Requirement ${index + 1}`}
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                        onClick={() => removeRequirement(index)}
                        disabled={formData.requirements.length <= 1}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Mark as featured job (will be highlighted in listings)
                </label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/posts')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              icon={<Save size={16} />}
            >
              {isEditMode ? 'Update Post' : 'Create Post'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default PostForm;