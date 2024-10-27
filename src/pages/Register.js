// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';  // Custom styling for register

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('licenseUser');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, role }),
    });

    if (response.ok) {
      setMessage('Registration successful! You can now log in.');
      setTimeout(() => navigate('/login'), 3000);
    } else {
      const errorData = await response.json();
      setMessage(`Error: ${errorData.error}`);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label>Role</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="licenseUser">License User</option>
              <option value="issuer">Issuer</option>
              <option value="verifier">Verifier</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary btn-block btn-animate">
            Register
          </button>
        </form>

        {message && <p className="text-center text-success mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
