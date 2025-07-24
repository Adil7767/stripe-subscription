import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Success from './Success';

function App() {
  const handleSubscribe = async () => {
    const userId = "user_12345"; // Replace with your actual user ID logic
    const res = await fetch('http://localhost:4242/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    const data = await res.json();
    window.location = data.url; // Redirect to Stripe Checkout
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div>
            <h1>Stripe Subscription Demo</h1>
            <button onClick={handleSubscribe}>Subscribe for $5/month</button>
          </div>
        } />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
