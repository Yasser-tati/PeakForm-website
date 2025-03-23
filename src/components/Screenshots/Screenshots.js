import React, { useState, useRef } from "react";
import "./Screenshots.css";
import img1 from "./pics/image1.jpg";
import img2 from "./pics/image2.jpg";
import img3 from "./pics/image3.jpg";
import img4 from "./pics/image4.jpg";
import img5 from "./pics/image5.jpg";

const Screenshots = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [img1, img2, img3, img4, img5];
  
  const scroll = (direction) => {
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
  };
  
  // Scroll to specific image when clicking on dot
  const scrollToImage = (index) => {
    if (scrollRef.current) {
      const scrollAmount = 260 * index;
      scrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  return (
    <section id="screen" className="screenshots">
      <div className="section-header">
        <div className="line"></div>
        <h2 className="section-title">NOTRE APPLICATION</h2>
        <div className="line"></div>
      </div>
      
      <p className="section-subtitle">Découvrez l'interface intuitive de notre application</p>
      
      <div className="screenshots-container">
        <button 
          className="nav-arrow left" 
          onClick={() => scroll("left")}
          aria-label="Image précédente"
        >
          <span className="arrow-icon">&#10094;</span>
        </button>
        
        <div className="screenshots-wrapper" ref={scrollRef}>
          {images.map((img, index) => (
            <div key={index} className={`screenshot-item ${index === activeIndex ? 'active' : ''}`}>
              <img src={img} alt={`Screenshot ${index + 1}`} />
            </div>
          ))}
        </div>
        
        <button 
          className="nav-arrow right" 
          onClick={() => scroll("right")}
          aria-label="Image suivante"
        >
          <span className="arrow-icon">&#10095;</span>
        </button>
      </div>
      
      <div className="dot-indicators">
        {images.map((_, index) => (
          <span 
            key={index} 
            className={`dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => scrollToImage(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Screenshots;
