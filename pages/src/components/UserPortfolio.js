import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PortfolioCard from './PortfolioCard';

function UserPortfolio() {
  const [portfolio, setPortfolio] = useState({});
  const [companies, setCompanies] = useState({});

  useEffect(() => {
    // Fetch user data (including portfolio)
    axios.get('http://localhost:3000/users/user1') // Hardcoded user ID for now
      .then(response => setPortfolio(response.data.portfolio))
      .catch(error => console.error('Error fetching portfolio:', error));

    // Fetch all companies to get current share prices
    axios.get('http://localhost:3000/companies')
      .then(response => {
        const companyMap = {};
        response.data.forEach(company => {
          companyMap[company.id] = company;
        });
        setCompanies(companyMap);
      })
      .catch(error => console.error('Error fetching companies:', error));
  }, []);

  const portfolioItems = Object.entries(portfolio).map(([companyId, data]) => ({
    companyId,
    shares: data.shares,
    currentValue: data.shares * (companies[companyId]?.sharePrice || 0)
  }));

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">my portfolio</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioItems.map((investment, index) => (
          <PortfolioCard key={index} investment={investment} companyName={companies[investment.companyId]?.name} />
        ))}
      </div>
    </div>
  );
}

export default UserPortfolio;