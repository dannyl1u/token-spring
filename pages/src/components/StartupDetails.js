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
        axios.get(`http://localhost:5000/api/startups/${id}`)
          .then(response => setStartup(response.data));
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
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Make an Investment</h2>
          <div className="flex space-x-2">
            <Input 
              type="number" 
              value={investmentAmount} 
              onChange={(e) => setInvestmentAmount(e.target.value)} 
              placeholder="Investment amount"
            />
            <Button onClick={handleInvest}>Invest</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default StartupDetails;