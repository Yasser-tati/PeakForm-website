import React, { useState } from "react";
import "./inscription.css";
import { motion, AnimatePresence } from "framer-motion";

// Fitness-themed icon component
const FitnessIcon = ({ icon }) => {
  switch (icon) {
    case 'user':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#6a5acd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="#6a5acd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'email':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#6a5acd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 6L12 13L2 6" stroke="#6a5acd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'password':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="#6a5acd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="#6a5acd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 16.5C12.8284 16.5 13.5 15.8284 13.5 15C13.5 14.1716 12.8284 13.5 12 13.5C11.1716 13.5 10.5 14.1716 10.5 15C10.5 15.8284 11.1716 16.5 12 16.5Z" fill="#6a5acd"/>
        </svg>
      );
    case 'fitness':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.5 6.5L17.5 17.5" stroke="#6a5acd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.5 3.5L3.5 8.5" stroke="#6a5acd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15.5 3.5L20.5 8.5" stroke="#6a5acd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.5 20.5L3.5 15.5" stroke="#6a5acd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15.5 20.5L20.5 15.5" stroke="#6a5acd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20.5 8.5L15.5 3.5C14.95 2.95 14.05 2.95 13.5 3.5L8.5 8.5M15.5 15.5L20.5 20.5" stroke="#6a5acd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.5 15.5L8.5 20.5C9.05 21.05 9.95 21.05 10.5 20.5L15.5 15.5" stroke="#6a5acd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'check':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'certificate':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="#6a5acd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="#6a5acd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'id':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z" stroke="#6a5acd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 11C9.10457 11 10 10.1046 10 9C10 7.89543 9.10457 7 8 7C6.89543 7 6 7.89543 6 9C6 10.1046 6.89543 11 8 11Z" stroke="#6a5acd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 11H16.01" stroke="#6a5acd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 11H13.01" stroke="#6a5acd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 14H13.01" stroke="#6a5acd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 14H16.01" stroke="#6a5acd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 15C5 14.4477 5.44772 14 6 14H10C10.5523 14 11 14.4477 11 15V16C11 16.5523 10.5523 17 10 17H6C5.44772 17 5 16.5523 5 16V15Z" stroke="#6a5acd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'calendar':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#6a5acd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 2V6" stroke="#6a5acd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 2V6" stroke="#6a5acd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 10H21" stroke="#6a5acd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'gender':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 14C14.7614 14 17 11.7614 17 9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9C7 11.7614 9.23858 14 12 14Z" stroke="#6a5acd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 18H8C5.79086 18 4 19.7909 4 22H20C20 19.7909 18.2091 18 16 18Z" stroke="#6a5acd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return null;
  }
};

const Inscription = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isCoach, setIsCoach] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    gender: '',
    certificateNumber: '',
    coachId: '',
    termsAccepted: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const toggleUserType = (type) => {
    setIsCoach(type === 'coach');
    
    if (type === 'coach') {
      setFormData({
        ...formData,
        certificateNumber: formData.certificateNumber || '',
        coachId: formData.coachId || ''
      });
    } else {
      setFormData({
        ...formData,
        certificateNumber: '',
        coachId: ''
      });
    }
    
    const clearedErrors = { ...errors };
    delete clearedErrors.certificateNumber;
    delete clearedErrors.coachId;
    setErrors(clearedErrors);
  };

  const validateForm = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Le nom est requis';
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'L\'email est requis';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Format d\'email invalide';
      }
      
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = 'La date de naissance est requise';
      } else {
        // Check if user is at least 16 years old
        const birthDate = new Date(formData.dateOfBirth);
        const today = new Date();
        const minAge = 18;
        const minAgeDate = new Date(
          today.getFullYear() - minAge,
          today.getMonth(),
          today.getDate()
        );
        
        if (birthDate > minAgeDate) {
          newErrors.dateOfBirth = 'Vous devez avoir au moins 18 ans';
        }
      }
    } else if (step === 2) {
      if (!formData.password) {
        newErrors.password = 'Le mot de passe est requis';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Veuillez confirmer le mot de passe';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      }
      
      if (!formData.gender) {
        newErrors.gender = 'Veuillez sélectionner votre genre';
      }
      
      if (isCoach) {
        if (!formData.certificateNumber) {
          newErrors.certificateNumber = 'Le numéro de certificat est requis';
        }
        
        if (!formData.coachId) {
          newErrors.coachId = 'L\'identifiant de coach est requis';
        }
      }
      
      if (!formData.termsAccepted) {
        newErrors.termsAccepted = 'Vous devez accepter les conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm(2)) {
      console.log('Form submitted successfully:', formData);
      setFormSubmitted(true);
      
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          dateOfBirth: '',
          password: '',
          confirmPassword: '',
          gender: '',
          certificateNumber: '',
          coachId: '',
          termsAccepted: false
        });
        setCurrentStep(1);
        setFormSubmitted(false);
        setIsCoach(false);
      }, 5000);
    }
  };

  const nextStep = () => {
    if (validateForm(1)) {
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div id="inscription" className="inscription-page">
      <div className="section-header">
        <div className="line1"></div>
        <h1 className="section-title">Inscription</h1>
        <div className="line1"></div>
      </div>

      <motion.div 
        className="inscription-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="info-graphic">
          <div className="fitness-graphic">
            <div className="graphic-text">
              <h3>Votre parcours fitness</h3>
              <ul>
              <li><span>📋</span> Programmes d'entraînement personnalisés</li>
              <li><span>🥗</span> Accompagnement nutritionnel expert</li>
              <li><span>📈</span> Analyse et suivi de performance</li>
              <li><span>⚡</span> Séances d'entraînement haute intensité</li>
              <li><span>🔥</span> Optimisation de la dépense énergétique</li>
              <li><span>⏳</span> Planification flexible adaptée à vos disponibilités</li>
              <li><span>🎯</span> Objectifs stratégiques et mesurables</li>
              <li><span>💬</span> Assistance et coaching en ligne</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="inscription-form">
          <AnimatePresence mode="wait">
            {formSubmitted ? (
              <motion.div 
                className="success-message"
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <div className="success-icon">
                  <FitnessIcon icon="check" />
                </div>
                <h3>Félicitations!</h3>
                <p>Votre compte {isCoach ? 'coach' : 'utilisateur'} a été créé avec succès. Bienvenue dans votre parcours de fitness!</p>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2>
                  Rejoignez-nous
                </h2>
                
                <div className="user-type-toggle">
                  <button
                    type="button"
                    className={`toggle-option ${!isCoach ? 'active' : ''}`}
                    onClick={() => toggleUserType('user')}
                  >
                    Utilisateur
                  </button>
                  <button
                    type="button"
                    className={`toggle-option ${isCoach ? 'active' : ''}`}
                    onClick={() => toggleUserType('coach')}
                  >
                    Coach
                  </button>
                </div>

                <div className="form-progress">
                  <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>1</div>
                  <div className="progress-line">
                    <div className="progress-line-inner"></div>
                  </div>
                  <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>2</div>
                </div>

                <AnimatePresence mode="wait">
                  {currentStep === 1 ? (
                    <motion.div 
                      className="form-section"
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="section-subtitle">Informations de base</p>
                      
                      <div className="form-fields">
                        <div className="input-group">
                          <label className="field-label" htmlFor="name">Nom complet</label>
                          <div className="input-with-icon">
                            <div className="field-icon">
                              <FitnessIcon icon="user" />
                            </div>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Votre nom"
                              className={errors.name ? 'error-input' : ''}
                            />
                          </div>
                          {errors.name && <div className="error-message">{errors.name}</div>}
                        </div>
                        
                        <div className="input-group">
                          <label className="field-label" htmlFor="email">Adresse email</label>
                          <div className="input-with-icon">
                            <div className="field-icon">
                              <FitnessIcon icon="email" />
                            </div>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="exemple@domaine.com"
                              className={errors.email ? 'error-input' : ''}
                            />
                          </div>
                          {errors.email && <div className="error-message">{errors.email}</div>}
                        </div>
                        
                        <div className="input-group">
                          <label className="field-label" htmlFor="dateOfBirth">Date de naissance</label>
                          <div className="input-with-icon">
                            <div className="field-icon">
                              <FitnessIcon icon="calendar" />
                            </div>
                            <input
                              type="date"
                              id="dateOfBirth"
                              name="dateOfBirth"
                              value={formData.dateOfBirth}
                              onChange={handleChange}
                              max={new Date().toISOString().split('T')[0]}
                              className={errors.dateOfBirth ? 'error-input' : ''}
                            />
                          </div>
                          {errors.dateOfBirth && <div className="error-message">{errors.dateOfBirth}</div>}
                        </div>
                      </div>
                      
                      <div className="form-actions">
                        <button 
                          type="button" 
                          className="next-button"
                          onClick={nextStep}
                        >
                          Suivant
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="form-section"
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="section-subtitle">Sécurité et préférences</p>
                      
                      <div className="form-fields">
                        <div className="input-group">
                          <label className="field-label" htmlFor="password">Mot de passe</label>
                          <div className="input-with-icon">
                            <div className="field-icon">
                              <FitnessIcon icon="password" />
                            </div>
                            <div className="password-field">
                              <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Au moins 6 caractères"
                                className={errors.password ? 'error-input' : ''}
                              />
                              <button 
                                type="button" 
                                className="password-toggle" 
                                onClick={togglePasswordVisibility}
                              >
                                {showPassword ? "👁️" : "👁️‍🗨️"}
                              </button>
                            </div>
                          </div>
                          {errors.password && <div className="error-message">{errors.password}</div>}
                        </div>
                        
                        <div className="input-group">
                          <label className="field-label" htmlFor="confirmPassword">Confirmer le mot de passe</label>
                          <div className="input-with-icon">
                            <div className="field-icon">
                              <FitnessIcon icon="password" />
                            </div>
                            <input
                              type={showPassword ? "text" : "password"}
                              id="confirmPassword"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              placeholder="Confirmez votre mot de passe"
                              className={errors.confirmPassword ? 'error-input' : ''}
                            />
                          </div>
                          {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                        </div>
                        
                        <div className="input-group">
                          <label className="field-label">Genre</label>
                          <div className="input-with-icon">
                            <div className="field-icon">
                              <FitnessIcon icon="gender" />
                            </div>
                            <div className="gender-selection">
                              <label className={`gender-option ${formData.gender === 'male' ? 'selected' : ''}`}>
                                <input
                                  type="radio"
                                  name="gender"
                                  value="male"
                                  checked={formData.gender === 'male'}
                                  onChange={handleChange}
                                />
                                <span className="gender-icon">♂</span>
                                <span className="gender-text">Homme</span>
                              </label>
                              <label className={`gender-option ${formData.gender === 'female' ? 'selected' : ''}`}>
                                <input
                                  type="radio"
                                  name="gender"
                                  value="female"
                                  checked={formData.gender === 'female'}
                                  onChange={handleChange}
                                />
                                <span className="gender-icon">♀</span>
                                <span className="gender-text">Femme</span>
                              </label>
                            </div>
                          </div>
                          {errors.gender && <div className="error-message">{errors.gender}</div>}
                        </div>
                        
                        {isCoach && (
                          <>
                            <div className="input-group">
                              <label className="field-label" htmlFor="certificateNumber">Numéro de certificat</label>
                              <div className="input-with-icon">
                                <div className="field-icon">
                                  <FitnessIcon icon="certificate" />
                                </div>
                                <input
                                  type="text"
                                  id="certificateNumber"
                                  name="certificateNumber"
                                  value={formData.certificateNumber}
                                  onChange={handleChange}
                                  placeholder="Entrez votre numéro de certificat"
                                  className={errors.certificateNumber ? 'error-input' : ''}
                                />
                              </div>
                              {errors.certificateNumber && <div className="error-message">{errors.certificateNumber}</div>}
                            </div>
                            
                            <div className="input-group">
                              <label className="field-label" htmlFor="coachId">Identifiant de coach</label>
                              <div className="input-with-icon">
                                <div className="field-icon">
                                  <FitnessIcon icon="id" />
                                </div>
                                <input
                                  type="text"
                                  id="coachId"
                                  name="coachId"
                                  value={formData.coachId}
                                  onChange={handleChange}
                                  placeholder="Entrez votre ID de coach"
                                  className={errors.coachId ? 'error-input' : ''}
                                />
                              </div>
                              {errors.coachId && <div className="error-message">{errors.coachId}</div>}
                            </div>
                          </>
                        )}
                        
                        <div className="input-group terms-checkbox">
                          <label className="checkbox-container">
                            <input
                              type="checkbox"
                              name="termsAccepted"
                              checked={formData.termsAccepted}
                              onChange={handleChange}
                            />
                            <span className="checkmark"></span>
                            <span className="checkbox-label">J'accepte les conditions d'utilisation et la politique de confidentialité</span>
                          </label>
                          {errors.termsAccepted && <div className="error-message">{errors.termsAccepted}</div>}
                        </div>
                      </div>
                      
                      <div className="form-actions">
                        <button 
                          type="button" 
                          className="back-button"
                          onClick={prevStep}
                        >
                          Retour
                        </button>
                        <button 
                          type="button" 
                          className="submit-button"
                          onClick={handleSubmit}
                        >
                          {isCoach ? "Devenir coach" : "Commencer mon parcours fitness"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Inscription;
