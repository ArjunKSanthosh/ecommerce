import React,{useState} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Email from './Components/Email' 
import Navbar from './Components/Navbar'
import Profile from './Components/Profile'
import Company from './Components/Company'
import AddProduct from './Components/AddProduct'
import DisProd from './Components/DisProd'
import Products from './Components/Products'
import EditProduct from './Components/EditProduct'
import Cart from './Components/Cart'
import WishList from './Components/WishList'
import './App.css'

function App() {

  const [username,setUsername]=useState("");
  const [role,setRole]=useState("");
  const [loggedIn,setLoggedIn]=useState(false);
  
  return (
    <BrowserRouter>
          <Navbar username={username} role={role} loggedIn={loggedIn}/>

        <Routes>
            <Route path='/login' Component={Login}/>
            <Route path='/signup' Component={Signup}/>
            <Route path='/email' Component={Email}/>
            <Route path='/' element={<Home  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
            <Route path='/profile' element={<Profile  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
            <Route path='/company' element={<Company  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
            <Route path='/addproduct' element={<AddProduct  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
            <Route path='/products/:category' element={<Products  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
            <Route path='/product/:id' element={<DisProd  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
            <Route path='/editproduct/:_id' element={<EditProduct  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
            <Route path='/cart' element={<Cart  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
            <Route path='/wishlist' element={<WishList  setUsername={setUsername} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>



        </Routes>
    </BrowserRouter>
  )
}

export default App
