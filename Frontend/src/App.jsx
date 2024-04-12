// import React from 'react'
import "./App.css"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Appointment from "./pages/Appointment"
import About from "./pages/About"
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from "react"
import { Context } from "./main"
import axios from "axios"

const App = () => {
  const {isAuthenticated, setIsAuthenticated,setUser}= useContext(Context);

  useEffect(()=>{
    const fetchUser = async ()=>{
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/patient/me",{ withCredentials: true });
      setUser(response.data.user);
      setIsAuthenticated(true);
        
      } catch (error) {
        setUser({});
        setIsAuthenticated(false);
      }
      
    }
    fetchUser();
  },[isAuthenticated])
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/appointment" element={<Appointment/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
      <Footer/>
      <ToastContainer position="top-center"/>
    </Router>
    </>
  )
}

export default App