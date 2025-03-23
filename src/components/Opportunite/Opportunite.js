import React, { useEffect, useRef } from 'react';
import './Opportunite.css';
import icon1 from './icons/icon1.png';
import icon2 from './icons/icon2.png';
import icon3 from './icons/icon3.png';
import icon4 from './icons/icon4.png';
import icon5 from './icons/icon5.png';
import icon6 from './icons/icon6.png';
import icon7 from './icons/icon7.png';
import icon8 from './icons/icon8.png';

const goals = [
  {
    title: 'Entraînement Intensif',
    description: 'Idéal pour ceux qui veulent repousser leurs limites et améliorer leur endurance physique tout en renforçant leur corps.',
    icon: icon2,
    isImage: true
  },
  {
    title: 'Gain de Force',
    description: 'Un programme conçu pour augmenter votre puissance musculaire et vous aider à soulever des charges plus lourdes.',
    icon: icon1,
    isImage: true
  },
  {
    title: 'Sculpture du Corps',
    description: 'Pour ceux qui souhaitent affiner leur silhouette en développant des muscles toniques et bien définis.',
    icon: icon3,
    isImage: true
  },
  {
    title: 'Conditionnement Physique',
    description: 'Un entraînement complet pour améliorer votre forme générale et renforcer vos muscles de manière équilibrée.',
    icon: icon4,
    isImage: true
  },
  {
    title: 'Développement Musculaire',
    description: 'Pour maximiser la croissance musculaire tout en maintenant un pourcentage de graisse corporelle faible.',
    icon: icon5,
    isImage: true
  },
  {
    title: 'Nutrition',
    description: 'Associez un programme de renforcement musculaire à un plan nutritionnel adapté pour optimiser vos gains et accélérer votre récupération.',
    icon: icon6,
    isImage: true
  },
  {
    title: 'Tonification Musculaire',
    description: 'Parfait pour raffermir les muscles et obtenir un corps plus sculpté sans prendre trop de volume.',
    icon: icon7,
    isImage: true
  },
  {
    title: 'Endurance et Résistance',
    description: 'Améliorez votre endurance musculaire pour tenir plus longtemps et récupérer plus rapidement.',
    icon: icon8,
    isImage: true
  }
];

const Opportunite = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.goal-card');
      const windowHeight = window.innerHeight;
      
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < windowHeight * 0.85;
        
        if (isVisible) {
          setTimeout(() => {
            el.classList.add('fade-in');
          }, index * 100); // Staggered animation
        }
      });
    };

    // Initial check
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="oporunite" className="fitness-container" ref={sectionRef}>
      <div className="section-header" data-aos="fade-up">
        <div className="line"></div>
        <h2 className="section-title">Défiez Vos Limites</h2>
        <div className="line"></div>
      </div>
      
      <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
        pour obtenir les meilleurs résultats
      </p>

      <div className="goals-container">
        {goals.map((goal, index) => (
          <div 
            key={index} 
            className="goal-card"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="goal-icon">
              {goal.isImage ? (
                <img src={goal.icon} alt={goal.title} className="goal-icon-img" />
              ) : (
                <span>{goal.icon}</span>
              )}
            </div>
            
            <h3 className="goal-title">{goal.title}</h3>
            <p className="goal-description">{goal.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Opportunite;
