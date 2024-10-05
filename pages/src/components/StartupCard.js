import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";

const StartupCard = ({ startup, onInvest }) => {
  const [investmentAmount, setInvestmentAmount] = useState('');

  const handleInvest = () => {
    onInvest(startup.id, Number(investmentAmount));
    setInvestmentAmount('');
  };

  const progressPercentage = (startup.currentFunding / startup.fundingGoal) * 100;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{startup.name}</CardTitle>
        <CardDescription>{startup.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={progressPercentage} className="w-full" />
          <div className="flex justify-between text-sm">
            <span>Current: ${startup.currentFunding.toLocaleString()}</span>
            <span>Goal: ${startup.fundingGoal.toLocaleString()}</span>
          </div>
          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Amount to invest"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleInvest}>Invest</Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">Token: {startup.tokenSymbol}</p>
      </CardFooter>
    </Card>
  );
};

export default StartupCard;