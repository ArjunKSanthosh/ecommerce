import React from 'react';
import '../css/Profile.scss'; // Import SCSS for styling

const Profile = () => {
  // Sample user data (this could come from props or state in a real application)
  const user = {
    firstName: "John",
    lastName: "Doe",
    phone: "123-456-7890",
    gender: "male", // or "female"
    address: {
      home: "",
      pincode: "",
      landmark: "",
      street: "",
      district: ""
    }
  };

  return (
    <div className="profile-page-container">
      <div className="profile-left">
        <img 
          src="https://via.placeholder.com/150" 
          alt="User " 
          className="profile-image" 
        />
        <h2 className="profile-name">{user.firstName} {user.lastName}</h2>
        <p className="profile-phone">Phone: {user.phone}</p>
        <div className="profile-gender">
          <label>
            <input type="checkbox" checked={user.gender === "male"} /> Male
          </label>
          <label>
            <input type="checkbox" checked={user.gender === "female"} /> Female
          </label>
        </div>
        <button className="profile-edit-btn">Edit Details</button>
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
        <button className="address-edit-btn">Edit Address</button>
      </div>
    </div>
  );
};

export default Profile;