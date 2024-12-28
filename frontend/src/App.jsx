import React,{useState} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Email from './Components/Email'
import './App.css'

function App() {


  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' Component={Home}/>
            <Route path='/login' Component={Login}/>
            <Route path='/signup' Component={Signup}/>
            <Route path='/email' Component={Email}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
