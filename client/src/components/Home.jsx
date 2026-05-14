import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
function Home() {
   const [bgIndex, setBgIndex] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, []);
  return (
    <div>
   <div className="dashboard"
  style={{
    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${images[bgIndex]})`
  }}>   
  <div className="overlay">   {/* 🔥 ye add kar */}
    <span className="heading">
  Welcome to <span className="brand">EcoNexus</span>
</span>
    <p>
      Submit ideas, receive AI-driven evaluation, collaborate with institutions, 
      and transform sustainability into measurable impact.
    </p>

    <div className='btn-container'>
      <Link to="/register">
        <button className="btn">Get Started</button>
      </Link>

      <Link to="/submit">
        <button className='btn2'>Explore Dashboard</button>
      </Link>
    </div>
  </div>
</div>

  <div className='data'>

  <div className='data2'>
    
    <h1 className='platform-heading'>Platform Highlights</h1>

    <div className='container-home'>

      <div className='card'>
        <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995" alt="AI" />
        <h3>AI Evaluation</h3>
        <p>Submit your innovative ideas and get instant AI-powered analysis,
        feedback, and improvement suggestions.</p>
      </div>

      <div className='card'>
        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71" alt="Data" />
        <h3>Innovation Tracking</h3>
        <p>Track the progress of your ideas, monitor growth, and visualize
        your innovation journey with analytics.</p>
      </div>

      <div className='card'>
        <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" alt="Collaboration" />
        <h3>Collaboration</h3>
        <p>Connect with colleges, organizations, and experts to turn your
        ideas into real-world solutions.</p>
      </div>

      <div className='card'>
        <img src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6" alt="Sustainability" />
        <h3>Sustainability</h3>
        <p>Focus on eco-friendly solutions and measure the environmental
        impact of your ideas effectively.</p>
      </div>

    </div>

  </div>

</div>
{/* -------------Who can use econexus--------- */}
<div className='data3'>
  <h1 className='innovators'>Built for Innovators, Institutions & Investors</h1>
  <div className='card-7'>
    <div className='card-8'>
      <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" alt="" />
      <h3>Students</h3>
      <div><ul>
        <li>Submit your innovative ideas.</li>
        <li>Get AI-powered evaluation.</li>
        <li>Turn ideas into impact.</li></ul>
        </div>
    </div>
  <div className='card-8'>
  <img src="https://images.unsplash.com/photo-1562774053-701939374585" alt="" />
  <h3>Colleges</h3>

  <ul>
    <li>Collaborate with institutions.</li>
    <li>Track student innovation.</li>
    <li>Build innovation ecosystem.</li>
  </ul>
</div>
    <div className='card-8'>
      <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72" alt="" />
      <h3>Companies</h3>
      <ul>
        <li>Invest in promising ideas.</li>
        <li>Discover talent & projects.</li>
        <li>Drive sustainable growth.</li>
        </ul> 
    </div>
  </div>
  <div className='start-innovation'>
    <h1>Start Your Innovation Journey Today 🚀</h1>
    <p>Join EcoNexus and turn your ideas into real-world impact.</p>
    <Link to="/register">
  <button className='submit-button'>🚀 Register Now</button>
</Link>
  </div>
</div>
    </div>
  )
}

export default Home