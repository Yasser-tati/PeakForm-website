import React, { useState } from 'react';
import './Footer.css';
import { FaInstagram, FaFacebookF, FaXTwitter, FaTiktok, FaDownload } from 'react-icons/fa6';
import MastercardLogo from './imagemastercard.jpg'; // Logo Mastercard
import VisaLogo from './visa-logo.png'; // Logo Visa
import PayPalLogo from './paypal-logo.png'; // Logo PayPal
import iphone from '../Header/telbg.jpg';
import cadre from '../Header/cadre.webp';
import qrCode from '../Header/qr-code.png';

const Footer = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left Block */}
        <div className="footer-left">
          <div className="logo-container">
            <h2 className="brand-name">Peak<span className="highlight">Form</span></h2>
            <p className="tagline">Votre partenaire fitness personnel</p>
          </div>
          <div className="app-message">
            {/* Bouton de téléchargement */}
            <button className="download-button" onClick={() => setPopupOpen(true)}>
              <FaDownload className="download-icon" /> Téléchargez l'application
            </button>
          </div>

          {/* Payment Methods Section */}
          <div className="payment-methods">
            <p className="payment-title">Méthodes de paiement sécurisées</p>
            <div className="payment-logos">
              <img src={MastercardLogo} alt="Mastercard" className="payment-logo" />
              <img src={VisaLogo} alt="Visa" className="payment-logo" />
              <img src={PayPalLogo} alt="PayPal" className="payment-logo" />
            </div>
          </div>
        </div>

        {/* Center Block */}
        <div className="footer-center">
          {/* First "Application" Block */}
          <div className="footer-section">
            <h3 className="footer-title">L'application</h3>
            <ul className="footer-links">
              <li>
                <a 
                  href="#aboutus" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('aboutus'); }}
                >
                  À propos
                </a>
              </li>
              <li>
                <a 
                  href="#oporunite" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('oporunite'); }}
                >
                  Opportunités
                </a>
              </li>
              <li>
                <a 
                  href="#screen" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('screen'); }}
                >
                  Captures d'écran
                </a>
              </li>
              <li>
                <a 
                  href="#avis" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('avis'); }}
                >
                  Avis clients
                </a>
              </li>
            </ul>
          </div>

          {/* Second "Support" Block */}
          <div className="footer-section">
            <h3 className="footer-title">Support</h3>
            <ul className="footer-links">
              <li><a href="#help">Centre d'aide</a></li>
              <li><a href="#contact">Contactez-nous</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#guide">Guide d'utilisation</a></li>
            </ul>
          </div>
        </div>

        {/* Right Block */}
        <div className="footer-right">
          <div className="legal-section">
            <h3 className="footer-title">Légal</h3>
            <ul className="footer-links">
              <li><a href="/conditions">Conditions d'utilisation</a></li>
              <li><a href="#privacy">Politique de confidentialité</a></li>
            </ul>
          </div>
          <div className="social-connect">
            <h3 className="social-title">Suivez-nous</h3>
            <div className="social-icons">
              <a href="#instagram" aria-label="Instagram"><FaInstagram /></a>
              <a href="#facebook" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#twitter" aria-label="Twitter"><FaXTwitter /></a>
              <a href="#tiktok" aria-label="TikTok"><FaTiktok /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <hr className="footer-line" />
        <p className="copyright">© 2025 PeakForm. Tous droits réservés.</p>
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
                  <img src={iphone} alt="App Screenshot" className="iphone-screen" />
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
    </footer>
  );
};

export default Footer;