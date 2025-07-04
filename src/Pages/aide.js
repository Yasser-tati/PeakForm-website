import React from 'react';
import './aide.css';
import SimpleHeader from '../components/Header/SimpleHeader';
import PageFooter from '../components/Footer/PageFooter';

function Aide() {
  return (
    <>
      <SimpleHeader />
      <div className="condition-page">
        <div className="container1">
          <div className="content-container">
            <h1 className="title">Centre d'aide</h1>
            
            <div className="section">
              <h2 className="section-title1">Comment commencer</h2>
              <p className="text">
                Bienvenue dans notre centre d'aide. Nous sommes là pour vous guider et répondre à toutes vos questions.
                Découvrez ci-dessous les principales ressources à votre disposition.
              </p>
            </div>

            <div className="section">
              <h2 className="section-title1">Ressources disponibles</h2>
              <p className="text">
                • Guide d'utilisation complet<br />
                • FAQ détaillée<br />
                • Tutoriels vidéo<br />
                • Support technique personnalisé
              </p>
            </div>

            <div className="section">
              <h2 className="section-title1">Support technique</h2>
              <p className="text">
                Notre équipe de support technique est disponible 24/7 pour vous aider à résoudre 
                tout problème technique que vous pourriez rencontrer.
              </p>
            </div>

            <div className="section">
              <h2 className="section-title1">Assistance rapide</h2>
              <p className="text">
                Pour une assistance immédiate, consultez notre FAQ ou contactez-nous directement 
                via notre formulaire de contact.
              </p>
            </div>

            <div className="last-updated">
              Dernière mise à jour: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
      <PageFooter />
    </>
  );
}

export default Aide; 