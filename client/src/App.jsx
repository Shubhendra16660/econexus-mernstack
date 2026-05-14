import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import './App.css'
import Register from './components/Register'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login'
import SubmitIdea from './components/SubmitIdea'
import Dashboard from './components/Dashboard'
import AdminDashboard from "./components/AdminDashboard";
import Ideas from "./components/Ideas";
import ProtectedRoute from "./components/ProtectedRoute";

function App() { 

  return (
    <>
     <Header/>
     {/* Dynamic Content */}
      <div className="main-content">
       <Routes>

  <Route path="/" element={<Home />} />

  <Route path="/register" element={<Register />} />

  <Route path="/login" element={<Login />} />

  <Route path="/submit" element={<SubmitIdea />} />

 <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
>
  <Route index element={<Ideas />} />
  <Route path="ideas" element={<Ideas />} />
</Route>
</Routes>
        
      </div>
     <Footer/>
     
    </>
  )
}

export default App
