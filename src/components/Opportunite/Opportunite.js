import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './Opportunite.css';
import icon1 from './icons/icon1.png';
import icon2 from './icons/icon2.png';
import icon3 from './icons/icon3.png';
import icon4 from './icons/icon4.png';
import icon5 from './icons/icon5.png';
import icon6 from './icons/icon6.png';
import icon7 from './icons/icon7.png';
import icon8 from './icons/icon8.png';

const Opportunite = () => {
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  const goals = [
    {
      title: t('opportunite.goals.intensive.title', 'Entraînement Intensif'),
      description: t('opportunite.goals.intensive.description', 'Idéal pour ceux qui veulent repousser leurs limites et améliorer leur endurance physique tout en renforçant leur corps.'),
      icon: icon2,
      isImage: true
    },
    {
      title: t('opportunite.goals.strength.title', 'Gain de Force'),
      description: t('opportunite.goals.strength.description', 'Un programme conçu pour augmenter votre puissance musculaire et vous aider à soulever des charges plus lourdes.'),
      icon: icon1,
      isImage: true
    },
    {
      title: t('opportunite.goals.sculpting.title', 'Sculpture du Corps'),
      description: t('opportunite.goals.sculpting.description', 'Pour ceux qui souhaitent affiner leur silhouette en développant des muscles toniques et bien définis.'),
      icon: icon3,
      isImage: true
    },
    {
      title: t('opportunite.goals.conditioning.title', 'Conditionnement Physique'),
      description: t('opportunite.goals.conditioning.description', 'Un entraînement complet pour améliorer votre forme générale et renforcer vos muscles de manière équilibrée.'),
      icon: icon4,
      isImage: true
    },
    {
      title: t('opportunite.goals.muscular.title', 'Développement Musculaire'),
      description: t('opportunite.goals.muscular.description', 'Pour maximiser la croissance musculaire tout en maintenant un pourcentage de graisse corporelle faible.'),
      icon: icon5,
      isImage: true
    },
    {
      title: t('opportunite.goals.nutrition.title', 'Nutrition'),
      description: t('opportunite.goals.nutrition.description', 'Associez un programme de renforcement musculaire à un plan nutritionnel adapté pour optimiser vos gains et accélérer votre récupération.'),
      icon: icon6,
      isImage: true
    },
    {
      title: t('opportunite.goals.toning.title', 'Tonification Musculaire'),
      description: t('opportunite.goals.toning.description', 'Parfait pour raffermir les muscles et obtenir un corps plus sculpté sans prendre trop de volume.'),
      icon: icon7,
      isImage: true
    },
    {
      title: t('opportunite.goals.endurance.title', 'Endurance et Résistance'),
      description: t('opportunite.goals.endurance.description', 'Améliorez votre endurance musculaire pour tenir plus longtemps et récupérer plus rapidement.'),
      icon: icon8,
      isImage: true
    }
  ];

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
        <h2 className="section-title">{t('opportunite.title', 'Défiez Vos Limites')}</h2>
        <div className="line"></div>
      </div>
      
      <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
        {t('opportunite.subtitle', 'pour obtenir les meilleurs résultats')}
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
