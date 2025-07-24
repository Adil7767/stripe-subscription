import React, { useEffect, useState } from 'react';

function Success() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const session_id = params.get('session_id');
    if (session_id) {
      // 1. Get session details
      fetch(`http://localhost:4242/session-details?session_id=${session_id}`)
        .then(res => res.json())
        .then(session => {
          setUser({
            email: session.customer?.email,
            name: session.customer?.name,
            id: session.customer?.id,
            session_id,
            userId: session.client_reference_id, // Add userId from session
          });

          // 2. Save user details to product metadata
          fetch('http://localhost:4242/save-user-to-product', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ session_id }),
          });
        });
    }
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>Payment Successful!</h2>
      <p>Email: {user.email}</p>
      <p>Customer ID: {user.id}</p>
      <p>Session ID: {user.session_id}</p>
      <p>User ID (from FE): {user.userId}</p>
    </div>
  );
}

export default Success; 