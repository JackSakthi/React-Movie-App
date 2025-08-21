import React, { useState } from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!email || !password || !confirm) {
      setError('All fields are required');
      return;
    }

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    const userData = { email, password };
    localStorage.setItem('movieAppUser', JSON.stringify(userData));

    navigate('/login');
  };

  return (
    <div className="signup-page">
      <form onSubmit={handleSignup} className="signup-form">
        <h2>Create Account</h2>
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
        <input
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button type="submit">Sign Up</button>
        <p onClick={() => navigate('/login')} className="nav-link">Already have an account? Login</p>
      </form>
    </div>
  );
};

export default SignUp;
