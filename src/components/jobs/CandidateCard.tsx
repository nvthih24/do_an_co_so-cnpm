import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Star, StarHalf } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Candidate } from '../../utils/types';

interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card hoverable className="overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-1/3 md:w-1/4 p-4">
              <div className="relative">
                <img 
                  src={candidate.profilePicture}
                  alt={candidate.name}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <div className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow-sm">
                  <div className="flex">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <StarHalf size={14} className="text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="sm:w-2/3 md:w-3/4 p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-slate-800">{candidate.name}</h3>
                <Badge variant="primary">{candidate.experience} yrs exp</Badge>
              </div>
              
              <div className="flex items-center text-slate-500 text-sm mb-3">
                <MapPin size={14} className="mr-1" />
                <span>{candidate.location}</span>
              </div>
              
              <div className="mb-3">
                <div className="flex flex-wrap gap-1 mb-2">
                  {candidate.skills.slice(0, 4).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="mr-1 mb-1">
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
              
              <div className="flex flex-wrap gap-2">
                <Button size="sm">View Profile</Button>
                <Button size="sm" variant="outline">Contact</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CandidateCard;