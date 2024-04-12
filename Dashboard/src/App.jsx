// import React from 'react'
 import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import AddNewAdmin from "./components/AddNewAdmin"
import AddNewDoctor from "./components/AddNewDoctor"
import Sidebar from "./components/Sidebar"
import Messages from "./components/Messages"
import Doctors from "./components/Doctors"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "./main"
import { useContext, useEffect } from "react"
import  axios  from "axios" 
import "./App.css"

const App = () => {
  const {isAuthenticated, setIsAuthenticated,setUser}= useContext(Context);

  useEffect(()=>{
    const fetchAdmin = async ()=>{
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/admin/me",{ withCredentials: true });
      setUser(response.data.user);
      setIsAuthenticated(true);
        
      } catch (error) {
        setUser({});
        setIsAuthenticated(false);
      }
      
    }
    fetchAdmin();
  },[isAuthenticated])
  return (
    <>
    <Router>
      <Sidebar/>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin/addnew" element={<AddNewAdmin/>}/>
        <Route path="/doctor/addnew" element={<AddNewDoctor/>}/>
        <Route path="/messages" element={<Messages/>}/>
        <Route path="/doctors" element={<Doctors/>}/>
      </Routes>
      <ToastContainer position="top-center"/>
    </Router>
    </>
  )
}

export default App