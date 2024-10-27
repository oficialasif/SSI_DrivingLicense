import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './UserDashboard.css';

const UserDashboard = ({ user }) => {
  const [secretCode, setSecretCode] = useState('');
  const [licenseData, setLicenseData] = useState(null);
  const [error, setError] = useState('');
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (user && user._id) {
      fetchLicenseFromUser(user._id);
    }
  }, [user]);

  // Fetch license based on user ID
  const fetchLicenseFromUser = async (userId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('User not authenticated.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/licenses/user-license/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLicenseData(data.license);
        setHasFetched(true);
        setError(''); // Clear previous errors
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.message || 'No license found for this user.');
      }
    } catch (error) {
      console.error('Error fetching license:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  // Fetch license using the secret code
  const handleFetchLicense = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('User not authenticated.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/licenses/fetch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ secretCode }),
      });

      const data = await response.json();

      if (response.ok) {
        setLicenseData(data.license);
        setHasFetched(true);
        setError(''); // Clear previous errors
      } else {
        setError(data.message || 'Invalid secret code');
        setLicenseData(null);
      }
    } catch (error) {
      console.error('Error fetching license:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h3>User Dashboard</h3>
        <ul>
          <li>Dashboard</li>
          <li>Settings</li>
          <li>Log Out</li>
        </ul>
      </div>
      <div className="main-content">
        <h2 className="dashboard-title">Welcome to Your Dashboard</h2>
        {!hasFetched && (
          <div className="secret-code-form">
            <label>Enter Secret Code:</label>
            <input
              type="text"
              placeholder="Enter your secret code"
              value={secretCode}
              onChange={(e) => setSecretCode(e.target.value)}
            />
            <button className="fetch-button" onClick={handleFetchLicense}>
              Fetch License
            </button>
            {error && <p className="error-message">{error}</p>}
          </div>
        )}
        {licenseData && (
          <div className="license-data">
            <h3>License Information</h3>
            <p>Name: {licenseData.fullName}</p>
            <p>License Number: {licenseData.licenseNumber}</p>
            <p>Expiry Date: {new Date(licenseData.expiryDate).toLocaleDateString()}</p>
            <div className="qr-code-container">
              <QRCodeCanvas value={licenseData.licenseNumber} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
