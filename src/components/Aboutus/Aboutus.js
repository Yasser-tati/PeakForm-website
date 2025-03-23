import React, { useState } from "react";
import "./Aboutus.css";
import phoneScreen from "./telbg.jpg"; 
import cadre from "./cadre.webp"; 
import bgvideo from "./backgroundgym.mp4";
import qrCode from './qr-code.png';


const AboutUs = () => {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <section id="aboutus" className="about-us">
      <div className="bgvideo">
        <video autoPlay muted loop id="backgroundvideo">
          <source src={bgvideo} type="video/mp4" />
        </video>
      </div>
      <div className="about-content">
        <p className="small-title">Application mobile</p>
        <h1 className="main-title">
          <span className="fitness">Peak</span>
          <span className="online">Form</span>
        </h1>
        <p className="subtitle">Sculptez votre corps de rêve !</p>
        <button className="download-btn1" onClick={() => setPopupOpen(true)}>
          Téléchargez l'application
        </button>
      </div>
      <div className="about-image-container">
        <img src={cadre} alt="iPhone Frame" className="phone-frame" />
        <img src={phoneScreen} alt="App Screenshot" className="phone-screen" />
      </div>

      {popupOpen && (
        <div className="popup-overlay" onClick={() => setPopupOpen(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="close-btn" 
              onClick={() => setPopupOpen(false)}
              aria-label="Fermer"
            >
              ×
            </button>
            <div className="popup-body">
              <div className="popup-left">
                <div className="iphone-container">
                  <img src={cadre} alt="iPhone Frame" className="iphone-frame" />
                  <img src={phoneScreen} alt="App Screenshot" className="iphone-screen" />
                </div>
              </div>
              <div className="popup-right">
                <h3>Téléchargez PeakForm</h3>
                <p>Scannez le code QR pour télécharger l'application</p>
                <img src={qrCode} alt="QR Code" className="qr-image" />
                <div className="separator">
                  <div className="line1"></div>
                  <p>ou</p>
                  <div className="line1"></div>
                </div>
                <a 
                  href="https://play.google.com/store/apps" 
                  className="lien" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Télécharger sur Google Play
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutUs;
