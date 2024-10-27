// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ToastNotification from '../components/ToastNotification';
import './Login.css';  // CSS file for custom styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // Store JWT token and user details in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect based on user role
        if (data.user.role === 'licenseUser') {
          navigate('/licenseUser-dashboard');
        } else if (data.user.role === 'issuer') {
          navigate('/issuer-dashboard');
        } else if (data.user.role === 'verifier') {
          navigate('/verifier-dashboard');
        }
      } else {
        const errorData = await response.json();
        setToast({ message: `Error: ${errorData.error}`, type: 'danger' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      setToast({ message: 'Failed to login. Please try again.', type: 'danger' });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block btn-animate">
            Login
          </button>
        </form>
      </div>

      {toast.message && (
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
          <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />
        </div>
      )}
    </div>
  );
};

export default Login;
