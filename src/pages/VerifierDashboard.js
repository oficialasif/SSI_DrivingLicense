// src/pages/VerifierDashboard.js
import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import './VerifierDashboard.css'; // Assuming the CSS file is similar to UserDashboard.css

const VerifierDashboard = () => {
  const [scanResult, setScanResult] = useState(null);
  const [isValid, setIsValid] = useState(null);
  const [showScanner, setShowScanner] = useState(false);

  const handleScan = async (data) => {
    if (data) {
      setScanResult(data);

      try {
        const response = await fetch(`http://localhost:5000/api/licenses/${data}`);
        if (response.ok) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (error) {
        console.error('Error verifying license:', error);
        setIsValid(false);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const startScanner = () => {
    setShowScanner(true);
  };

  const cancelScanner = () => {
    setShowScanner(false);
    setScanResult(null);
    setIsValid(null);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h3>Verifier Dashboard</h3>
        <ul>
          <li>Dashboard</li>
          <li>Settings</li>
          <li>Log Out</li>
        </ul>
      </div>
      <div className="main-content">
        <h2 className="dashboard-title">Welcome to Verifier Dashboard</h2>
        {!showScanner && (
          <button className="primary-button" onClick={startScanner}>
            Start QR Code Scan
          </button>
        )}
        {showScanner && (
          <div className="scanner-section">
            <h5>Scan the QR Code to Verify</h5>
            <div className="scanner-box">
              <QrScanner
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
              />
            </div>
            <button className="danger-button mt-3" onClick={cancelScanner}>
              Cancel
            </button>
          </div>
        )}
        {scanResult && (
          <div className="result-section">
            {isValid === true ? (
              <p className="success-message">License is <strong>Verified</strong></p>
            ) : isValid === false ? (
              <p className="error-message">License is <strong>Invalid</strong></p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifierDashboard;
