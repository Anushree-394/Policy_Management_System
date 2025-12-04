import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PremiumCalculatorDemo from './pages/PremiumCalculatorDemo';
import PurchaseFormDemo from './pages/PurchaseFormDemo';
import SuccessPage from './components/SuccessPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<PremiumCalculatorDemo />} />
            <Route path="/purchase" element={<PurchaseFormDemo />} />
            <Route path="/success" element={
              <SuccessPage 
                onDownload={() => console.log('Downloading policy...')}
                onGoToDashboard={() => window.location.href = '/'}
              />
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
