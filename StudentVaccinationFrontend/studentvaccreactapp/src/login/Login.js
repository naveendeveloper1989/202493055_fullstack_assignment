import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Optional: For styling
import AppBanner from '../AppBanner';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    if (!email || !password) {
      setMessage('Please enter both email and password.');
      return;
    }

    try {
      setMessage('Logging in...');
      const params = new URLSearchParams({
        username: email,
        password: password
      });

      const url = `http://localhost:5285/api/Login/auth?${params.toString()}`;

      // 👇 Replace this URL with your actual backend endpoint
      const response = await fetch(url, {
        method: 'POST'
      });

      //const data = await response.json();

      if (response.ok) {
        navigate('/dashboard');
        // You can redirect, store token, etc.
      } else {
        setMessage('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };
  return (
    <div>
    <div>
      <AppBanner></AppBanner>
    </div>
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">Login</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
    </div>
  );
};

export default Login;
