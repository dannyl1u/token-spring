import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

function StartupList() {
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/startups')
      .then(response => setStartups(response.data))
      .catch(error => console.error('Error fetching startups:', error));
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Discover Startups</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {startups.map(startup => (
          <Card key={startup.id}>
            <CardHeader>
              <CardTitle>{startup.name}</CardTitle>
              <CardDescription>{startup.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={(startup.currentFunding / startup.fundingGoal) * 100} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                ${startup.currentFunding.toLocaleString()} / ${startup.fundingGoal.toLocaleString()}
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link to={`/startup/${startup.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default StartupList;