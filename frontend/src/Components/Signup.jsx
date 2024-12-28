import React, { useState } from "react";
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import route from './route.js';
import "../css/Signup.scss";  // Import SCSS for styling

const Signup = () => {
const navigate=useNavigate()
const email=localStorage.getItem('email')
// console.log(email);

const [user, setUser] = useState({
  email:email,
  username:"",
  password:"",
  cpassword:"",
  role:""
});
const handleChange=(e)=>{
  setUser((pre)=>({...pre,[e.target.name]:e.target.value}))
}
const handleSubmit=async(e)=>{
  e.preventDefault();
  try{
  const {data,status}=await axios.post(`${route()}signup`,user);
 
  if(status==201){
    localStorage.removeItem('email');
    alert(data.msg)
    navigate('/login')
  }
  else{
    alert(data.msg)
  }
  }
catch(error){
  alert("error occured")
  }
}

return (
    <div className="container2">
      {/* Left Section with Image */}
      <div className="image-container">
          <h1>essentia'</h1>
      </div>

      {/* Right Section with Form */}
      <div className="form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              // className={error ?'error': ''}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              // className={error ?'error': ''}
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="cpassword"
              name="cpassword"
              value={user.cpassword}
              onChange={handleChange}
              // className={error ?'error': ''}

            />
          </div>

          <div className="input-group">
            <label htmlFor="role">Select Role</label>
            <select
              id="role"
              name="role"
              value={user.role}
              onChange={handleChange}
              // className={error ?'error': ''}
            >
              <option value="">Select one option</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          {/* {error && <div className="error-message">{error}</div>} */}


          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};


export default Signup;
