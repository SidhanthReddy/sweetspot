// src/LoginRegister.js
import React, { useState, useEffect } from 'react';
import { register, login, logout, observeUser } from './authService';

const LoginRegister = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = observeUser(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{user ? Welcome, ${user.email} : "Login / Register"}</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={() => register(email, password)}>Register</button>
      <button onClick={() => login(email, password)}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default LoginRegister;