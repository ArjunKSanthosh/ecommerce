import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import route from './route.js'
import '../css/Login.scss'
const Login=()=> {
  const navigate=useNavigate();
  const [loginDetails,setDetails]=useState({
    email:"",
    password:""
  });
  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      console.log("hiiii");
      
      const {status,data}=await axios.post(`${route()}signin`,loginDetails,{Headers:{"Content-Type":"application/json"}});
    if(status===200){
      localStorage.setItem("Auth",data.token)
      alert(data.msg)
      navigate('/')
    }
    else{
      alert(data.msg)
    }
    } catch (error) {
      alert("error occured")
    }
  };
  const handleChange=(e)=>{
    setDetails((pre)=>({...pre,[e.target.name]:e.target.value}))
  }
    return(
        <>
        <div className="main2">
            <div className="login">
          
              <h1>essentia'</h1>
                <h2>Login</h2>
        <form onSubmit={handleSubmit} >
          <div className="input-group">
            <label htmlFor="email">Email </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

        

          <button type="submit" className="login-btn">
            Login
          </button>

          <div className="forgot-password">
            <a href="#">Forgot password?</a>
          </div>

          <div className="signup">
            <p>
              Don't have an account? <a href="/email">Sign Up</a>
            </p>
          </div>
        </form>
            </div>
            <div className="logimg">
              <img src="log3.png" alt="" />
            </div>
        </div>
        </>
    )
}
export default Login;