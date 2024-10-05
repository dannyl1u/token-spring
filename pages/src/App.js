import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StartupList from './components/StartupList';
import StartupDetails from './components/StartupDetails';
import UserPortfolio from './components/UserPortfolio';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-primary text-white shadow-md">
          <div className="container mx-auto px-6 py-3 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">MicroVenture</Link>
            <div className="space-x-4">
              <Link to="/" className="hover:text-gray-300 transition duration-300">Home</Link>
              <Link to="/portfolio" className="hover:text-gray-300 transition duration-300">My Portfolio</Link>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-6 py-8">
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