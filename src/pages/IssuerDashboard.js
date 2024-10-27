// src/pages/IssuerDashboard.js
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './IssuerDashboard.css'; // Optional CSS for better styling

const IssuerDashboard = () => {
  const [licenseData, setLicenseData] = useState({
    fullName: '',
    dob: '',
    gender: '',
    nationality: '',
    fatherName: '',
    motherName: '',
    spouseName: '',
    licenseNumber: '',
    licenseType: '',
    issueDate: '',
    expiryDate: '',
    vehicleClass: '',
    permanentAddress: '',
    presentAddress: '',
    nidOrBirthReg: '',
    bloodGroup: '',
    educationQualification: '',
    signature: '',
  });

  const [showLicenseForm, setShowLicenseForm] = useState(false); // Toggle license form visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLicenseData({ ...licenseData, [name]: value });
  };

  const validateFields = () => {
    for (const key in licenseData) {
      if (!licenseData[key] && key !== 'spouseName') {
        alert(`Please fill out the ${key.replace(/([A-Z])/g, ' $1')} field.`);
        return false;
      }
    }
    return true;
  };

  const handleIssueLicense = async () => {
    if (!validateFields()) return;

    const secretCode = uuidv4(); // Generate unique code

    const payload = {
      ...licenseData,
      secretCode,
    };

    try {
      const response = await fetch('http://localhost:5000/api/licenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`License Issued! Secret Code: ${data.secretCode}`);
      } else {
        const errorData = await response.json();
        alert(`Error issuing license: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>Dashboard</h3>
        <ul>
          <li onClick={() => setShowLicenseForm(false)}>Overview</li>
          <li onClick={() => setShowLicenseForm(true)}>Issue License</li>
          <li>Notifications</li>
          <li>Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {showLicenseForm ? (
          <div className="license-form">
            <h2>Issue a New License</h2>

            <form>
              <div className="form-field">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={licenseData.fullName}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                />
              </div>

              <div className="form-field">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={licenseData.dob}
                  onChange={handleChange}
                />
              </div>

              <div className="gender-field">
                <label>Gender</label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={licenseData.gender === 'Male'}
                      onChange={handleChange}
                    /> Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={licenseData.gender === 'Female'}
                      onChange={handleChange}
                    /> Female
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      checked={licenseData.gender === 'Other'}
                      onChange={handleChange}
                    /> Other
                  </label>
                </div>
              </div>

              {/* Other fields go here, in similar form-field divs */}
              {/* License Type, Addresses, etc. */}

              <label>Nationality</label>
              <input
                type="text"
                name="nationality"
                value={licenseData.nationality}
                onChange={handleChange}
                placeholder="Enter Nationality"
              />

              <label>Father's Name</label>
              <input
                type="text"
                name="fatherName"
                value={licenseData.fatherName}
                onChange={handleChange}
                placeholder="Enter Father's Name"
              />

              <label>Mother's Name</label>
              <input
                type="text"
                name="motherName"
                value={licenseData.motherName}
                onChange={handleChange}
                placeholder="Enter Mother's Name"
              />

              <label>Spouse's Name (Optional)</label>
              <input
                type="text"
                name="spouseName"
                value={licenseData.spouseName}
                onChange={handleChange}
                placeholder="Enter Spouse's Name"
              />

              <label>License Number</label>
              <input
                type="text"
                name="licenseNumber"
                value={licenseData.licenseNumber}
                onChange={handleChange}
                placeholder="Enter License Number"
              />

              <label>License Type</label>
              <input
                type="text"
                name="licenseType"
                value={licenseData.licenseType}
                onChange={handleChange}
                placeholder="Enter License Type"
              />

              <label>Issue Date</label>
              <input
                type="date"
                name="issueDate"
                value={licenseData.issueDate}
                onChange={handleChange}
              />

              <label>Expiry Date</label>
              <input
                type="date"
                name="expiryDate"
                value={licenseData.expiryDate}
                onChange={handleChange}
              />

              <label>Vehicle Class</label>
              <input
                type="text"
                name="vehicleClass"
                value={licenseData.vehicleClass}
                onChange={handleChange}
                placeholder="Enter Vehicle Class"
              />

              <label>Permanent Address</label>
              <input
                type="text"
                name="permanentAddress"
                value={licenseData.permanentAddress}
                onChange={handleChange}
                placeholder="Enter Permanent Address"
              />

              <label>Present Address</label>
              <input
                type="text"
                name="presentAddress"
                value={licenseData.presentAddress}
                onChange={handleChange}
                placeholder="Enter Present Address"
              />

              <label>NID or Birth Registration</label>
              <input
                type="text"
                name="nidOrBirthReg"
                value={licenseData.nidOrBirthReg}
                onChange={handleChange}
                placeholder="Enter NID or Birth Registration"
              />

              <label>Blood Group</label>
              <input
                type="text"
                name="bloodGroup"
                value={licenseData.bloodGroup}
                onChange={handleChange}
                placeholder="Enter Blood Group"
              />

              <label>Educational Qualification</label>
              <input
                type="text"
                name="educationQualification"
                value={licenseData.educationQualification}
                onChange={handleChange}
                placeholder="Enter Educational Qualification"
              />

              <label>Signature</label>
              <input
                type="text"
                name="signature"
                value={licenseData.signature}
                onChange={handleChange}
                placeholder="Enter Signature"
              />

              <div className="form-row">
                <button
                  type="button"
                  className="issue-button"
                  onClick={handleIssueLicense}
                >
                  Issue License
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="overview">
            <h2>Welcome to the Issuer Dashboard</h2>
            <p>Select an option from the sidebar to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssuerDashboard;
