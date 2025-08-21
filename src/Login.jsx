import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = localStorage.getItem('movieAppUser');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      if (email === parsedUser.email && password === parsedUser.password) {
        onLogin(parsedUser); // ✅ pass to App.jsx
        navigate('/');       // ✅ go to home
      } else {
        setError('Invalid email or password');
      }
    } else {
      setError('No account found. Please sign up first.');
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Sign In</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p onClick={() => navigate('/signup')} className="nav-link">Don't have an account? Sign Up</p>
      </form>
    </div>
  );
};

export default Login;
