import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StartupCard from './StartupCard';
import { mockStartups } from '../mockData';

function StartupList() {
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/startups')
      .then(response => setStartups(response.data))
      .catch(error => console.error('Error fetching startups:', error));
  }, []);

  const handleInvest = (startupId, amount) => {
    axios.post('http://localhost:5000/api/invest', {
      userId: '1', // Hardcoded for now, should be the logged-in user's ID
      startupId,
      amount
    })
      .then(response => {
        alert(`Investment successful! You received ${response.data.tokensReceived} tokens.`);
        // Refresh the startups list
        axios.get('http://localhost:5000/api/startups')
          .then(response => setStartups(response.data))
          .catch(error => console.error('Error fetching startups:', error));
      })
      .catch(error => console.error('Error making investment:', error));
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Invest in Startups</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {startups.map(startup => (
          <StartupCard key={startup.id} startup={startup} onInvest={handleInvest} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockStartups.map(startup => (
          <StartupCard key={startup.id} startup={startup} onInvest={handleInvest} />
        ))}
      </div>
    </div>
  );
}

export default StartupList;