import React, { useState } from 'react';
import { FaHome, FaNewspaper, FaUserTie, FaChartBar, FaQuestionCircle, FaBullhorn } from 'react-icons/fa';
import HomePageUpdate from './components/HomePageUpdate';
import HeroSectionUpdate from './components/HeroSectionUpdate';

const AdminDashboardView = () => {
  const [selectedSection, setSelectedSection] = useState('homepageContent');

  const sections = [
    {
      id: 'homepageContent',
      name: 'Homepage Content',
      description: 'Manage all homepage sections except hero',
      icon: <FaHome className="text-5xl text-blue-600" />,
      color: 'bg-blue-50'
    },
    {
      id: 'heroSection',
      name: 'Hero Section',
      description: 'Manage the main hero section with slider images',
      icon: <FaHome className="text-5xl text-green-600" />,
      color: 'bg-green-50'
    }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      </div>

      {!selectedSection ? (
        // Main Section Selection Cards
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((section) => (
            <div
              key={section.id}
              onClick={() => setSelectedSection(section.id)}
              className={`${section.color} rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer transform hover:-translate-y-1 transition-transform`}
            >
              <div className="mb-4">{section.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{section.name}</h3>
              <p className="text-gray-600">{section.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{sections.find(s => s.id === selectedSection)?.name}</h2>
            <button
              onClick={() => setSelectedSection(null)}
              className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
            >
              Back to Sections
            </button>
          </div>

          {selectedSection === 'homepageContent' && <HomePageUpdate />}
          {selectedSection === 'heroSection' && <HeroSectionUpdate />}
        </div>
      )}
    </div>
  );
};

export default AdminDashboardView; 