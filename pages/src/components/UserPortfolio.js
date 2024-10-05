import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function UserPortfolio() {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/1/portfolio') // Hardcoded user ID for now
      .then(response => setPortfolio(response.data))
      .catch(error => console.error('Error fetching portfolio:', error));
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">My Portfolio</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.map((investment, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{investment.startupName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">Token Symbol: {investment.tokenSymbol}</p>
              <p className="text-2xl font-bold">{investment.balance} tokens</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default UserPortfolio;