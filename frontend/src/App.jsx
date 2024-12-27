import React,{useState} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login'
import './App.css'

function App() {


  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' Component={Home}/>
            <Route path='/login' Component={Login}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
