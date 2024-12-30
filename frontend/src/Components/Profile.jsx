import React, { useState } from 'react';
import '../css/Profile.scss'; // Import SCSS for styling
import axios from 'axios';
import route from './route';
const Profile = ({setId,setRole,setLoggedIn}) => {
  // Sample user data (this could come from props or state in a real application)
  const value=localStorage.getItem('Auth')
  const [isEditing,setIsEditing]=useState(false)
  const [address,setAddress]=usestate([

  ]);
  const [profile,setProfile]=usestate({})
  const [user, setUser ] = useState({
    firstName: "John",
    lastName: "Doe",
    phone: "123-456-7890",
    gender: "male", // or "female"
  
  })


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser ((prevUser ) => ({
      ...prevUser ,
      [name]: value
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Toggle edit mode
  };

  return (
    <div className="profile-page-container">
      <div className="profile-left">
        <img 
          src="https://via.placeholder.com/150" 
          alt="User " 
          className="profile-image" 
        />
        <input 
          type="text" 
          className="profile-name" 
          name="firstName" 
          value={user.firstName} 
          onChange={handleChange} 
          disabled={!isEditing} // Disable input if not editing
        />
        <input 
          type="text" 
          className="profile-name" 
          name="lastName" 
          value={user.lastName} 
          onChange={handleChange} 
          disabled={!isEditing} // Disable input if not editing
        />
        <input 
          type="text" 
          className="profile-phone" 
          name="phone" 
          value={user.phone} 
          onChange={handleChange} 
          disabled={!isEditing} // Disable input if not editing
        />
        <div className="profile-gender">
          <label>
            <input 
              type="checkbox" 
              checked={user.gender === "male"} 
              onChange={() => setUser ({ ...user, gender: "male" })} 
              disabled={!isEditing} // Disable checkbox if not editing
            /> Male
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={user.gender === "female"} 
              onChange={() => setUser ({ ...user, gender: "female" })} 
              disabled={!isEditing} // Disable checkbox if not editing
            /> Female
          </label>
        </div>
        <button className="profile-edit-btn" onClick={handleEditToggle}>
          {isEditing ? "Save Profile" : "Edit Profile"} {/* Change button text */}
        </button>
      </div>

      <div className="profile-right">
        <h2 className="address-title">Address Details</h2>
        <div className="address-field">
          <label className="address-label">Home:</label>
          <input type="text" className="address-input" placeholder="Enter Home" />
        </div>
        <div className="address-field">
          <label className="address-label">Pincode:</label>
          <input type="text" className="address-input" placeholder="Enter Pincode" />
        </div>
        <div className="address-field">
          <label className="address-label">Landmark:</label>
          <input type="text" className="address-input" placeholder="Enter Landmark" />
        </div>
        <div className="address-field">
          <label className="address-label">Street:</label>
          <input type="text" className="address-input" placeholder="Enter Street" />
        </div>
        <div className="address-field">
          <label className="address-label">District:</label>
          <input type="text" className="address-input" placeholder="Enter District" />
        </div>
        <button className="address-edit-btn">Edit Address </button>
      </div>
    </div>
  );
};

export default Profile;