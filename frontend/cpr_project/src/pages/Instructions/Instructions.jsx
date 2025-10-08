import React from 'react';
import "./instructions.css";
import { Link } from 'react-router-dom';

const Instructions = () => {
  return (
    <div className="instructions-page">

      {/* 🚨 Emergency Banner */}
      <div className="emergency-banner">
        <span>
          🚨 <strong>EMERGENCY!</strong> In case of a serious problem, call immediately:
        </span>
        <a href="tel:112" className="emergency-number">112</a>
      </div>

      {/* 🩺 Main Box */}
      <div className="instructions-box">

        {/* Introduction */}
        <section className="intro-section">
          <h1>First Aid & Emergency Response</h1>
          <p>
            Knowing how to act quickly in an emergency can save a life. Learn essential
            life-saving techniques such as CPR and how to use an AED effectively.
          </p>
        </section>

        {/* Buttons Section */}
        <div className="instruction-container">
          <Link to="/cprinstruction" className="card card-cpr">
            <img src="/images/cpr_logo.png" alt="CPR" className="card-icon" />
            <h2>How to perform CPR</h2>
            <p>(Cardiopulmonary Resuscitation)</p>
          </Link>

          <Link to="/aedinstruction" className="card card-aed">
            <img src="/images/aed_logo.png" alt="AED" className="card-icon" />
            <h2>How to use an AED</h2>
            <p>(Automatic External Defibrillator)</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
