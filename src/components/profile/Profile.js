import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { getUserProfile, getCoachProfile } from "../../services/userService";
import LoadingSpinner from "../common/LoadingSpinner";
import "./Profile.css";

const Profile = () => {
  const { user, isCoach } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        if (isCoach) {
          const result = await getCoachProfile(user.id);
          if (result.success) {
            setProfileData(result.data);
          } else {
            setError("Impossible de charger les données du profil");
          }
        } else {
          const result = await getUserProfile(user.id);
          if (result.success) {
            setProfileData(result.data);
          } else {
            setError("Impossible de charger les données du profil");
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Une erreur est survenue lors du chargement du profil");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchProfileData();
    }
  }, [user, isCoach]);

  if (isLoading) {
    return (
      <div className="profile-page">
        <div className="section-header">
          <div className="line1"></div>
          <h1 className="section-title">Mon Profil</h1>
          <div className="line1"></div>
        </div>
        <div className="profile-loading">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <div className="section-header">
          <div className="line1"></div>
          <h1 className="section-title">Mon Profil</h1>
          <div className="line1"></div>
        </div>
        <div className="profile-error">
          <p>{error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return null;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="profile-page">
      <div className="section-header">
        <div className="line1"></div>
        <h1 className="section-title">Mon Profil</h1>
        <div className="line1"></div>
      </div>

      <motion.div
        className="profile-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="profile-header">
          <div className="profile-avatar">
            {profileData.Full_name ? profileData.Full_name.charAt(0).toUpperCase() : (
              isCoach && profileData.user ? profileData.user.Full_name.charAt(0).toUpperCase() : "U"
            )}
          </div>
          <div className="profile-title">
            <h2>{isCoach ? "Profil Coach" : "Profil Utilisateur"}</h2>
            <p>{profileData.email || (isCoach && profileData.user ? profileData.user.email : "")}</p>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h3>Informations Personnelles</h3>
            <div className="profile-info-grid">
              <div className="profile-info-item">
                <span className="info-label">Nom complet</span>
                <span className="info-value">
                  {profileData.Full_name || (isCoach && profileData.user ? profileData.user.Full_name : "")}
                </span>
              </div>
              <div className="profile-info-item">
                <span className="info-label">Email</span>
                <span className="info-value">
                  {profileData.email || (isCoach && profileData.user ? profileData.user.email : "")}
                </span>
              </div>
              <div className="profile-info-item">
                <span className="info-label">Date de naissance</span>
                <span className="info-value">
                  {profileData.birthdate 
                    ? formatDate(profileData.birthdate) 
                    : (isCoach && profileData.user && profileData.user.birthdate 
                        ? formatDate(profileData.user.birthdate) 
                        : "Non spécifié")}
                </span>
              </div>
              <div className="profile-info-item">
                <span className="info-label">Genre</span>
                <span className="info-value">
                  {profileData.gender === "male" 
                    ? "Homme" 
                    : profileData.gender === "female" 
                      ? "Femme" 
                      : (isCoach && profileData.user && profileData.user.gender === "male" 
                          ? "Homme" 
                          : isCoach && profileData.user && profileData.user.gender === "female" 
                            ? "Femme" 
                            : "Non spécifié")}
                </span>
              </div>
            </div>
          </div>

          {isCoach && (
            <div className="profile-section">
              <h3>Informations Coach</h3>
              <div className="profile-info-grid">
                <div className="profile-info-item">
                  <span className="info-label">Numéro de certificat</span>
                  <span className="info-value">{profileData.certificate || "Non spécifié"}</span>
                </div>
                <div className="profile-info-item">
                  <span className="info-label">CIN</span>
                  <span className="info-value">{profileData.cin || "Non spécifié"}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile; 