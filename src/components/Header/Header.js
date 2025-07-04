import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from './logo-Photoroom.png';
import qrCode from './qr-code.png';
import { FaBars, FaTimes, FaDownload, FaUserPlus } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import iphone from './telbg.jpg';
import cadre from './cadre.webp';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
      
      // Track active section while scrolling
      const sections = ['aboutus', 'oporunite', 'screen', 'avis', 'inscription'];
      let currentSection = '';
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
          }
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setMenuOpen(false); // Close mobile menu when clicking a link
    }
  };

  return (
    <>
      <header className={`header-area ${scrolling ? 'shrink' : ''}`}>
        <div className="container">
          <div className="main-nav">
            <div className="logo-container">
              <img src={logo} alt="Peak Form Logo" className={`logo-img ${scrolling ? 'shrink-logo' : ''}`} />
              <a href="/" className="logo">Peak<em>Form</em></a>
            </div>
            
            <ul className={`nav ${menuOpen ? 'active' : ''}`}>
              <li>
                <a 
                  href="#aboutus" 
                  className={activeSection === 'aboutus' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); scrollToSection('aboutus'); }}
                >
                  {t('navigation.about', 'À PROPOS')}
                </a>
              </li>
              <li>
                <a 
                  href="#oporunite" 
                  className={activeSection === 'oporunite' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); scrollToSection('oporunite'); }}
                >
                  {t('navigation.opportunities', 'OPPORTUNITÉS')}
                </a>
              </li>
              <li>
                <a 
                  href="#screen" 
                  className={activeSection === 'screen' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); scrollToSection('screen'); }}
                >
                  {t('navigation.ourApp', 'NOTRE APPLICATION')}
                </a>
              </li>
              <li>
                <a 
                  href="#avis" 
                  className={activeSection === 'avis' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); scrollToSection('avis'); }}
                >
                  {t('navigation.testimonials', 'TÉMOIGNAGES')}
                </a>
              </li>
              <li className="language-selector">
                <button 
                  onClick={() => changeLanguage('en')} 
                  className={i18n.language === 'en' ? 'lang-active' : ''}
                >
                  EN
                </button>
                <span>|</span>
                <button 
                  onClick={() => changeLanguage('fr')} 
                  className={i18n.language === 'fr' ? 'lang-active' : ''}
                >
                  FR
                </button>
              </li>
              <li className="main-button">
                <a className='button-download'
                  href="#download" 
                  onClick={(e) => { e.preventDefault(); setPopupOpen(true); }}
                >
                  <FaDownload style={{ marginRight: '3px', fontSize: '11px' }} /> {t('buttons.download', 'Télécharger')}
                </a>
              </li>
              <li className="main-button">
                <a 
                  href="#inscription" 
                  className={`${activeSection === 'inscription' ? 'active' : ''} button-download`}
                  onClick={(e) => { e.preventDefault(); scrollToSection('inscription'); }}
                >
                  <FaUserPlus style={{ marginRight: '3px', fontSize: '11px' }} /> {t('buttons.register', 'S\'inscrire')}
                </a>
              </li>
            </ul>
            
            <div 
              className="menu-icon" 
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </div>
          </div>
        </div>
      </header>

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
    </>
  );
};

export default Header;
