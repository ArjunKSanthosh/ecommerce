import React, { useState,useEffect } from 'react';
import '../css/Company.scss';
import axios from 'axios';
import route from './route';

const Company = ({setRole,setLoggedIn}) => {
  const value=localStorage.getItem('Auth')
  const [company,setCompany]=useState({
    name:"",
    location:""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [companyName, setCompanyName] = useState('Company Name');
  const [companyLocation, setCompanyLocation] = useState('Location');

  // Handle toggle for editing
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Save the details after editing
  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      {/* Left Side (Company Details) */}
      <div className="left-side">
        <img
          src="company-image.jpg"
          alt="Company"
          className="company-image"
        />
        <div className="company-details">
          <div className="company-name">
            {isEditing ? (
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="edit-input"
              />
            ) : (
              <span>{companyName}</span>
            )}
          </div>
          <div className="company-location">
            {isEditing ? (
              <input
                type="text"
                value={companyLocation}
                onChange={(e) => setCompanyLocation(e.target.value)}
                className="edit-input"
              />
            ) : (
              <span>{companyLocation}</span>
            )}
          </div>
          <div className="buttons">
            {isEditing ? (
              <button className="save-btn" onClick={handleSaveClick}>
                Save
              </button>
            ) : (
              <button className="edit-btn" onClick={handleEditClick}>
                Edit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right Side (Add Product) */}
      <div className="right-side">
        <button className="add-product-btn">Add Product</button>
      </div>
    </div>
  );
};

export default Company;
