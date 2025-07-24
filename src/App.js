import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Success from './Success';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubscribe = async () => {
    setLoading(true);
    setError(null);
    const userId = "user_12345"; // TODO: Replace with dynamic user ID or input
    try {
      const res = await fetch(process.env.REACT_APP_API_URL + '/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      if (!res.ok) throw new Error('Failed to create checkout session');
      const data = await res.json();
      window.location = data.url; // Redirect to Stripe Checkout
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="app-container">
            <header className="app-header">
              <img src={require('./logo.svg').default} alt="Logo" className="app-logo" />
              <h1>Stripe Subscription Demo</h1>
            </header>
            <button className="subscribe-btn" onClick={handleSubscribe} disabled={loading}>
              {loading ? 'Redirecting...' : 'Subscribe for $5/month'}
            </button>
            {error && <div className="error-message">{error}</div>}
          </div>
        } />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
