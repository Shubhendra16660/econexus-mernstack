import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  // email validation
  const validateEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    // 🔴 VALIDATIONS

    if (!name || !email || !password || !confirmPassword) {
      return setError("All fields are required ❌");
    }

    if (name.length < 3) {
      return setError("Name must be at least 3 characters ");
    }

    if (!validateEmail(email)) {
      return setError("Invalid email format ");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters ");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match ❌");
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/register",
        { name, email, password }
      );

      alert("Account created successfully ✅");

      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed ❌");
    }
  };

  return (
    <div className='container'>
      <div className='auth-card'>

        <h1 className='create-account'>Create Account 🌱</h1>

        <form onSubmit={handleSubmit}>

          {error && <p style={{color:"red"}}>{error}</p>}

          <label>Full Name</label>
          <input 
            type="text" 
            name="name"
            placeholder='Enter your name..'
            onChange={handleChange}
          />

          <label>Email</label>
          <input 
            type="email"
            name="email"
            placeholder='Enter your email..'
            onChange={handleChange}
          />

          <label>Password</label>
          <div className="password-box">
            <input 
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder='Enter your password'
              onChange={handleChange}
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <label>Confirm Password</label>
          <input 
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={handleChange}
          />

          <button type="submit">Create Account</button>

        </form>

        <p className="signup">
          Already have an account? 
          <span onClick={() => navigate("/login")}> Login here</span>
        </p>  

      </div>
    </div>
  )
}

export default Register;