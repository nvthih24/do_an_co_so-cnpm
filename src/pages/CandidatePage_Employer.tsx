import React, { useState } from 'react';
import CandidateList from '../components/jobs/CandidateList_Emlopyer';
import { mockCandidates } from '../utils/mockData';
import Header from '../components/layout/Header';

const CandidatesPage: React.FC = () => {
    const [candidates] = useState(mockCandidates);

    return (
        
        <div className="py-6">
            <CandidateList candidates={candidates} />
        </div>
    );
};

export default CandidatesPage;