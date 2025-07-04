import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaInstagram, FaFacebookF, FaXTwitter, FaTiktok, FaDownload } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import MastercardLogo from './imagemastercard.jpg'; // Logo Mastercard
import VisaLogo from './visa-logo.png'; // Logo Visa
import PayPalLogo from './paypal-logo.png'; // Logo PayPal
import iphone from '../Header/telbg.jpg';
import cadre from '../Header/cadre.webp';
import qrCode from '../Header/qr-code.png';

const Footer = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const { t } = useTranslation();
  
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
            <p className="tagline">{t('footer.tagline', 'Votre partenaire fitness personnel')}</p>
          </div>
          <div className="app-message">
            {/* Bouton de téléchargement */}
            <button className="download-button" onClick={() => setPopupOpen(true)}>
              <FaDownload className="download-icon" /> {t('footer.downloadApp', 'Téléchargez l\'application')}
            </button>
          </div>

          {/* Payment Methods Section */}
          <div className="payment-methods">
            <p className="payment-title">{t('footer.securePayment', 'Méthodes de paiement sécurisées')}</p>
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
            <h3 className="footer-title">{t('footer.appTitle', 'L\'application')}</h3>
            <ul className="footer-links">
              <li>
                <a 
                  href="#aboutus" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('aboutus'); }}
                >
                  {t('footer.about', 'À propos')}
                </a>
              </li>
              <li>
                <a 
                  href="#oporunite" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('oporunite'); }}
                >
                  {t('footer.opportunities', 'Opportunités')}
                </a>
              </li>
              <li>
                <a 
                  href="#screen" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('screen'); }}
                >
                  {t('footer.screenshots', 'Captures d\'écran')}
                </a>
              </li>
              <li>
                <a 
                  href="#avis" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('avis'); }}
                >
                  {t('footer.reviews', 'Avis clients')}
                </a>
              </li>
            </ul>
          </div>

          {/* Second "Support" Block */}
          <div className="footer-section">
            <h3 className="footer-title">{t('footer.support', 'Support')}</h3>
            <ul className="footer-links">
              <li><Link to="/aide">{t('footer.helpCenter', 'Centre d\'aide')}</Link></li>
              <li><Link to="/contact">{t('footer.contactUs', 'Contactez-nous')}</Link></li>
              <li><Link to="/faq">{t('footer.faq', 'FAQ')}</Link></li>
              <li><Link to="/guide">{t('footer.userGuide', 'Guide d\'utilisation')}</Link></li>
            </ul>
          </div>
        </div>

        {/* Right Block */}
        <div className="footer-right">
          <div className="legal-section">
            <h3 className="footer-title">{t('footer.legal', 'Légal')}</h3>
            <ul className="footer-links">
              <li><Link to="/condition">{t('footer.terms', 'Conditions d\'utilisation')}</Link></li>
              <li><Link to="/politique">{t('footer.privacy', 'Politique de confidentialité')}</Link></li>
            </ul>
          </div>
          <div className="social-connect">
            <h3 className="social-title">{t('footer.followUs', 'Suivez-nous')}</h3>
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
        <p className="copyright">{t('footer.copyright', '© 2025 PeakForm. Tous droits réservés.')}</p>
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
                  <img src={iphone} alt="App Screenshot" className="iphone-screen1" />
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
    </footer>
  );
};

export default Footer;