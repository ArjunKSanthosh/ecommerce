import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import '../css/Login.scss'
function Login() {
    return(
        <>
        <div className="main2">
            <div className="login">
          
              <h1>essentia'</h1>
                <h2>Login</h2>
        <form >
          <div className="input-group">
            <label htmlFor="email">Email </label>
            <input
              type="email"
              id="email"
              name="email"
              value=""
              onChange={(e) => setEmail(e.target.value)}
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
              value=""
              onChange={(e) => setPassword(e.target.value)}
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
              Don't have an account? <a href="/signup">Sign Up</a>
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