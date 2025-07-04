import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { signInUser } from "../../services/authService";
import LoadingSpinner from "../common/LoadingSpinner";
import "./Login.css";

// Reusing the FitnessIcon from inscription.js
const FitnessIcon = ({ icon }) => {
  switch (icon) {
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
    default:
      return null;
  }
};

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Get the return URL from location state or default to /profile
  const from = location.state?.from?.pathname || "/profile";

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      setApiError("");

      try {
        const result = await signInUser(formData.email, formData.password);

        if (result.success) {
          // Navigate to the return URL or profile page
          navigate(from, { replace: true });
        } else {
          setApiError(
            result.error === "Invalid login credentials"
              ? "Email ou mot de passe incorrect"
              : result.error || "Une erreur est survenue lors de la connexion"
          );
        }
      } catch (error) {
        console.error("Login error:", error);
        setApiError("Une erreur est survenue lors de la connexion");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const goToRegister = () => {
    navigate("/inscription");
  };

  return (
    <div className="login-page">
      <div className="section-header">
        <div className="line1"></div>
        <h1 className="section-title">Connexion</h1>
        <div className="line1"></div>
      </div>

      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-form">
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
          >
            <h2>Bienvenue</h2>

            {apiError && <div className="api-error-message">{apiError}</div>}

            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <div className="form-fields">
                <div className="input-group">
                  <label className="field-label" htmlFor="email">
                    Adresse email
                  </label>
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
                      className={errors.email ? "error-input" : ""}
                    />
                  </div>
                  {errors.email && (
                    <div className="error-message">{errors.email}</div>
                  )}
                </div>

                <div className="input-group">
                  <label className="field-label" htmlFor="password">
                    Mot de passe
                  </label>
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
                        placeholder="Votre mot de passe"
                        className={errors.password ? "error-input" : ""}
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
                  {errors.password && (
                    <div className="error-message">{errors.password}</div>
                  )}
                </div>

                <div className="form-actions">
                  <button type="submit" className="login-button">
                    Se connecter
                  </button>
                </div>

                <div className="login-footer">
                  <p>
                    Pas encore de compte ?{" "}
                    <button
                      type="button"
                      className="register-link"
                      onClick={goToRegister}
                    >
                      Inscrivez-vous
                    </button>
                  </p>
                </div>
              </div>
            )}
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login; 