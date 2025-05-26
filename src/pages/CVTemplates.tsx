import React from "react";
import { useNavigate } from "react-router-dom";
import cvTemplates from "../data/cvTemplates";

const CVTemplates: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Chọn mẫu CV</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cvTemplates.map((template) => (
          <div key={template.id} className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center">
            <img src={template.image} alt={template.name} className="w-40 h-56 object-cover mb-4 rounded" />
            <h2 className="text-lg font-semibold mb-2">{template.name}</h2>
            <p className="text-gray-600 mb-2 text-center">{template.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {template.badges.map((badge) => (
                <span key={badge} className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs">{badge}</span>
              ))}
            </div>
            <button
              className="btn btn-primary w-full"
              onClick={() => navigate(`/edit-cv/${template.id}`)}
            >
              Chọn mẫu này
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CVTemplates;