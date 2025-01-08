import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from "axios";
import route from "./route";
import '../css/Profile.scss';

const Profile = ({ setUsername, setRole, setLoggedIn }) => {
  const value = localStorage.getItem('Auth');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddresses, setIsEditingAddresses] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [profile, setProfile] = useState({});
  const [countCart, setCountCart] = useState(0);
  const [countWishlist, setCountWishlist] = useState(0);
  const [countOrders, setCountOrders] = useState(0);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    houseNumber: "",
    houseName: "",
    place: "",
    pincode: "",
    postOffice: "",
    landmark: ""
  });

  useEffect(() => {
    getEssentials();
  }, []);

  const getEssentials = async () => {
    try {
      const { status, data } = await axios.get(`${route()}profile`, { headers: { "Authorization": `Bearer ${value}` } });
      if (status === 200) {
        setUsername(data.username);
        setRole(data.role);
        setLoggedIn(true);
        if (data.profile)
          setProfile({ ...data.profile });
        if (data.address)
          setAddresses(data.address.addresses);
        setCountCart(data.cart);
        setCountWishlist(data.wishlist);
        setCountOrders(data.orders);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitProfile = async () => {
    if (isEditingProfile) {
      const { status, data } = await axios.post(`${route()}edituser`, profile, { headers: { "Authorization": `Bearer ${value}`} });
      if (status === 201) {
        alert(data.msg);
      } else {
        alert("Error");
      }
      setIsEditingProfile(!isEditingProfile);
    } else {
      setIsEditingProfile(!isEditingProfile);
    }
  };

  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAddresses = [...addresses];
    updatedAddresses[index] = {
      ...updatedAddresses[index],
      [name]: value,
    };
    setAddresses(updatedAddresses);
  };

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAddress = () => {
    setIsAddingAddress(true); // Show the form for adding a new address
  };

  const handleSubmitAddress = async () => {
    // Submit the new address and hide the form
    const updatedAddresses = [...addresses, newAddress];
    const { status, data } = await axios.post(`${route()}editaddress`, updatedAddresses, { headers: { "Authorization": `Bearer ${value}`} });
    if (status === 201) {
      alert(data.msg);
      setAddresses(updatedAddresses); // Update the address list
      setIsAddingAddress(false); // Hide the input form after adding the address
      setNewAddress({
        houseNumber: "",
        houseName: "",
        place: "",
        pincode: "",
        postOffice: "",
        landmark: ""
      });
    } else {
      alert("Error");
    }
  };
  const handleCancel=()=>{
    setIsAddingAddress(false);
  }
  const handleEditAddress = (index) => {
    // Set the selected address in the newAddress state to edit it
    setNewAddress({ ...addresses[index] });
    setIsAddingAddress(true); // Show the form to edit the address
    setAddresses(addresses.filter((_, idx) => idx !== index)); // Temporarily remove the address while editing
  };

  return (
    <div className="profilee-container">
      {/* Profile Section */}
      <div className="profile-header">
        <h1>User Details</h1>
        <div className="profile-pic">
          <img src="dummy.jpg" alt="" />
        </div>
        <div className="profile-info">
          <div className="input-container">
            <div className="input-wrapper">
              <input
                type="text"
                name="fname"
                id="fname"
                value={profile.fname}
                onChange={handleProfileChange}
                disabled={!isEditingProfile}
                placeholder=" "
                className="input"
              />
              <label htmlFor="fname" className="input-label">First Name</label>
            </div>

            <div className="input-wrapper">
              <input
                type="text"
                name="lname"
                id="lname"
                value={profile.lname}
                onChange={handleProfileChange}
                disabled={!isEditingProfile}
                placeholder=" "
                className="input"
              />
              <label htmlFor="lname" className="input-label">Last Name</label>
            </div>

            <div className="input-wrapper">
              <input
                type="text"
                name="phone"
                id="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                disabled={!isEditingProfile}
                placeholder=" "
                className="input"
              />
              <label htmlFor="phone" className="input-label">Phone Number</label>
            </div>
          </div>

          <div className="gender">
            <label>Gender:</label>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={profile.gender === "male"}
                onChange={handleProfileChange}
                disabled={!isEditingProfile}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={profile.gender === "female"}
                onChange={handleProfileChange}
                disabled={!isEditingProfile}
              />
              Female
            </label>
          </div>
          <button onClick={handleSubmitProfile}>
            {isEditingProfile ? "Save Profile" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Addresses Section */}
      <div className="address-section">
        <div className="ordwish">
          <Link style={{ textDecoration: 'none' }} to={'/myorders'}>My Orders <span>({countOrders})</span></Link>
          <Link style={{ textDecoration: 'none' }} to={'/wishlist'}>My Wishlist <span>({countWishlist})</span></Link>
          <Link style={{ textDecoration: 'none' }} to={'/cart'}>My Cart <span>({countCart})</span></Link>
        </div>
        <div className="title">
          <h3>Addresses</h3>
          <button onClick={handleAddAddress} className="add-button" title="Add New Address">
            <img src="add.png" alt="" className="add-icon" />
          </button>
        </div>

        {/* New Address Form */}
        {isAddingAddress && (
          <div className="address-form">
            <input
              type="text"
              name="houseName"
              placeholder="House Name"
              value={newAddress.houseName}
              onChange={handleNewAddressChange}
            />
            
            <input
              type="text"
              name="place"
              placeholder="Place"
              value={newAddress.place}
              onChange={handleNewAddressChange}
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={newAddress.pincode}
              onChange={handleNewAddressChange}
            />
            <input
              type="text"
              name="postOffice"
              placeholder="Post Office"
              value={newAddress.postOffice}
              onChange={handleNewAddressChange}
            />
            <input
              type="text"
              name="landmark"
              placeholder="Landmark"
              value={newAddress.landmark}
              onChange={handleNewAddressChange}
            />
            <button onClick={handleSubmitAddress}>Save Address</button>
            <button onClick={handleCancel}>Cancel</button>

          </div>
        )}

        {/* Display Addresses */}
        <div className="address-list">
          {addresses.map((address, index) => (
            <div key={index} className="address-box">
              <img src="house.png" alt="" className="house" />
              <p>{address.houseName}</p>
              <p>{address.place},{address.postOffice}</p> 
              <p>{address.pincode}</p>
              <p></p>
              <p>{address.landmark}</p>
              <button onClick={() => handleEditAddress(index)}> <img src="edit.png" alt="" className="edit2" /> </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
