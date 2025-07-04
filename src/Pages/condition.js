import React from 'react';
import './condition.css';
import SimpleHeader from '../components/Header/SimpleHeader';
import PageFooter from '../components/Footer/PageFooter';

function Condition() {
  return (
    <>
      <SimpleHeader />
      <div className="condition-page">
        <div className="container1">
          <div className="content-container">
            <h1 className="title">Conditions d'utilisation</h1>
            
            <div className="section">
              <h2 className="section-title1">1. Acceptation des conditions</h2>
              <p className="text">
                En utilisant cette application, vous acceptez d'être lié par les présentes conditions d'utilisation. 
                Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser l'application.
              </p>
            </div>

            <div className="section">
              <h2 className="section-title1">2. Utilisation de l'application</h2>
              <p className="text">
                Vous vous engagez à utiliser l'application uniquement à des fins légales et de manière à ne 
                pas restreindre ni inhiber l'utilisation et la jouissance de l'application par un tiers.
              </p>
            </div>

            <div className="section">
              <h2 className="section-title1">3. Propriété intellectuelle</h2>
              <p className="text">
                Tous les droits de propriété intellectuelle relatifs à l'application et à son contenu appartiennent 
                à [Nom de votre entreprise] ou à ses concédants de licence.
              </p>
            </div>

            <div className="section">
              <h2 className="section-title1">4. Confidentialité</h2>
              <p className="text">
                Votre utilisation de l'application est également soumise à notre politique de confidentialité, 
                qui décrit comment nous collectons, utilisons et partageons vos informations personnelles.
              </p>
            </div>

            <div className="section">
              <h2 className="section-title1">5. Limitation de responsabilité</h2>
              <p className="text">
                Dans la mesure permise par la loi, [Nom de votre entreprise] ne sera pas responsable des dommages 
                directs, indirects, accessoires, consécutifs ou punitifs résultant de votre utilisation ou de 
                votre incapacité à utiliser l'application.
              </p>
            </div>

            <div className="section">
              <h2 className="section-title1">6. Modifications des conditions</h2>
              <p className="text">
                Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment. 
                Les modifications entrent en vigueur dès leur publication sur l'application.
              </p>
            </div>

            <div className="section">
              <h2 className="section-title1">7. Loi applicable</h2>
              <p className="text">
                Les présentes conditions sont régies et interprétées conformément aux lois de [votre pays], 
                sans égard aux principes de conflits de lois.
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

export default Condition;
