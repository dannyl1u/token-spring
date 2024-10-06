import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StartupCard from './StartupCard';
import { toast } from 'react-hot-toast';

function StartupList() {
  const [startups, setStartups] = useState([]);

  const fetchStartups = () => {
    axios.get('http://localhost:3000/companies')
      .then(response => {
        const startupData = response.data.map(company => ({
          id: company.id,
          name: company.name,
          description: company.description,
          info: company.info,
          fundingGoal: company.totalShares * company.sharePrice,
          currentFunding: company.currentFunding,
          tokenSymbol: company.id.toUpperCase().slice(0, 3),
          sharePrice: company.sharePrice,
          availableShares: company.availableShares
        }));
        setStartups(startupData);
      })
      .catch(error => {
        console.error('Error fetching startups:', error);
        toast.error('Failed to load startups. Please try again later.');
      });
  };

  useEffect(() => {
    fetchStartups();
  }, []);

  const handleInvest = (startupId, amount) => {
    const startup = startups.find(s => s.id === startupId);
    const shares = Math.floor(amount / startup.sharePrice);

    axios.post('http://localhost:3000/buy', {
      userId: 'user1', // Hardcoded for now, should be the logged-in user's ID
      companyId: startupId,
      amount: shares
    })
      .then(response => {
        if (response.data.success) {
          toast.success(`Investment successful! You received ${shares} shares.`);
          
          // Update the startup data locally
          setStartups(prevStartups => prevStartups.map(s => {
            if (s.id === startupId) {
              return {
                ...s,
                currentFunding: s.currentFunding + amount,
                availableShares: s.availableShares - shares
              };
            }
            return s;
          }));
        } else {
          toast.error('Investment failed. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error making investment:', error);
        toast.error(error.response?.data?.error || 'An error occurred while processing your investment.');
      });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Invest in Early Stage Startups</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {startups.map(startup => (
          <StartupCard key={startup.id} startup={startup} onInvest={handleInvest} />
        ))}
      </div>
    </div>
  );
}

export default StartupList;