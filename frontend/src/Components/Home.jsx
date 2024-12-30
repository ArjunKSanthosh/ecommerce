import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Home.scss';

const Home = ({ setId, setRole, setLoggedIn }) => {
  const navigate = useNavigate();
  const value = localStorage.getItem('Auth');

  useEffect(() => {
    getDetails();
  }, []); // Run only once when the component mounts

  const getDetails = async () => {
    try {
      if (value !== null) {
        
        const { status, data } = await axios.get("http://localhost:3000/api/home", {
          headers: { "Authorization": `Bearer ${value}` }});
        if (status === 200) {
          setId(data.id);
          setRole(data.role);
          setLoggedIn(true);
        } else {
          alert("Failed to fetch user details.");
        }
      }
    } catch (error) {
      console.error("Error fetching details:", error); // Log the actual error
      alert("An error occurred while fetching details.");
    }
  };

  return (
    <div className='home'>
      <h1>HAAII</h1>
    </div>
  );
};

export default Home;