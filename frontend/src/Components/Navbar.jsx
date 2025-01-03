import React, { useEffect, useState } from 'react';
import '../css/Navbar.scss'; // Import SCSS for styling
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = ({ username, role, loggedIn }) => {
  const [isSeller, setIsSeller] = useState(false);      // Track if the user is a seller
  const [isPopoverVisible, setIsPopoverVisible] = useState(false); // Track visibility of popover
  
  // Check if the user is a seller upon initial render
  useEffect(() => {
    if (role === "seller") {
      setIsSeller(true);
    }
  }, [role]);

  const handleLogout = () => {
    localStorage.removeItem('Auth');
    setIsSeller(false);
    setIsPopoverVisible(false);
  };

  const handleSellerClick = () => {
    alert("Seller dashboard clicked!");
  };

  const togglePopover = () => {
    setIsPopoverVisible(!isPopoverVisible);
  };

  return (
    <div className="navbar">
      {/* Logo Section */}
      <div className="navbar-logo">
        <span className="website-name">essentia'</span>
      </div>

      {/* Right Side of Navbar */}
      <div className="navbar-right">
        {loggedIn ? (
          <>
            {/* Profile Icon & Popover */}
              <h3>{username}
              </h3>
            <div className="profile-containerr">
              <FaUserCircle 
                className="profile-icon" 
                onClick={togglePopover} 
                size={30} 
              />
              {isPopoverVisible && (
                <div className="profile-popover">
                    <Link to={`/profile`}>
                    <button className="popover-btn">Profile</button>
                    </Link>
                  <button className="popover-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Seller Dashboard Button */}
            {isSeller && (
              <Link to={'/company'}>
              <button className="seller-btn" onClick={handleSellerClick}>
                Seller Dashboard
              </button>
              </Link>
            )}
            <Link to={'/cart'}>
              <button>
                <img src="cart.png" alt="" />
              </button>
            </Link>
          </>
        ) : (
          <Link to={'/login'}><button className="login-btn">Login</button></Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
