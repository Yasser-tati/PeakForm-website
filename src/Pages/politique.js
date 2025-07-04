import React from 'react';
import './politique.css';
import SimpleHeader from '../components/Header/SimpleHeader';
import PageFooter from '../components/Footer/PageFooter';

function Politique() {
  return (
    <>
      <SimpleHeader />
      <div className="condition-page">
        <div className="container1">
          <div className="content-container">
            <h1 className="title">Politique de Confidentialité</h1>
            
            <div className="section">
              <h2 className="section-title1">1. Collecte des Informations</h2>
              <p className="text">
                Nous collectons différents types d'informations pour fournir et améliorer nos services. 
                Ces informations peuvent inclure des données personnelles que vous nous fournissez directement 
                ainsi que des données collectées automatiquement lors de votre utilisation de notre site.
              </p>
            </div>

            <div className="section">
              <h2 className="section-title1">2. Utilisation des Informations</h2>
              <p className="text">
                Les informations que nous collectons sont utilisées pour améliorer nos services, 
                personnaliser votre expérience, communiquer avec vous et assurer la sécurité de notre plateforme. 
                Nous ne vendons pas vos informations personnelles à des tiers.
              </p>
            </div>

            <div className="section">
              <h2 className="section-title1">3. Protection des Données</h2>
              <p className="text">
                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées 
                pour protéger vos données personnelles contre tout accès non autorisé, modification, 
                divulgation ou destruction.
              </p>
            </div>

            <div className="section">
              <h2 className="section-title1">4. Cookies et Technologies Similaires</h2>
              <p className="text">
                Nous utilisons des cookies et des technologies similaires pour améliorer votre expérience, 
                analyser le trafic et personnaliser le contenu. Vous pouvez contrôler l'utilisation des 
                cookies via les paramètres de votre navigateur.
              </p>
            </div>

            <div className="section">
              <h2 className="section-title1">5. Vos Droits</h2>
              <p className="text">
                Vous disposez de droits concernant vos données personnelles, notamment le droit d'accès, 
                de rectification, de suppression et d'opposition au traitement. Vous pouvez exercer ces 
                droits en nous contactant.
              </p>
            </div>

            <div className="section">
              <h2 className="section-title1">6. Modifications de la Politique</h2>
              <p className="text">
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
                Les modifications seront publiées sur cette page avec une date de mise à jour.
              </p>
            </div>

            <div className="section">
              <h2 className="section-title1">7. Nous Contacter</h2>
              <p className="text">
                Pour toute question concernant notre politique de confidentialité ou vos données personnelles, 
                n'hésitez pas à nous contacter via notre formulaire de contact ou à l'adresse indiquée.
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

export default Politique; 