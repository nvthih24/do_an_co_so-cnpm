import React from "react";
import { useNavigate } from "react-router-dom";
import cvTemplates from "../data/cvTemplates";
import Header from "../components/layout/Header";
import { useTheme } from "../contexts/ThemeContext";
import Footer from "../components/layout/Footer";

const CVTemplates: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme(); // Lấy theme từ context

  return (
    <>
      <Header />
      <div className={`container mx-auto py-8 px-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <h1 className="text-3xl font-bold mb-8 text-center">Chọn mẫu CV</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {cvTemplates.map((template) => (
            <div
              key={template.id}
              className={`border rounded-lg shadow-lg transition-all p-6 flex flex-col items-center ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'
                }`}
            >
              <img
                src={template.image}
                alt={template.name}
                className="w-48 h-72 object-cover mb-4 rounded-md"
              />
              <h2 className="text-xl font-semibold mb-2 text-center">{template.name}</h2>
              <p className="text-gray-600 mb-4 text-center">{template.description}</p>
              <div className="flex flex-wrap gap-2 mb-4 justify-center">
                {template.badges.map((badge) => (
                  <span
                    key={badge}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${theme === 'dark' ? 'bg-primary-600 text-primary-200' : 'bg-primary-100 text-primary-700'
                      }`}
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <button
                className={`btn w-full py-3 rounded-lg mt-4 ${theme === 'dark' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-black'
                  }`}
                onClick={() => navigate(`/edit-cv/${template.id}`)}
              >
                Chọn mẫu này
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>

  );
};

export default CVTemplates;
