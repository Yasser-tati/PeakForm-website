import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Footer.css';
import { FaInstagram, FaFacebookF, FaXTwitter, FaTiktok, FaDownload } from 'react-icons/fa6';
import MastercardLogo from './imagemastercard.jpg';
import VisaLogo from './visa-logo.png';
import PayPalLogo from './paypal-logo.png';
import iphone from '../Header/telbg.jpg';
import cadre from '../Header/cadre.webp';
import qrCode from '../Header/qr-code.png';

const PageFooter = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const headerOffset = 100;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleApplicationLink = (sectionId) => {
    if (location.pathname !== '/') {
      // First scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Then navigate
      setTimeout(() => {
        navigate('/', { replace: true });
        
        // After navigation, scroll to section
        setTimeout(() => {
          scrollToSection(sectionId);
        }, 100);
      }, 300);
    } else {
      scrollToSection(sectionId);
    }
  };

  const handlePageLink = (path) => {
    // Navigate to the new page
    navigate(path, { replace: true });
    
    // Force scroll to top immediately
    window.scrollTo(0, 0);
  };

  // Add smooth scroll behavior to the page
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);
  
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
            <button className="download-button" onClick={() => setPopupOpen(true)}>
              <FaDownload className="download-icon" /> Téléchargez l'application
            </button>
          </div>

          {/* Payment Methods Section */}
          <div className="payment-methods">
            <p className="payment-title">Méthodes de paiement sécurisées</p>
            <div className="payment-logos">
              <div className="logo-container">
                <img src={MastercardLogo} alt="Mastercard" className="payment-logo" />
              </div>
              <div className="logo-container">
                <img src={VisaLogo} alt="Visa" className="payment-logo" />
              </div>
              <div className="logo-container">
                <img src={PayPalLogo} alt="PayPal" className="payment-logo" />
              </div>
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
                <Link 
                  to="/" 
                  onClick={(e) => { e.preventDefault(); handleApplicationLink('aboutus'); }}
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link 
                  to="/" 
                  onClick={(e) => { e.preventDefault(); handleApplicationLink('oporunite'); }}
                >
                  Opportunités
                </Link>
              </li>
              <li>
                <Link 
                  to="/" 
                  onClick={(e) => { e.preventDefault(); handleApplicationLink('screen'); }}
                >
                  Captures d'écran
                </Link>
              </li>
              <li>
                <Link 
                  to="/" 
                  onClick={(e) => { e.preventDefault(); handleApplicationLink('avis'); }}
                >
                  Avis clients
                </Link>
              </li>
            </ul>
          </div>

          {/* Second "Support" Block */}
          <div className="footer-section">
            <h3 className="footer-title">Support</h3>
            <ul className="footer-links">
              <li><Link to="/aide" onClick={() => handlePageLink('/aide')}>Centre d'aide</Link></li>
              <li><Link to="/contact" onClick={() => handlePageLink('/contact')}>Contactez-nous</Link></li>
              <li><Link to="/faq" onClick={() => handlePageLink('/faq')}>FAQ</Link></li>
              <li><Link to="/guide" onClick={() => handlePageLink('/guide')}>Guide d'utilisation</Link></li>
            </ul>
          </div>
        </div>

        {/* Right Block */}
        <div className="footer-right">
          <div className="legal-section">
            <h3 className="footer-title">Légal</h3>
            <ul className="footer-links">
              <li><Link to="/condition" onClick={() => handlePageLink('/condition')}>Conditions d'utilisation</Link></li>
              <li><Link to="/politique" onClick={() => handlePageLink('/politique')}>Politique de confidentialité</Link></li>
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

export default PageFooter; 