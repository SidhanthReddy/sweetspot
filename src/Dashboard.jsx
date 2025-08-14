import React from 'react';
import { logout } from './authService';

const Dashboard = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Dashboard - Protected Page</h2>
      <p>Only visible to logged-in users</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
