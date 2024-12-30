import React, { useState, useEffect } from 'react';
import '../css/Company.scss';
import axios from 'axios';
import route from './route';
import { Link } from 'react-router-dom';

const Company = ({ setId, setRole, setLoggedIn }) => {
  const value = localStorage.getItem('Auth');
  const [company, setCompany] = useState({
    name: "",
    location: ""
  });
  const [categories, setCategories] = useState([]);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    getEssentials();
  }, []);

  const getEssentials = async () => {
    try {
      const { status, data } = await axios.get(`${route()}company`, { headers: { "Authorization": `Bearer ${value}` } });
      if (status === 200) {
        setId(data.id);
        setRole(data.role);
        setLoggedIn(true);
        if (data.company)
          setCompany(data.company);
        if (data.category.length > 0)
          setCategories(data.category[0].categories);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSave = async () => {
    if (isEditable) {
      const { status, data } = await axios.post(`${route()}editcompany`, company, { headers: { "Authorization": `Bearer ${value}` } });
      if (status === 201) {
        alert(data.msg);
      } else {
        alert("error");
      }
      setIsEditable(false);
    } else {
      setIsEditable(false);
    }
  };

  return (
    <div className="profile-container">
      {/* Left Side (Company Details) */}
      <div className="left-side">
        <img
          src="nexus.png"
          alt="Company"
          className="company-image"
        />
        <div className="company-details">
          <div className="company-name">
            <label htmlFor="">Company Name</label>
            {isEditable ? (
              <input
                type="text"
                name="name"
                value={company.name}
                onChange={handleChange}
                className="edit-input"
              />
            ) : (
              <p>{company.name}</p>
            )}
          </div>
          <div className="company-location">
            <label htmlFor="">Location</label>
            {isEditable ? (
              <input
                type="text"
                name="location"
                value={company.location}
                onChange={handleChange}
                className="edit-input"
              />
            ) : (
              <p>{company.location}</p>
            )}
          </div>
          <div className="buttons">
            {isEditable ? (
              <button className="save-btn" onClick={handleSave}>
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
        <div className="top">
        <p>Categories</p>
        <p>Add Product</p>
        <Link to={'/addproduct'}>
          <button className="add-product-btn"><img src="add.png" alt="" /></button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Company;
