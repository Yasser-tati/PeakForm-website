import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from './logo-Photoroom.png';
import qrCode from './qr-code.png';
import { FaBars, FaTimes, FaDownload, FaUserPlus } from 'react-icons/fa';
import iphone from './telbg.jpg';
import cadre from './cadre.webp';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

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
                  À PROPOS
                </a>
              </li>
              <li>
                <a 
                  href="#oporunite" 
                  className={activeSection === 'oporunite' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); scrollToSection('oporunite'); }}
                >
                  OPPORTUNITÉS
                </a>
              </li>
              <li>
                <a 
                  href="#screen" 
                  className={activeSection === 'screen' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); scrollToSection('screen'); }}
                >
                  NOTRE APPLICATION
                </a>
              </li>
              <li>
                <a 
                  href="#avis" 
                  className={activeSection === 'avis' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); scrollToSection('avis'); }}
                >
                  TÉMOIGNAGES
                </a>
              </li>
              <li className="main-button">
                <a className='button-download'
                  href="#download" 
                  onClick={(e) => { e.preventDefault(); setPopupOpen(true); }}
                >
                  <FaDownload style={{ marginRight: '3px', fontSize: '11px' }} /> Télécharger
                </a>
              </li>
              <li className="main-button">
                <a 
                  href="#inscription" 
                  className={`${activeSection === 'inscription' ? 'active' : ''} button-download`}
                  onClick={(e) => { e.preventDefault(); scrollToSection('inscription'); }}
                >
                  <FaUserPlus style={{ marginRight: '3px', fontSize: '11px' }} /> S'inscrire
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
    </>
  );
};

export default Header;
