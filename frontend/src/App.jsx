
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState,useEffect } from 'react'
import { Routes, Route, Navigate,Router,BrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar';
import { Toaster } from 'react-hot-toast';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage'
import { Loader } from 'lucide-react';
import { authStore } from './store/authStore';

function App() {
  const [count, setCount] = useState(0)

  const authUser = authStore((state) => state.authUser); // Access Zustand store state

  //access the zustand state on each render event
  useEffect(() => {
    authStore.getState();
  });

  console.log(authUser);
//UI For the SignUp Page

  return (

      <>
        <div data-theme="mytheme">
            <BrowserRouter>
              
                <Routes>
                  
                  <Route path="/" element={authUser? <HomePage/>:<Navigate to ="/login"/>}/>
                  <Route path="/signup" element={!authUser? <SignupPage/>:<Navigate to ="/"/>}/>
                  <Route path="/login" element={!authUser? <LoginPage/>:<Navigate to ="/"/>}/>
                </Routes>
              
              </BrowserRouter>

            <Toaster/>


        </div>
      </>
  )
}

export default App
