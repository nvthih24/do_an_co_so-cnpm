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
          'Accept': 'application/json',
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
        const res = await fetch(`http://localhost:5000/api/profile/employer/${user.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not JSON. Server might have returned an HTML page.');
        }

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch candidates');
        }

        setCandidates(data);
      } catch (err: any) {
        console.error('Error fetching candidates:', err);
        setError(
          err.message.includes('Unexpected token')
            ? 'Failed to parse response. The server might have returned an HTML page instead of JSON. Please check the API endpoint and authentication.'
            : err.message
        );
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
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Candidates</h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500 text-center text-lg">{error}</p>
      ) : candidates.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center text-lg">No candidates found.</p>
      ) : (
        <>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
            Total candidates: {candidates.length}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {candidates.map((candidate, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4 mb-3">

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {candidate.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {candidate.jobTitle || 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2 text-gray-400" />
                        <span>{candidate.location || 'N/A'}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail size={16} className="mr-2 text-gray-400" />
                        <span>{candidate.email || 'N/A'}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone size={16} className="mr-2 text-gray-400" />
                        <span>{candidate.phone || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                        onClick={() => handleViewProfile(candidate)}
                        aria-label={`View profile of ${candidate.name}`}
                      >
                        View Profile
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900 rounded-md"
                        onClick={() => handleContact(candidate)}
                        aria-label={`Contact ${candidate.name}`}
                      >
                        Contact
                      </Button>
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
              aria-label="Close modal"
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
                      <Badge key={idx} variant="secondary" className="text-sm">
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
            <div className="mt-6 flex justify-end gap-2">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900 rounded-md"
                onClick={() => handleContact(selectedCandidate)}
                aria-label={`Contact ${selectedCandidate.name}`}
              >
                Contact
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                onClick={closeModal}
                aria-label="Close modal"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateCard;