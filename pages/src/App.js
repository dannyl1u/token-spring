import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Button } from "./ui/button"

import StartupList from './components/StartupList';
import StartupDetails from './components/StartupDetails';
import UserPortfolio from './components/UserPortfolio';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background font-sans">
        <header className="border-b">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              <Link to="/" className="text-2xl font-bold">token.spring</Link>
              <nav className="space-x-4">
                <Button variant="ghost" asChild>
                  <Link to="/">home</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/portfolio">my portfolio</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/">my company</Link>
                </Button>
              </nav>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<StartupList />} />
            <Route path="/startup/:id" element={<StartupDetails />} />
            <Route path="/portfolio" element={<UserPortfolio />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;