import React from 'react';
import './guide.css';
import SimpleHeader from '../components/Header/SimpleHeader';
import PageFooter from '../components/Footer/PageFooter';

function Guide() {
  return (
    <>
      <SimpleHeader />
      <div className="condition-page">
        <div className="container1">
          <div className="content-container">
            <h1 className="title">Guide d'utilisation</h1>
            
            <div className="section">
              <h2 className="section-title1">Premiers pas</h2>
              <p className="text">
                Bienvenue dans le guide d'utilisation de PeakForm. Ce guide vous aidera à 
                tirer le meilleur parti de notre application. Suivez les étapes ci-dessous 
                pour commencer votre parcours fitness.
              </p>
            </div>

            <div className="section">
              <h2 className="section-title1">1. Configuration du compte</h2>
              <p className="text">
                • Téléchargez l'application depuis l'App Store ou Google Play<br />
                • Créez votre compte avec votre email<br />
                • Complétez votre profil avec vos informations personnelles<br />
                • Définissez vos objectifs de fitness
              </p>
            </div>

            <div className="section">
              <h2 className="section-title1">2. Personnalisation du programme</h2>
              <p className="text">
                • Choisissez votre niveau (débutant, intermédiaire, avancé)<br />
                • Sélectionnez vos préférences d'entraînement<br />
                • Définissez votre disponibilité hebdomadaire<br />
                • Personnalisez vos exercices selon vos besoins
              </p>
            </div>

            <div className="section">
              <h2 className="section-title1">3. Utilisation quotidienne</h2>
              <p className="text">
                • Consultez votre programme d'entraînement<br />
                • Suivez vos séances guidées<br />
                • Enregistrez vos performances<br />
                • Visualisez vos progrès dans les statistiques
              </p>
            </div>

            <div className="section">
              <h2 className="section-title1">4. Fonctionnalités avancées</h2>
              <p className="text">
                • Connectez vos appareils de fitness<br />
                • Rejoignez des défis communautaires<br />
                • Partagez vos réussites<br />
                • Accédez aux programmes spéciaux
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

export default Guide; 