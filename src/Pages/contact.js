import React, { useState } from 'react';
import './contact.css';
import SimpleHeader from '../components/Header/SimpleHeader';
import PageFooter from '../components/Footer/PageFooter';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <SimpleHeader />
      <div className="condition-page">
        <div className="container1">
          <div className="content-container">
            <h1 className="title">Contactez-nous</h1>
            
            <div className="section">
              <h2 className="section-title1">Nous sommes à votre écoute</h2>
              <p className="text">
                Notre équipe est disponible pour répondre à toutes vos questions. 
                Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
              </p>
            </div>

            <div className="section">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Nom complet</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Sujet</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                  ></textarea>
                </div>

                <button type="submit" className="submit-button">
                  Envoyer le message
                </button>
              </form>
            </div>

            <div className="section">
              <h2 className="section-title1">Autres moyens de contact</h2>
              <p className="text">
                • Email: support@peakform.com<br />
                • Téléphone: +33 (0)1 23 45 67 89<br />
                • Horaires: Lundi - Vendredi, 9h - 18h
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

export default Contact; 