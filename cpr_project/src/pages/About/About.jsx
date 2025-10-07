import React from 'react'
import "./about.css"

const About = () => {
  return (
    <div className='about-container'>

      {/* Intro / Hero */}

      <div className="emergency-banner">
				<span className="emergency-text">
					🚨 EMERGENCY! 🚨 In case of a serious problem, call immediately by clicking here:
				</span>
				<a href="tel:112" className="emergency-number">112</a>
			</div>

      <div className="hero-content">
        <h1 className="hero-title">About LifeSaver Project</h1>
        <p className="hero-subtitle">
          Empowering everyone with life-saving knowledge through interactive learning, 
          AI-powered assistance, and comprehensive first aid education.
        </p>
      </div>

      {/* Mission */}
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Our Mission</h2>
        </div>
        <div className="mission-content">
          <p className="mission-text">
            Cardiac arrest affects millions globally, with survival rates heavily dependent on immediate CPR intervention. 
            Studies show that brain damage begins after just 5 minutes without oxygen, yet many people lack proper CPR knowledge.
          </p>
          <p className="mission-text">
            <strong>LifeSaver Project</strong> bridges this critical gap by providing accessible, interactive, and comprehensive 
            first aid education that can literally save lives in emergency situations.
          </p>
        </div>
      </div>

      {/* Impact */}
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Our Promise</h2>
        </div>
        <div className="impact-content">
          <div className="impact-grid">
            <div className="impact-item">
              <div className="impact-number">24/7</div>
              <div className="impact-label">Availability</div>
              <div className="impact-description">Always accessible</div>
            </div>
            <div className="impact-item">
              <div className="impact-number">100%</div>
              <div className="impact-label">Privacy Protected</div>
              <div className="impact-description">Anonymous learning</div>
            </div>
          </div>
          <div className="impact-message">
            <p>
              Every minute counts in a cardiac emergency. Our platform ensures that when the moment comes, 
              you'll have the knowledge and confidence to act decisively and save a life.
            </p>
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Key Facts</h2>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-number">5</div>
            <div className="stat-label">Minutes to brain damage</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">10%</div>
            <div className="stat-label">Survival increase per minute</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Free education</div>
          </div>
        </div>
      </div>

      <div className="section-container">
        <div className="mission-content">
          <p className="mission-text">
            <strong>Developed by: Océane XIANG &
            Tony LE TRONG</strong>
          </p>
        </div>
      </div>

    </div>
    
  )
}

export default About

