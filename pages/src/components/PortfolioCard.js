import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const PortfolioCard = ({ investment, companyName }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{companyName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Company ID: {investment.companyId}</p>
          <p className="text-2xl font-bold">{investment.shares} shares</p>
          <p className="text-lg">Current Value: ${investment.currentValue.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioCard;