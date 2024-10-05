import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const PortfolioCard = ({ investment }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{investment.startupName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Token Symbol: {investment.tokenSymbol}</p>
          <p className="text-2xl font-bold">{investment.balance} tokens</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioCard;