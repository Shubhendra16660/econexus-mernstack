import React from 'react'
import { Link } from "react-router-dom";
import { FaPhone, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <div className='footer'>

      <div className='innovation'>
        <div>
          <span className='logo1'>🌱 </span> 
          <h3>Green Innovation</h3>
        </div>
        <p>
          Empowering innovators and institutions to build a sustainable future through AI-driven collaboration.
        </p>
      </div> 

      <div className='quicklinks'>
        <h3>Quick Links</h3>
        <ul className='quicklink'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/submit">Submit Idea</Link></li>
          <li>Dashboard</li>
        </ul>
      </div>

      <div>
        <h3>Platform</h3>
        <ul className='platform'>
          <li>AI Evaluation</li>
          <li>Innovation Tracking</li>
          <li>Institutional Access</li>
        </ul>
      </div>

      <div>
        <h3>Contact</h3>

        <p className="contact">
          <FaPhone />
          <a href="tel:+917398439250">+91 7398439250</a>
        </p>

        <p className="contact">
          <FaEnvelope />
          <a href="mailto:chashubhendra@gmail.com">
            chashubhendra@gmail.com
          </a>
        </p>

      </div>

    </div>
  )
}

export default Footer;