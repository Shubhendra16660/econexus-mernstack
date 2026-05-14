import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate();

  // 🔹 token check
  const token = localStorage.getItem("token");

  // 🔹 logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className='navbar'>

      <div className='logo'>
        <div>🌱</div>
        <h2>EcoNexus</h2>
      </div>

      <ul className='nav-links'>

        <li>
          <NavLink to="/" end>Home</NavLink>
        </li>

        {/* ❌ Login/Register hide after login */}
        {!token && (
          <>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>

            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </>
        )}

        {/* ✅ Show after login */}
        {token && (
          <>
            <li>
              <NavLink to="/submit">Submit Idea</NavLink>
            </li>

            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>

            <li>
              <button 
                onClick={handleLogout}
                className="logout-btn"
              >
                Logout
              </button>
            </li>
          </>
        )}

      </ul>

    </nav>
  )
}

export default Header;