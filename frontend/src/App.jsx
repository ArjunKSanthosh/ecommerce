import React,{useState} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login'
import Signup from './Components/Signup'
import './App.css'

function App() {


  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' Component={Home}/>
            <Route path='/login' Component={Login}/>
            <Route path='/signup' Component={Signup}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
