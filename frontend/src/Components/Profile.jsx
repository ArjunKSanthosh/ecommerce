import React, { useEffect, useState } from 'react';
import '../css/Profile.scss'; // Import SCSS for styling
import axios from 'axios';
import route from './route';

const Profile = ({ setId, setRole, setLoggedIn }) => {
  const value = localStorage.getItem('Auth');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({ houseNumber: "", houseName: "", place: "", pincode: "", postOffice: "" });
  const [isEditingAddresses, setIsEditingAddresses] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // Track which address is being edited
  const [editAddress, setEditAddress] = useState({ houseNumber: "", houseName: "", place: "", pincode: "", postOffice: "" }); // Track the address being edited

  useEffect(() => {
    getEssentials();
  }, []);

  const getEssentials = async () => {
    try {
      const { status, data } = await axios.get(`${route()}profile`, { headers: { "Authorization": `Bearer ${value}` } });
      if (status === 200) {
        setId(data.id);
        setRole(data.role);
        setLoggedIn(true);
        if (data.profile) setProfile({ ...data.profile });
        if (data.address) setAddresses(data.address.addresses);
      }
    } catch (error) {
      console.log("Error fetching profile data:", error);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      gender: e.target.value,
    }));
  };

  const handleSubmitProfile = async () => {
    if (isEditing) {
      const { status, data } = await axios.post(`${route()}edituser`, profile, { headers: { "Authorization": `Bearer ${value}` } });
      if (status === 201) {
        alert(data.msg);
      } else {
        alert("Error updating profile");
      }
    }
    setIsEditing(!isEditing);
  };

  // Define the handleAddAddress function
  const handleAddAddress = async () => {
    try {
      const { status, data } = await axios.post(`${route()}addaddress`, { addresses: [...addresses, newAddress] }, { headers: { "Authorization": `Bearer ${value}` } });
      if (status === 201) {
        alert(data.msg);
        setAddresses((prev) => [...prev, newAddress]); // Update the addresses state
        setNewAddress({ houseNumber: "", houseName: "", place: "", pincode: "", postOffice: "" }); // Reset the newAddress state
      } else {
        alert("Error adding address");
      }
    } catch (error) {
      console.log("Error adding address:", error);
      alert("An error occurred while adding the address.");
    }
  };

  // Define the handleEditAddress function
  const handleEditAddress = (index) => {
    setEditIndex(index);
    setEditAddress(addresses[index]); // Set the address to be edited
  };

  // Define the handleSaveEdit function
  const handleSaveEdit = async () => {
    try {
      const updatedAddresses = addresses.map((address, index) => (index === editIndex ? editAddress : address));
      const { status, data } = await axios.post(`${route()}editaddress`, { addresses: updatedAddresses }, { headers: { "Authorization": `Bearer ${value}` } });
      if (status === 200) {
        setAddresses(updatedAddresses); // Update the addresses state
        alert(data.msg);
 setEditIndex(null); // Reset edit index
        setEditAddress({ houseNumber: "", houseName: "", place: "", pincode: "", postOffice: "" }); // Reset the editAddress state
      } else {
        alert("Error updating address");
      }
    } catch (error) {
      console.log("Error updating address:", error);
      alert("An error occurred while updating the address.");
    }
  };

  // Define the handleDeleteAddress function
  const handleDeleteAddress = async (index) => {
    try {
      const updatedAddresses = addresses.filter((_, i) => i !== index);
      const { status, data } = await axios.post(`${route()}editaddress`, { addresses: updatedAddresses }, { headers: { "Authorization": `Bearer ${value}` } });
      if (status === 200) {
        setAddresses(updatedAddresses); // Update the addresses state
        alert("Deleted Succesfully");
      } else {
        alert("Error deleting address");
      }
    } catch (error) {
      console.log("Error deleting address:", error);
      alert("An error occurred while deleting the address.");
    }
  };

  return (
    <div className="profile-page-container">
      <div className="profile-left">
        <img src="dummy.jpg" alt="User  " className="profile-image" />
        <input type="text" className="profile-name" name="firstName" value={profile.firstName || ""} onChange={handleProfileChange} disabled={!isEditing} placeholder="First Name" />
        <input type="text" className="profile-name" name="lastName" value={profile.lastName || ""} onChange={handleProfileChange} disabled={!isEditing} placeholder="Last Name" />
        <input type="text" className="phone" name="phone" value={profile.phone || ""} onChange={handleProfileChange} disabled={!isEditing} placeholder="Phone" />

        {/* Gender Radio Buttons */}
        <div className="gender-selection">
          <label>
            <input
              type="radio"
              value="male"
              checked={profile.gender === "male"}
              onChange={handleGenderChange}
              disabled={!isEditing}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              value="female"
              checked={profile.gender === "female"}
              onChange={handleGenderChange}
              disabled={!isEditing}
            />
            Female
          </label>
        </div>

        <button onClick={handleSubmitProfile}>{isEditing ? "Save" : "Edit"}</button>
      </div>

      <div className="profile-right">
        <h2>Addresses</h2>
        <div className="address-form">
          <input type="text" placeholder="House Number" value={newAddress.houseNumber} onChange={(e) => setNewAddress({ ...newAddress, houseNumber: e.target.value })} />
          <input type="text" placeholder="House Name" value={newAddress.houseName} onChange={(e) => setNewAddress({ ...newAddress, houseName: e.target.value })} />
          <input type="text" placeholder="Place" value={newAddress.place} onChange={(e) => setNewAddress({ ...newAddress, place: e.target.value })} />
          <input type="text" placeholder="Pincode" value={newAddress.pincode} onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })} />
          <input type="text" placeholder="Post Office" value={newAddress.postOffice} onChange={(e) => setNewAddress({ ...newAddress, postOffice: e.target.value })} />
          <button onClick={handleAddAddress}>Add Address</button>
        </div>

        <ul className="address-list">
          {addresses.map((address, index) => (
            <li key={index} className="address-item">
              <div>
                {editIndex === index ? (
                  <>
                    <input type="text" value={editAddress.houseNumber} onChange={(e) => setEditAddress({ ...editAddress, houseNumber: e.target.value })} />
                    <input type="text" value={editAddress.houseName} onChange={(e) => setEditAddress({ ...editAddress, houseName: e.target.value })} />
                    <input type="text" value={editAddress.place} onChange={(e) => setEditAddress({ ...editAddress, place: e.target.value })} />
                    <input type="text" value={editAddress.pincode} onChange={(e) => setEditAddress({ ...editAddress, pincode: e.target.value })} />
                    <input type="text" value={editAddress.postOffice} onChange={(e) => setEditAddress({ ...editAddress, postOffice: e.target.value })} />
                    <button onClick={handleSaveEdit}>Save</button>
                  </>
                ) : (
                  <>
                    <p>{address.houseNumber} - {address.houseName}, {address.place}, {address.pincode}, {address.postOffice}</p>
                    <button onClick={() => handleEditAddress(index)}>Edit</button>
                    <button onClick={() => handleDeleteAddress(index)}>Delete</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;