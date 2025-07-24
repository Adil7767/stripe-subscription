import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Success() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const session_id = params.get('session_id');
    if (session_id) {
      // 1. Get session details
      fetch(process.env.REACT_APP_API_URL + `/session-details?session_id=${session_id}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch session details');
          return res.json();
        })
        .then(session => {
          setUser({
            email: session.customer?.email,
            name: session.customer?.name,
            id: session.customer?.id,
            session_id,
            userId: session.client_reference_id, // Add userId from session
          });

          // 2. Save user details to product metadata
          fetch(process.env.REACT_APP_API_URL + '/save-user-to-product', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ session_id }),
          });
        })
        .catch(err => setError(err.message));
    }
  }, []);

  if (error) return <div className="app-container"><div className="error-message">{error}</div></div>;
  if (!user) return <div className="app-container">Loading...</div>;

  return (
    <div className="app-container">
      <header className="app-header">
        <h2>Payment Successful!</h2>
      </header>
      <div style={{ background: '#fff', padding: '2rem', borderRadius: 8, boxShadow: '0 2px 8px #eee', minWidth: 320 }}>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Customer ID:</strong> {user.id}</p>
        <p><strong>Session ID:</strong> {user.session_id}</p>
        <p><strong>User ID (from FE):</strong> {user.userId}</p>
        <button className="subscribe-btn" style={{ marginTop: 24 }} onClick={() => navigate('/')}>Back to Home</button>
      </div>
    </div>
  );
}

export default Success; 