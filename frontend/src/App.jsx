import React,{useState} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Email from './Components/Email' 
import Navbar from './Components/Navbar'
import Profile from './Components/Profile'
import Company from './Components/Company'
import AddProduct from './Components/Addproduct'
import DisProd from './Components/DisProd'
import Products from './Components/Products'
import EditProduct from './Components/EditProduct'
import './App.css'

function App() {

  const [id,setId]=useState("");
  const [role,setRole]=useState("");
  const [loggedIn,setLoggedIn]=useState(false);
  
  return (
    <BrowserRouter>
          <Navbar id={id} role={role} loggedIn={loggedIn}/>

        <Routes>
            <Route path='/login' Component={Login}/>
            <Route path='/signup' Component={Signup}/>
            <Route path='/email' Component={Email}/>
            <Route path='/' element={<Home  setId={setId} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
            <Route path='/profile' element={<Profile  setId={setId} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
            <Route path='/company' element={<Company  setId={setId} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
            <Route path='/addproduct' element={<AddProduct  setId={setId} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
            <Route path='/products/:category' element={<Products  setId={setId} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
            <Route path='/product/:id' element={<DisProd  setId={setId} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
            <Route path='/editproduct/:_id' element={<EditProduct  setId={setId} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>


        </Routes>
    </BrowserRouter>
  )
}

export default App
