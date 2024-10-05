import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserPortfolio() {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/1/portfolio') // Hardcoded user ID for now
      .then(response => setPortfolio(response.data))
      .catch(error => console.error('Error fetching portfolio:', error));
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-800">My Portfolio</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.map((investment, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{investment.startupName}</h2>
              <p className="text-gray-600 mb-4">Token Symbol: {investment.tokenSymbol}</p>
              <p className="text-3xl font-bold text-primary">{investment.balance} tokens</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPortfolio;