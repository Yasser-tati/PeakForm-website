import React, { useState } from "react";
import "./inscription.css";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedCertificate, setUploadedCertificate] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    gender: '',
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
        coachId: formData.coachId || ''
      });
    } else {
      setFormData({
        ...formData,
        coachId: ''
      });
    }
    
    const clearedErrors = { ...errors };
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
        if (!uploadedFile) {
          newErrors.coachId = 'Veuillez télécharger votre document d\'identité';
        }
      }
      
      if (!formData.termsAccepted) {
        newErrors.termsAccepted = 'Vous devez accepter les conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setErrors({
        ...errors,
        coachId: 'Format de fichier non supporté. Utilisez JPG, PNG ou PDF.'
      });
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setErrors({
        ...errors,
        coachId: 'Le fichier est trop volumineux. Taille maximale: 5MB'
      });
      return;
    }

    setUploadedFile(file);
    setErrors({
      ...errors,
      coachId: ''
    });
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  const uploadFileToSupabase = async (file) => {
    try {
      setIsUploading(true);
      
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      
      // Upload file to public bucket
      const { data, error: uploadError } = await supabase.storage
        .from('cin')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error(`Erreur d'upload: ${uploadError.message}`);
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('cin')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('Detailed upload error:', error);
      throw new Error(`Erreur de téléchargement: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCertificateUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setErrors({
        ...errors,
        certificateNumber: 'Format de fichier non supporté. Utilisez JPG, PNG ou PDF.'
      });
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setErrors({
        ...errors,
        certificateNumber: 'Le fichier est trop volumineux. Taille maximale: 5MB'
      });
      return;
    }

    setUploadedCertificate(file);
    setErrors({
      ...errors,
      certificateNumber: ''
    });
  };

  const removeCertificate = () => {
    setUploadedCertificate(null);
  };

  const uploadCertificateToSupabase = async (file) => {
    try {
      setIsUploading(true);
      
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      
      // Upload file to certificate bucket
      const { data, error: uploadError } = await supabase.storage
        .from('certificate')
        .upload(fileName, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error(`Erreur d'upload: ${uploadError.message}`);
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('certificate')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('Detailed upload error:', error);
      throw new Error(`Erreur de téléchargement: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm(2)) {
      try {
        let finalFormData = { ...formData };

        // First, create the user with email verification
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
              date_of_birth: formData.dateOfBirth,
              gender: formData.gender
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`
          }
        });

        if (authError) {
          throw new Error(`Erreur de création du compte: ${authError.message}`);
        }

        // Create user record in the user table
        const { error: userError } = await supabase
          .from('user')
          .insert([
            {
              user_id: authData.user.id,
              Full_name: formData.name,
              email: formData.email,
              birthdate: formData.dateOfBirth,
              gender: formData.gender
            }
          ]);

        if (userError) {
          throw new Error(`Erreur de création du profil utilisateur: ${userError.message}`);
        }

        // If user is a coach and has selected files
        if (isCoach) {
          try {
            let cinUrl = null;
            let certificateUrl = null;

            if (uploadedFile) {
              cinUrl = await uploadFileToSupabase(uploadedFile);
            }
            
            if (uploadedCertificate) {
              certificateUrl = await uploadCertificateToSupabase(uploadedCertificate);
            }
            
            // Create coach record with user ID
            const { error: coachError } = await supabase
              .from('coach')
              .insert([
                { 
                  coach_id: authData.user.id,
                  user_id: authData.user.id,
                  cin: cinUrl,
                  certificate: certificateUrl
                }
              ]);

            if (coachError) {
              console.error('Coach creation error:', coachError);
              throw new Error(`Erreur de création du profil coach: ${coachError.message}`);
            }
          } catch (uploadError) {
            console.error('File upload failed:', uploadError);
            setErrors({
              ...errors,
              coachId: uploadError.message || 'Erreur lors du téléchargement des fichiers. Veuillez réessayer.'
            });
            return;
          }
        }

        // Show success message with email verification instructions
        setFormSubmitted(true);
        
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            dateOfBirth: '',
            password: '',
            confirmPassword: '',
            gender: '',
            coachId: '',
            termsAccepted: false
          });
          setUploadedFile(null);
          setUploadedCertificate(null);
          setCurrentStep(1);
          setFormSubmitted(false);
          setIsCoach(false);
        }, 5000);
      } catch (error) {
        console.error('Form submission error:', error);
        setErrors({
          ...errors,
          coachId: error.message || 'Une erreur est survenue. Veuillez réessayer.'
        });
      }
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
    <div id="inscription" className="insc_page">
      <div className="insc_section-header">
        <div className="insc_line1"></div>
        <h1 className="insc_section-title">Inscription</h1>
        <div className="insc_line1"></div>
      </div>

      <motion.div 
        className="insc_container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="insc_info-graphic">
          <div className="insc_fitness-graphic">
            <div className="insc_graphic-text">
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

        <div className="insc_form">
          <AnimatePresence mode="wait">
            {formSubmitted ? (
              <motion.div 
                className="insc_success-message"
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <div className="insc_success-icon">
                  <FitnessIcon icon="check" />
                </div>
                <h3>Félicitations!</h3>
                <p>
                  {isCoach 
                    ? "Votre compte coach a été créé avec succès! Veuillez vérifier votre email pour activer votre compte."
                    : "Votre compte a été créé avec succès! Veuillez vérifier votre email pour l'activer."}
                </p>
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
                
                <div className="insc_user-type-toggle">
                  <button
                    type="button"
                    className={`insc_toggle-option ${!isCoach ? 'insc_active' : ''}`}
                    onClick={() => toggleUserType('user')}
                  >
                    Utilisateur
                  </button>
                  <button
                    type="button"
                    className={`insc_toggle-option ${isCoach ? 'insc_active' : ''}`}
                    onClick={() => toggleUserType('coach')}
                  >
                    Coach
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {currentStep === 1 ? (
                    <motion.div 
                      className="insc_form-section"
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="insc_section-subtitle">Informations de base</p>
                      
                      <div className="insc_form-progress">
                        <div className={`insc_progress-step ${currentStep >= 1 ? 'insc_active' : ''}`}>1</div>
                        <div className="insc_progress-line">
                          <div className="insc_progress-line-inner"></div>
                        </div>
                        <div className={`insc_progress-step ${currentStep >= 2 ? 'insc_active' : ''}`}>2</div>
                      </div>

                      <div className="insc_form-fields">
                        <div className="insc_input-group">
                          <label className="insc_field-label" htmlFor="name">Nom complet</label>
                          <div className="insc_input-with-icon">
                            <div className="insc_field-icon">
                              <FitnessIcon icon="user" />
                            </div>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Votre nom"
                              className={errors.name ? 'insc_error-input' : ''}
                            />
                          </div>
                          {errors.name && <div className="insc_error-message">{errors.name}</div>}
                        </div>
                        
                        <div className="insc_input-group">
                          <label className="insc_field-label" htmlFor="email">Adresse email</label>
                          <div className="insc_input-with-icon">
                            <div className="insc_field-icon">
                              <FitnessIcon icon="email" />
                            </div>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="exemple@domaine.com"
                              className={errors.email ? 'insc_error-input' : ''}
                            />
                          </div>
                          {errors.email && <div className="insc_error-message">{errors.email}</div>}
                        </div>
                        
                        <div className="insc_input-group">
                          <label className="insc_field-label" htmlFor="dateOfBirth">Date de naissance</label>
                          <div className="insc_input-with-icon">
                            <div className="insc_field-icon">
                              <FitnessIcon icon="calendar" />
                            </div>
                            <input
                              type="date"
                              id="dateOfBirth"
                              name="dateOfBirth"
                              value={formData.dateOfBirth}
                              onChange={handleChange}
                              max={new Date().toISOString().split('T')[0]}
                              className={errors.dateOfBirth ? 'insc_error-input' : ''}
                            />
                          </div>
                          {errors.dateOfBirth && <div className="insc_error-message">{errors.dateOfBirth}</div>}
                        </div>
                      </div>
                      
                      <div className="insc_form-actions">
                        <button 
                          type="button" 
                          className="insc_next-button"
                          onClick={nextStep}
                        >
                          Suivant
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="insc_form-section"
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="insc_section-subtitle">Sécurité et préférences</p>
                      
                      <div className="insc_form-fields">
                        <div className="insc_input-group">
                          <label className="insc_field-label" htmlFor="password">Mot de passe</label>
                          <div className="insc_input-with-icon">
                            <div className="insc_field-icon">
                              <FitnessIcon icon="password" />
                            </div>
                            <div className="insc_password-field">
                              <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Au moins 6 caractères"
                                className={errors.password ? 'insc_error-input' : ''}
                              />
                              <button 
                                type="button" 
                                className="insc_password-toggle" 
                                onClick={togglePasswordVisibility}
                              >
                                {showPassword ? "👁️" : "👁️‍🗨️"}
                              </button>
                            </div>
                          </div>
                          {errors.password && <div className="insc_error-message">{errors.password}</div>}
                        </div>
                        
                        <div className="insc_input-group">
                          <label className="insc_field-label" htmlFor="confirmPassword">Confirmer le mot de passe</label>
                          <div className="insc_input-with-icon">
                            <div className="insc_field-icon">
                              <FitnessIcon icon="password" />
                            </div>
                            <input
                              type={showPassword ? "text" : "password"}
                              id="confirmPassword"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              placeholder="Confirmez votre mot de passe"
                              className={errors.confirmPassword ? 'insc_error-input' : ''}
                            />
                          </div>
                          {errors.confirmPassword && <div className="insc_error-message">{errors.confirmPassword}</div>}
                        </div>
                        
                        <div className="insc_input-group">
                          <label className="insc_field-label">Genre</label>
                          <div className="insc_input-with-icon">
                            <div className="insc_field-icon">
                              <FitnessIcon icon="gender" />
                            </div>
                            <div className="insc_gender-selection">
                              <label className={`insc_gender-option ${formData.gender === 'male' ? 'insc_selected' : ''}`}>
                                <input
                                  type="radio"
                                  name="gender"
                                  value="male"
                                  checked={formData.gender === 'male'}
                                  onChange={handleChange}
                                />
                                <span className="insc_gender-icon">♂</span>
                                <span className="insc_gender-text">Homme</span>
                              </label>
                              <label className={`insc_gender-option ${formData.gender === 'female' ? 'insc_selected' : ''}`}>
                                <input
                                  type="radio"
                                  name="gender"
                                  value="female"
                                  checked={formData.gender === 'female'}
                                  onChange={handleChange}
                                />
                                <span className="insc_gender-icon">♀</span>
                                <span className="insc_gender-text">Femme</span>
                              </label>
                            </div>
                          </div>
                          {errors.gender && <div className="insc_error-message">{errors.gender}</div>}
                        </div>
                        
                        {isCoach && (
                          <>
                            <div className="insc_input-group">
                              <label className="insc_field-label" htmlFor="coachId">Document d'identité</label>
                              <div className="insc_input-with-icon">
                                <div className="insc_field-icon">
                                  <FitnessIcon icon="id" />
                                </div>
                                <div className="insc_file-upload">
                                  <input
                                    type="file"
                                    id="coachId"
                                    name="coachId"
                                    className="insc_file-upload-input"
                                    onChange={handleFileUpload}
                                    accept=".jpg,.jpeg,.png,.pdf"
                                  />
                                  <label htmlFor="coachId" className="insc_file-upload-label">
                                    <span className="insc_file-upload-icon">📄</span>
                                    <span className="insc_file-upload-text">
                                      {uploadedFile ? 'Fichier sélectionné' : 'Cliquez pour télécharger (JPG, PNG, PDF)'}
                                    </span>
                                  </label>
                                  {uploadedFile && (
                                    <div className="insc_file-upload-preview">
                                      {uploadedFile.type.startsWith('image/') ? (
                                        <img src={URL.createObjectURL(uploadedFile)} alt="Preview" />
                                      ) : (
                                        <span className="insc_file-upload-icon">📄</span>
                                      )}
                                      <span className="insc_file-name">{uploadedFile.name}</span>
                                      <button
                                        type="button"
                                        className="insc_remove-file"
                                        onClick={removeFile}
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                              {errors.coachId && <div className="insc_error-message">{errors.coachId}</div>}
                              {isUploading && <div className="insc_error-message">Téléchargement en cours...</div>}
                            </div>
                            
                            <div className="insc_input-group">
                              <label className="insc_field-label" htmlFor="certificateNumber">Certificat (Optionnel)</label>
                              <div className="insc_input-with-icon">
                                <div className="insc_field-icon">
                                  <FitnessIcon icon="certificate" />
                                </div>
                                <div className="insc_file-upload">
                                  <input
                                    type="file"
                                    id="certificateNumber"
                                    name="certificateNumber"
                                    className="insc_file-upload-input"
                                    onChange={handleCertificateUpload}
                                    accept=".jpg,.jpeg,.png,.pdf"
                                  />
                                  <label htmlFor="certificateNumber" className="insc_file-upload-label">
                                    <span className="insc_file-upload-icon">📄</span>
                                    <span className="insc_file-upload-text">
                                      {uploadedCertificate ? 'Fichier sélectionné' : 'Cliquez pour télécharger votre certificat (JPG, PNG, PDF)'}
                                    </span>
                                  </label>
                                  {uploadedCertificate && (
                                    <div className="insc_file-upload-preview">
                                      {uploadedCertificate.type.startsWith('image/') ? (
                                        <img src={URL.createObjectURL(uploadedCertificate)} alt="Preview" />
                                      ) : (
                                        <span className="insc_file-upload-icon">📄</span>
                                      )}
                                      <span className="insc_file-name">{uploadedCertificate.name}</span>
                                      <button
                                        type="button"
                                        className="insc_remove-file"
                                        onClick={removeCertificate}
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                              {errors.certificateNumber && <div className="insc_error-message">{errors.certificateNumber}</div>}
                              {isUploading && <div className="insc_error-message">Téléchargement en cours...</div>}
                            </div>
                          </>
                        )}
                        
                        <div className="insc_input-group insc_terms-checkbox">
                          <label className="insc_checkbox-container">
                            <input
                              type="checkbox"
                              name="termsAccepted"
                              checked={formData.termsAccepted}
                              onChange={handleChange}
                            />
                            <span className="insc_checkmark"></span>
                            <span className="insc_checkbox-label">J'accepte les conditions d'utilisation et la politique de confidentialité</span>
                          </label>
                          {errors.termsAccepted && <div className="insc_error-message">{errors.termsAccepted}</div>}
                        </div>
                      </div>
                      
                      <div className="insc_form-actions">
                        <button 
                          type="button" 
                          className="insc_back-button"
                          onClick={prevStep}
                        >
                          Retour
                        </button>
                        <button 
                          type="button" 
                          className="insc_submit-button"
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
