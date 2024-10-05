import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function StartupList() {
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/startups')
      .then(response => setStartups(response.data))
      .catch(error => console.error('Error fetching startups:', error));
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-800">Discover Startups</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {startups.map(startup => (
          <div key={startup.id} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 transform hover:scale-105">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{startup.name}</h2>
              <p className="text-gray-600 mb-4">{startup.description}</p>
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-secondary h-2.5 rounded-full" style={{ width: `${(startup.currentFunding / startup.fundingGoal) * 100}%` }}></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  ${startup.currentFunding.toLocaleString()} / ${startup.fundingGoal.toLocaleString()}
                </p>
              </div>
              <Link to={`/startup/${startup.id}`} className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StartupList;