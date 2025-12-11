import React, { useState } from 'react';
import API, { setAuthToken } from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const r = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', r.data.token);
      setAuthToken(r.data.token);

      // Update login status
      setIsLoggedIn(true);

      // Go to dashboard
      nav('/');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="container" style={{ marginTop: 40 }}>
      <div className="card" style={{
        maxWidth: 420,
        margin: '0 auto',
        padding: 20,
        borderTop: "4px solid #00A8E8"
      }}>
        <h3 style={{ color: '#003B73' }}>Login</h3>
        <form onSubmit={submit} style={{ display: 'grid', gap: 10 }}>
          <input required placeholder="Email"
            value={email} onChange={e => setEmail(e.target.value)}
            className="input" />

          <input required type="password" placeholder="Password"
            value={password} onChange={e => setPassword(e.target.value)}
            className="input" />

          <button className="btn" type="submit">Login</button>
        </form>

        <p style={{ marginTop: 12 }}>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}
