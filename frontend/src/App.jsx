import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState,useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import { Toaster } from 'react-hot-toast';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage'
import { Loader } from 'lucide-react'

function App() {
  const [count, setCount] = useState(0)


  useEffect();

  return (

      <>
        <div>
            <Navbar/>
              
              <Router>
                <Routes>
                  <Route path="/" element={HomePage}/>
                  <Route path="/signup"></Route>
                </Routes>
              </Router>

            <Toaster/>


        </div>
      </>
  )
}

export default App
