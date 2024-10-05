import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function StartupDetails() {
  const [startup, setStartup] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/startups/${id}`)
      .then(response => setStartup(response.data))
      .catch(error => console.error('Error fetching startup details:', error));
  }, [id]);

  const handleInvest = () => {
    axios.post('http://localhost:5000/api/invest', {
      userId: '1', // Hardcoded for now, should be the logged-in user's ID
      startupId: id,
      amount: Number(investmentAmount)
    })
      .then(response => {
        alert(`Investment successful! You received ${response.data.tokensReceived} tokens.`);
        // Refresh startup data
        axios.get(`http://localhost:5000/api/startups/${id}`)
          .then(response => setStartup(response.data));
      })
      .catch(error => console.error('Error making investment:', error));
  };

  if (!startup) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{startup.name}</h1>
      <p className="text-gray-600 mb-6">{startup.description}</p>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Funding Progress</h2>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div className="bg-secondary h-4 rounded-full" style={{ width: `${(startup.currentFunding / startup.fundingGoal) * 100}%` }}></div>
        </div>
        <p className="text-gray-600">
          ${startup.currentFunding.toLocaleString()} / ${startup.fundingGoal.toLocaleString()}
        </p>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Token Information</h2>
        <p className="text-gray-600">Symbol: {startup.tokenSymbol}</p>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Make an Investment</h2>
        <div className="flex space-x-4">
          <input 
            type="number" 
            value={investmentAmount} 
            onChange={(e) => setInvestmentAmount(e.target.value)} 
            placeholder="Investment amount"
            className="flex-grow px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button 
            onClick={handleInvest}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Invest
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartupDetails;