import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StartupCard from './StartupCard';

function StartupList() {
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/companies')
      .then(response => {
        // Transform company data to match startup structure
        const startupData = response.data.map(company => ({
          id: company.id,
          name: company.name,
          description: `Innovative company with ${company.totalShares.toLocaleString()} total shares.`,
          fundingGoal: company.totalShares * company.sharePrice,
          currentFunding: (company.totalShares - company.availableShares) * company.sharePrice,
          tokenSymbol: company.id.toUpperCase().slice(0, 3), // Create a token symbol from company id
          sharePrice: company.sharePrice
        }));
        setStartups(startupData);
      })
      .catch(error => console.error('Error fetching startups:', error));
  }, []);

  const handleInvest = (startupId, amount) => {
    axios.post('http://localhost:3000/api/buy', {
      userId: 'user1', // Hardcoded for now, should be the logged-in user's ID
      companyId: startupId,
      amount: Math.floor(amount / startups.find(s => s.id === startupId).sharePrice) // Convert investment amount to number of shares
    })
      .then(response => {
        const sharesReceived = response.data.transaction.amount;
        alert(`Investment successful! You received ${sharesReceived} shares.`);
        // Refresh the startups list
        axios.get('http://localhost:3000/companies')
          .then(response => {
            console.log(response)
            // const updatedStartupData = response.data.map(company => ({
            //   id: company.id,
            //   name: company.name,
            //   description: `Innovative company with ${company.totalShares.toLocaleString()} total shares.`,
            //   fundingGoal: company.totalShares * company.sharePrice,
            //   currentFunding: (company.totalShares - company.availableShares) * company.sharePrice,
            //   tokenSymbol: company.id.toUpperCase().slice(0, 3),
            //   sharePrice: company.sharePrice
            // }));
            // setStartups(updatedStartupData);
          })
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
    </div>
  );
}

export default StartupList;