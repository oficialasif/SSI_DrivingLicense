// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'; // Custom CSS for advanced styling

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Check if the user is logged in

  return (
    <div className="home-container">
      <header className="hero-section text-center d-flex align-items-center justify-content-center">
        <div className="hero-content text-center text-white">
          <h1 className="display-3 fw-bold">The Power of Self-Sovereign Identity</h1>
          <p className="lead">
            Manage driving licenses securely with our blockchain-based system, providing transparency, privacy, and full control over your data.
          </p>
          {!user && (
            <div className="mt-4">
              <Link to="/login" className="btn btn-primary btn-lg mx-2">Login</Link>
              <Link to="/register" className="btn btn-outline-light btn-lg mx-2">Register</Link>
            </div>
          )}
        </div>
      </header>

      <section className="info-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img
                src="https://via.placeholder.com/500"
                alt="Blockchain Illustration"
                className="img-fluid"
              />
            </div>
            <div className="col-md-6">
              <h2 className="text-primary">Why Choose Our Platform?</h2>
              <p className="text-secondary">
                Our platform ensures a secure, efficient, and decentralized way of managing driving licenses.
                The use of blockchain technology offers unparalleled privacy and control, making it ideal for both individuals and organizations.
              </p>
              <ul className="list-unstyled">
                <li>✔ Transparent verification process</li>
                <li>✔ Self-sovereign identity (SSI) for users</li>
                <li>✔ Secure storage with blockchain technology</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center text-primary mb-4">Our Features</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">Decentralized Identity</h5>
                  <p className="card-text">Your identity, stored securely on the blockchain, is always under your control.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">QR Code Verification</h5>
                  <p className="card-text">Easily share and verify your license using QR codes, offering a hassle-free experience.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">Private and Secure</h5>
                  <p className="card-text">No third party can access your personal data without your consent, thanks to blockchain security.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
