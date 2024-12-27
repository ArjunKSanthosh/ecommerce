import React, { useState } from "react";
import "../css/Signup.scss";  // Import SCSS for styling

const Signup = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     confirmPassword: "",
//     userType: "buyer",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here (e.g., send data to an API)
//     console.log(formData);
//   };

  return (
    <div className="container2">
      {/* Left Section with Image */}
      <div className="image-container">
          <h1>essentia'</h1>
      </div>

      {/* Right Section with Form */}
      <div className="form-container">
        <h2>Sign Up</h2>
        <form >
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
            //   value={formData.username}
            //   onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
            //   value={formData.password}
            //   onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
            //   value={formData.confirmPassword}
            //   onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="userType">Select User Type</label>
            <select
              id="userType"
              name="userType"
            //   value={formData.userType}
            //   onChange={handleChange}
              required
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
