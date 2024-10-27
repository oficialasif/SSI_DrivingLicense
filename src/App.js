// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import Login from './pages/Login';
import Register from './pages/Register';
import IssuerDashboard from './pages/IssuerDashboard';
import UserDashboard from './pages/UserDashboard';
import VerifierDashboard from './pages/VerifierDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './layouts/Navbar'; // Import Navbar

function App() {
  return (
    <Router>
      <div>
        <Navbar /> {/* Navbar will appear on all pages */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/issuer-dashboard"
            element={
              <ProtectedRoute>
                <IssuerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/licenseUser-dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/verifier-dashboard"
            element={
              <ProtectedRoute>
                <VerifierDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
