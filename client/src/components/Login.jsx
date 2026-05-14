import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import axios from "axios"

function Login() {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    setError(""); 
  };

  // email regex
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    // 🔴 Validation
    if (!email && !password) {
      return setError("Email and Password are required ");
    }

    if (!email) {
      return setError("Email is required");
    }

    if (!validateEmail(email)) {
      return setError("Invalid email format ");
    }

    if (!password) {
      return setError("Password is required ");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters ");
    }

    // 🟢 API call
      try {

    const res = await axios.post(
      "http://localhost:4000/api/auth/login",
      formData
    );
  // save token
    localStorage.setItem(
      "token",
      res.data.token
    );
    // save user
    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );
    navigate("/dashboard/ideas");
  } catch (error) {
  console.log(error.response); // 
  setError(error.response?.data?.message || "Login failed ");
}
  };

  return (
    <div className='login-container'>
      <div className='card1'>

        <h1 className='welcome-card'>Welcome Back 🌱</h1>

        <form onSubmit={handleSubmit}>

          {/* 🔴 Error show */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <label>Email</label>
          <input 
            type="email"
            name="email"
            placeholder='Enter your email'
            onChange={handleChange}
          />

<label>Password</label>
<div className="password-field">
  <input 
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Enter your password"
    onChange={handleChange}
  />

  <span 
    className="toggle-btn"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? "Hide" : "Show"}
  </span>
</div>

          <button type="submit">Login</button>
        </form>

        <div className='options'>
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <span className='forgot'>Forgot Password?</span>
        </div>

        <p className="signup">
          Don’t have an account? 
          <Link to="/register" className="signup-link"> Register</Link>
        </p>

      </div>
    </div>
  )
}

export default Login