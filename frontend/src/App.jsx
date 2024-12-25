import React,{useState} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import './App.css'

function App() {


  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' Component={Home}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
