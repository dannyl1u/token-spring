import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";

function StartupDetails() {
  const [startup, setStartup] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/companies/${id}`)
      .then(response => {
        const company = response.data;
        // Transform company data to match startup structure
        const startupData = {
          id: company.id,
          name: company.name,
          description: company.description,
          info: company.info,
          fundingGoal: company.totalShares * company.sharePrice,
          currentFunding: (company.totalShares - company.availableShares) * company.sharePrice,
          tokenSymbol: company.id.toUpperCase().slice(0, 3),
          sharePrice: company.sharePrice,
          totalShares: company.totalShares,
          availableShares: company.availableShares
        };
        setStartup(startupData);
      })
      .catch(error => console.error('Error fetching startup details:', error));
  }, [id]);

  const handleInvest = () => {
    const shareAmount = Math.floor(Number(investmentAmount) / startup.sharePrice);
    axios.post('http://localhost:3000/api/buy', {
      userId: 'user1', // Hardcoded for now, should be the logged-in user's ID
      companyId: id,
      amount: shareAmount
    })
      .then(response => {
        alert(`Investment successful! You received ${shareAmount} shares.`);
        axios.get(`http://localhost:3000/companies/${id}`)
          .then(response => {
            const company = response.data;
            const updatedStartupData = {
              ...startup,
              currentFunding: (company.totalShares - company.availableShares) * company.sharePrice,
              availableShares: company.availableShares
            };
            setStartup(updatedStartupData);
          });
      })
      .catch(error => console.error('Error making investment:', error));
  };

  if (!startup) return <div className="text-center py-8">Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{startup.name}</CardTitle>
        <CardDescription>{startup.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Funding Progress</h2>
          <Progress value={(startup.currentFunding / startup.fundingGoal) * 100} className="mb-2" />
          <p className="text-sm text-muted-foreground">
            ${startup.currentFunding.toLocaleString()} / ${startup.fundingGoal.toLocaleString()}
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Token Information</h2>
          <p>Symbol: {startup.tokenSymbol}</p>
          <p>Share Price: ${startup.sharePrice.toFixed(2)}</p>
          <p>Available Shares: {startup.availableShares.toLocaleString()} / {startup.totalShares.toLocaleString()}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Make an Investment</h2>
          <div className="flex space-x-2">
            <Input 
              type="number" 
              value={investmentAmount} 
              onChange={(e) => setInvestmentAmount(e.target.value)} 
              placeholder="Investment amount ($)"
            />
            <Button onClick={handleInvest}>Invest</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default StartupDetails;