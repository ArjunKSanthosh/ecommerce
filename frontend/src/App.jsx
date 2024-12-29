import React,{useState} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Email from './Components/Email' 
import Navbar from './Components/Navbar'
import Profile from './Components/Profile'
import './App.css'

function App() {

  const [id,setId]=useState("");
  const [role,setRole]=useState("");
  const [loggedIn,setLoggedIn]=useState(false);
  return (
    <BrowserRouter>
          <Navbar id={id} role={role} loggedIn={loggedIn}/>

        <Routes>
            <Route path='/' Component={Home}/>
            <Route path='/login' Component={Login}/>
            <Route path='/signup' Component={Signup}/>
            <Route path='/email' Component={Email}/>
            <Route path='/profile' element={<Profile  setId={setId} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>

        </Routes>
    </BrowserRouter>
  )
}

export default App
