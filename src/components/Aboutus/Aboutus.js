import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import "./Aboutus.css";
import phoneScreen from "./telbg.jpg"; 
import cadre from "./cadre.webp"; 
import bgvideo from "./backgroundgym.mp4";
import qrCode from './qr-code.png';

// Simple SVG icons as components
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const FireIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
  </svg>
);

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="20" x2="12" y2="10"></line>
    <line x1="18" y1="20" x2="18" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="16"></line>
  </svg>
);

const AppleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"></path>
  </svg>
);

const GooglePlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 20.5l11.2-11L5 3.5v17zm11.2-11l3.8 5.5-3.8 2.6V9.5zm-12-4l4.9 4.9L5 14.5l4.9 4.9 4.5-3-9.8-11z"></path>
  </svg>
);

const AboutUs = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const features = [
    { 
      icon: <FireIcon />, 
      title: t('aboutUs.features.personalized.title', 'Programmes personnalisés'), 
      description: t('aboutUs.features.personalized.description', 'Entraînements adaptés à vos objectifs') 
    },
    { 
      icon: <HeartIcon />, 
      title: t('aboutUs.features.health.title', 'Suivi de santé'), 
      description: t('aboutUs.features.health.description', 'Mesurez vos progrès quotidiens') 
    },
    { 
      icon: <ChartIcon />, 
      title: t('aboutUs.features.analytics.title', 'Analyses détaillées'), 
      description: t('aboutUs.features.analytics.description', 'Optimisez vos performances') 
    }
  ];

  return (
    <section id="aboutus" className="about-us">
      <div className="bgvideo">
        <video autoPlay muted loop id="backgroundvideo">
          <source src={bgvideo} type="video/mp4" />
        </video>
        <div className="overlay-gradient"></div>
      </div>
      
      <div className="about-container">
        <motion.div 
          className="about-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <motion.p 
            className="small-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('aboutUs.mobileApp', 'Application mobile')}
          </motion.p>
          <motion.h1 
            className="main-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="fitness">Peak</span>
            <span className="online">Form</span>
          </motion.h1>
          <motion.p 
            className="subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {t('aboutUs.slogan', 'Sculptez votre corps de rêve !')}
          </motion.p>
          
          <motion.div 
            className="features-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {features.map((feature, index) => (
              <div className="feature-item" key={index}>
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-text">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
          
          <motion.button 
            className="download-btn1"
            onClick={() => setPopupOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <span className="download-icon"><DownloadIcon /></span> {t('aboutUs.downloadApp', 'Téléchargez l\'application')}
          </motion.button>
        </motion.div>
        
        <motion.div 
          className="about-image-container"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 30 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="phone-glow"></div>
          <img src={cadre} alt="iPhone Frame" className="phone-frame" />
          <img src={phoneScreen} alt="App Screenshot" className="phone-screen" />
        </motion.div>
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
                  <img src={cadre} alt="iPhone Frame" className="iphone-frame1" />
                  <img src={phoneScreen} alt="App Screenshot" className="iphone-screen1" />
                </div>
              </div>
              <div className="popup-right">
                <h3>{t('popup.downloadTitle', 'Téléchargez PeakForm')}</h3>
                <p>{t('popup.scanQR', 'Scannez le code QR pour télécharger l\'application')}</p>
                <img src={qrCode} alt="QR Code" className="qr-image" />
                <div className="separator">
                  <div className="line1"></div>
                  <p>{t('popup.or', 'ou')}</p>
                  <div className="line1"></div>
                </div>
                <a 
                  href="https://play.google.com/store/apps" 
                  className="lien" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {t('popup.downloadGoogle', 'Télécharger sur Google Play')}
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
