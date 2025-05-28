import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

interface Candidate {
  profileId: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  skills: string[];
  experience: string;
  profilePicture: string;
  jobTitle: string;
  jobCompany: string;
  title: string;
  summary: string;
  degree: string;
  school: string;
  gradYear: string;
  resumeUrl: string;
}

const CandidateCard: React.FC = () => {
  const { user } = useAuth();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactCandidate, setContactCandidate] = useState<Candidate | null>(null);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sendSuccess, setSendSuccess] = useState<string | null>(null);

  const handleContact = (candidate: Candidate) => {
    setContactCandidate(candidate);
    setIsContactModalOpen(true);
    setMessage('');
    setSendError(null);
    setSendSuccess(null);
  };

  const sendEmail = async () => {
    if (!contactCandidate || !user) return;

    try {
      setSending(true);
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: contactCandidate.email,
          from: user.email,
          subject: `Job Opportunity from ${user.email}`,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to send email');

      setSendSuccess('Email sent successfully!');
    } catch (err: any) {
      setSendError(err.message);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    const fetchCandidates = async () => {
      if (!user || !user.id) {
        setError('Please log in to view candidates');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/api/profile/employer/${user.id}`);
        console.log('Fetching candidates for user:', user.id);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Failed to fetch candidates');

        setCandidates(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [user]);

  const handleViewProfile = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCandidate(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Candidates
      </h1>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400 text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : candidates.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center">No candidates found.</p>
      ) : (
        <>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Total candidates: {candidates.length}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {candidates.map((candidate, index) => (
              <motion.div key={index} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card hoverable className="overflow-hidden w-full sm:w-[500px]">
                  <CardContent className="p-0">
                    <div className="flex flex-col">
                      <div className="sm:w-1/3 md:w-1/4 p-4">
                        {/* Placeholder for profile picture */}
                      </div>
                      <div className="sm:w-2/3 md:w-3/4 p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-slate-800">{candidate.name}</h3>
                          <Badge variant="primary">{candidate.experience}</Badge>
                        </div>
                        <div className="flex items-center text-slate-500 text-sm mb-3">
                          <MapPin size={14} className="mr-1" />
                          <span>{candidate.location}</span>
                        </div>
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1 mb-2">
                            {candidate.skills.slice(0, 4).map((skill, idx) => (
                              <Badge key={idx} variant="secondary" className="mr-1 mb-1">
                                {skill}
                              </Badge>
                            ))}
                            {candidate.skills.length > 4 && (
                              <Badge className="mr-1 mb-1">+{candidate.skills.length - 4} more</Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-slate-500 mb-4">
                          <div className="flex items-center mb-2 sm:mb-0">
                            <Mail size={14} className="mr-1" />
                            <span>{candidate.email}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone size={14} className="mr-1" />
                            <span>{candidate.phone}</span>
                          </div>
                        </div>
                        <div className="text-sm text-slate-500 mb-4">
                          <p><strong>Applied for:</strong> {candidate.jobTitle} at {candidate.jobCompany}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" onClick={() => handleViewProfile(candidate)}>
                            View Profile
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleContact(candidate)}>
                            Contact
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Contact Modal */}
      {isContactModalOpen && contactCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-xl mx-4">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Contact {contactCandidate.name}
            </h2>
            <textarea
              className="w-full h-40 p-3 border rounded text-gray-700 dark:bg-gray-700 dark:text-white"
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {sendError && <p className="text-red-500 mt-2">{sendError}</p>}
            {sendSuccess && <p className="text-green-500 mt-2">{sendSuccess}</p>}
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsContactModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={sendEmail} disabled={sending}>
                {sending ? 'Sending...' : 'Send'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {isModalOpen && selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {selectedCandidate.name}'s Profile
            </h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-200">Full Name</h4>
                <p className="text-gray-600 dark:text-gray-300">{selectedCandidate.name}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-200">Email</h4>
                <p className="text-gray-600 dark:text-gray-300">{selectedCandidate.email}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-200">Phone</h4>
                <p className="text-gray-600 dark:text-gray-300">{selectedCandidate.phone}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-200">Location</h4>
                <p className="text-gray-600 dark:text-gray-300">{selectedCandidate.location}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-200">Job Title</h4>
                <p className="text-gray-600 dark:text-gray-300">{selectedCandidate.title || 'N/A'}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-200">Summary</h4>
                <p className="text-gray-600 dark:text-gray-300">{selectedCandidate.summary || 'N/A'}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-200">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills.length > 0 ? (
                    selectedCandidate.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary">
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-gray-600 dark:text-gray-300">No skills listed</p>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-200">Education</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {selectedCandidate.degree || 'N/A'} at {selectedCandidate.school || 'N/A'}, Graduated {selectedCandidate.gradYear || 'N/A'}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-200">Resume</h4>
                {selectedCandidate.resumeUrl ? (
                  <a
                    href={`http://localhost:5000${selectedCandidate.resumeUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    View Resume
                  </a>
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">No resume uploaded</p>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={closeModal}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateCard;