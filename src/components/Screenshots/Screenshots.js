import React, { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import "./Screenshots.css";
import img1 from "./pics/image1.jpg";
import img2 from "./pics/image2.jpg";
import img3 from "./pics/image3.jpg";
import img4 from "./pics/image4.jpg";
import img5 from "./pics/image5.jpg";
import img6 from "./pics/image6.jpg";
import img7 from "./pics/image7.jpg";
import img8 from "./pics/image8.jpg";
import img9 from "./pics/image9.jpg";
import img10 from "./pics/image10.jpg";
import img11 from "./pics/image11.jpg";
import img12 from "./pics/image12.jpg";
import img13 from "./pics/1p.jpg";
import img14 from "./pics/2p.jpg";
import img15 from "./pics/3p.jpg";
import img16 from "./pics/4p.jpg";
import img17 from "./pics/5p.jpg";
import img18 from "./pics/6p.jpg";

const Screenshots = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const images = [img1, img2, img3, img13, img14, img15, img16, img17, img18, img10, img11, img12];
  const { t } = useTranslation();
  
  // Define scroll function with useCallback
  const scroll = useCallback((direction) => {
    if (scrollRef.current) {
      const scrollAmount = 260; // Adjusted for smaller image width (240px) + gap (20px)
      const newScrollPosition = scrollRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
      
      scrollRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
      
      // Update active index
      const newIndex = direction === "left" 
        ? Math.max(0, activeIndex - 1) 
        : Math.min(images.length - 1, activeIndex + 1);
      
      setActiveIndex(newIndex);
    }
  }, [activeIndex, images.length]);
  
  // Scroll to specific image when clicking on dot - wrapped in useCallback
  const scrollToImage = useCallback((index) => {
    if (scrollRef.current) {
      const scrollAmount = 260 * index;
      scrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  }, []);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        scroll("left");
      } else if (e.key === "ArrowRight") {
        scroll("right");
      } else if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen, scroll]);
  
  // Auto-scroll slides every 5 seconds when not in fullscreen
  useEffect(() => {
    if (!isFullscreen) {
      const interval = setInterval(() => {
        if (activeIndex < images.length - 1) {
          scroll("right");
        } else {
          // Reset to first image
          scrollToImage(0);
        }
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [activeIndex, images.length, isFullscreen, scroll, scrollToImage]);
  
  // Handle touch events for swiping
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      scroll("right");
    }
    
    if (touchStart - touchEnd < -50) {
      // Swipe right
      scroll("left");
    }
  };
  
  const toggleFullscreen = (index) => {
    setActiveIndex(index);
    setIsFullscreen(!isFullscreen);
  };

  return (
    <section id="screen" className="screenshots">
      <div className="section-header">
        <div className="line"></div>
        <h2 className="section-title">{t('screenshots.title', 'NOTRE APPLICATION')}</h2>
        <div className="line"></div>
      </div>
      
      <p className="section-subtitle">{t('screenshots.subtitle', 'Découvrez l\'interface intuitive de notre application')}</p>
      
      {isFullscreen && (
        <div className="fullscreen-overlay">
          <button 
            className="close-fullscreen" 
            onClick={() => setIsFullscreen(false)}
            aria-label={t('screenshots.close', 'Fermer l\'aperçu')}
          >
            ×
          </button>
          <button 
            className="fullscreen-nav left" 
            onClick={() => activeIndex > 0 && setActiveIndex(activeIndex - 1)}
            aria-label={t('screenshots.previous', 'Image précédente')}
            disabled={activeIndex === 0}
          >
            <span className="arrow-icon">&#10094;</span>
          </button>
          <div className="fullscreen-content">
            <img 
              src={images[activeIndex]} 
              alt={t('screenshots.altText', 'Screenshot {{number}}', { number: activeIndex + 1 })} 
              className="fullscreen-image"
            />
            <div className="fullscreen-counter">
              {activeIndex + 1} / {images.length}
            </div>
          </div>
          <button 
            className="fullscreen-nav right" 
            onClick={() => activeIndex < images.length - 1 && setActiveIndex(activeIndex + 1)}
            aria-label={t('screenshots.next', 'Image suivante')}
            disabled={activeIndex === images.length - 1}
          >
            <span className="arrow-icon">&#10095;</span>
          </button>
        </div>
      )}
      
      <div className="screenshots-container">
        <button 
          className="nav-arrow left" 
          onClick={() => scroll("left")}
          aria-label={t('screenshots.previous', 'Image précédente')}
          disabled={activeIndex === 0}
        >
          <span className="arrow-icon">&#10094;</span>
        </button>
        
        <div 
          className="screenshots-wrapper" 
          ref={scrollRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {images.map((img, index) => (
            <div 
              key={index} 
              className={`screenshot-item ${index === activeIndex ? 'active' : ''}`}
              onClick={() => toggleFullscreen(index)}
            >
              <img 
                src={img} 
                alt={t('screenshots.altText', 'Screenshot {{number}}', { number: index + 1 })} 
                loading={index > 2 ? "lazy" : "eager"}
              />
              <div className="screenshot-overlay">
                <span className="view-icon">🔍</span>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="nav-arrow right" 
          onClick={() => scroll("right")}
          aria-label={t('screenshots.next', 'Image suivante')}
          disabled={activeIndex === images.length - 1}
        >
          <span className="arrow-icon">&#10095;</span>
        </button>
      </div>
      
      <div className="navigation-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`nav-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => scrollToImage(index)}
            aria-label={t('screenshots.goToImage', 'Aller à l\'image {{number}}', { number: index + 1 })}
          />
        ))}
      </div>
    </section>
  );
};

export default Screenshots;
