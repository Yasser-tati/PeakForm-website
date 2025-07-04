import React from 'react';
import './faq.css';
import SimpleHeader from '../components/Header/SimpleHeader';
import PageFooter from '../components/Footer/PageFooter';

function FAQ() {
  return (
    <>
      <SimpleHeader />
      <div className="condition-page">
        <div className="container1">
          <div className="content-container">
            <h1 className="title">Questions Fréquentes (FAQ)</h1>
            
            <div className="section">
              <h2 className="section-title1">À propos de PeakForm</h2>
              <p className="text">
                <strong>Q: Qu'est-ce que PeakForm ?</strong><br />
                R: PeakForm est une application de fitness personnalisée qui vous aide à atteindre vos objectifs de forme physique avec des programmes sur mesure.
              </p>
              <p className="text">
                <strong>Q: Comment fonctionne l'application ?</strong><br />
                R: L'application crée un programme personnalisé basé sur vos objectifs, votre niveau de forme et vos préférences d'entraînement.
              </p>
            </div>

            <div className="section">
              <h2 className="section-title1">Abonnement et Tarifs</h2>
              <p className="text">
                <strong>Q: Quels sont les différents types d'abonnement ?</strong><br />
                R: Nous proposons des abonnements mensuels, trimestriels et annuels avec différents avantages.
              </p>
              <p className="text">
                <strong>Q: Puis-je annuler mon abonnement ?</strong><br />
                R: Oui, vous pouvez annuler votre abonnement à tout moment depuis votre compte.
              </p>
            </div>

            <div className="section">
              <h2 className="section-title1">Fonctionnalités</h2>
              <p className="text">
                <strong>Q: L'application fonctionne-t-elle hors ligne ?</strong><br />
                R: Oui, vous pouvez télécharger vos séances pour les utiliser hors ligne.
              </p>
              <p className="text">
                <strong>Q: Puis-je personnaliser mes exercices ?</strong><br />
                R: Absolument ! Vous pouvez adapter chaque exercice selon vos besoins et préférences.
              </p>
            </div>

            <div className="section">
              <h2 className="section-title1">Support et Aide</h2>
              <p className="text">
                <strong>Q: Comment puis-je obtenir de l'aide ?</strong><br />
                R: Vous pouvez contacter notre support 24/7 via le formulaire de contact ou consulter notre guide d'utilisation.
              </p>
              <p className="text">
                <strong>Q: Y a-t-il une communauté d'utilisateurs ?</strong><br />
                R: Oui, nous avons une communauté active où vous pouvez partager vos expériences et obtenir des conseils.
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

export default FAQ; 