import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'react-hot-toast';

const StartupCard = ({ startup, onInvest }) => {
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInvest = async () => {
    if (!investmentAmount || isNaN(Number(investmentAmount)) || Number(investmentAmount) <= 0) {
      toast.error('Please enter a valid investment amount');
      return;
    }

    setIsLoading(true);
    try {
      await onInvest(startup.id, Number(investmentAmount));
      setInvestmentAmount('');
    } catch (error) {
      console.error('Error processing investment:', error);
      toast.error('An error occurred while processing your investment.');
    } finally {
      setIsLoading(false);
    }
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
          <div>
            <Button
              variant="ghost"
              className="w-full flex justify-between items-center"
              onClick={() => setIsInfoExpanded(!isInfoExpanded)}
            >
              <span>Terms of Investment</span>
              {isInfoExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </Button>
            {isInfoExpanded && (
              <div className="mt-2 p-2 bg-muted rounded-md">
                <p className="text-sm">{startup.info}</p>
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Amount to invest"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleInvest} disabled={isLoading}>
              {isLoading ? 'Investing...' : 'Invest'}
            </Button>
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