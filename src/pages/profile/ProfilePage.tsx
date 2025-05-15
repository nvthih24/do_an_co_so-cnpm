import React, { useEffect, useState } from 'react';

type ProfileType = {
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
  title?: string;
  summary?: string;
  degree?: string;
  school?: string;
  gradYear?: string;
  skills?: string[];
  resumeUrl?: string;
};

const ProfilePage = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [formData, setFormData] = useState<ProfileType>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setProfile(data);
        } else {
          setProfile(null);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setFormData(profile || {});
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    const form = new FormData();
    for (const key in formData) {
      if (formData[key as keyof ProfileType] !== undefined) {
        if (key === 'skills' && Array.isArray(formData.skills)) {
          form.append(key, JSON.stringify(formData.skills));
        } else {
          form.append(key, formData[key as keyof ProfileType] as string);
        }
      }
    }

    try {
      const res = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: form,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Update failed');

      setProfile(data.profile);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your profile?")) return;

    try {
      const res = await fetch('http://localhost:5000/api/profile', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!res.ok) throw new Error('Failed to delete profile');
      setProfile(null);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      {!profile && !isEditing && (
        <div>
          <p className="text-gray-600">No profile found.</p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create Profile
          </button>
        </div>
      )}

      {(profile || isEditing) && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={formData.fullName || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            ) : (
              <p className="mt-1 text-gray-900">{profile?.fullName || 'N/A'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            ) : (
              <p className="mt-1 text-gray-900">{profile?.email || 'N/A'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            ) : (
              <p className="mt-1 text-gray-900">{profile?.phone || 'N/A'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            {isEditing ? (
              <input
                type="text"
                name="location"
                value={formData.location || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            ) : (
              <p className="mt-1 text-gray-900">{profile?.location || 'N/A'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Professional Title</label>
            {isEditing ? (
              <input
                type="text"
                name="title"
                value={formData.title || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            ) : (
              <p className="mt-1 text-gray-900">{profile?.title || 'N/A'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Summary</label>
            {isEditing ? (
              <textarea
                name="summary"
                value={formData.summary || ''}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            ) : (
              <p className="mt-1 text-gray-900">{profile?.summary || 'N/A'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Highest Degree</label>
            {isEditing ? (
              <input
                type="text"
                name="degree"
                value={formData.degree || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            ) : (
              <p className="mt-1 text-gray-900">{profile?.degree || 'N/A'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">School</label>
            {isEditing ? (
              <input
                type="text"
                name="school"
                value={formData.school || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            ) : (
              <p className="mt-1 text-gray-900">{profile?.school || 'N/A'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Graduation Year</label>
            {isEditing ? (
              <input
                type="text"
                name="gradYear"
                value={formData.gradYear || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            ) : (
              <p className="mt-1 text-gray-900">{profile?.gradYear || 'N/A'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Skills</label>
            {isEditing ? (
              <input
                type="text"
                name="skills"
                value={(formData.skills || []).join(', ')}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    skills: e.target.value.split(',').map(s => s.trim()),
                  }))
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            ) : (
              <div className="flex flex-wrap gap-2 mt-1">
                {profile?.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                )) || <p>No skills listed.</p>}
              </div>
            )}
          </div>


          {/* Resume */}
{profile?.resumeUrl && (
  <div className="mt-6">
    <h2 className="text-xl font-semibold mb-2">Resume</h2>
    <a
      href={profile.resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline"
    >
      Download Resume
    </a>
  </div>
)}

          

          <div className="flex gap-4">
            {!isEditing && profile && (
              <>
                <button
                  onClick={handleEditClick}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </>
            )}
            {isEditing && (
              <>
                <button
                  onClick={handleUpdate}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
