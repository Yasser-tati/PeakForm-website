import React, { useState } from "react";
import "./Avis.css";
import Alex from "./image/Alex.jpg"
import Antoine from "./image/Antoine.webp"
import Élodie from "./image/Élodie.avif"
import Isabelle from "./image/Isabelle.avif"
import lucas from "./image/lucas.jpg"
import sarah from "./image/sarah.jpeg"

const Avis = () => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(true);
  };

  return (
    <div id="avis" className="main-container">
      <div className="section-header">
        <div className="line"></div>
        <h2 className="section-title">Témoignages</h2>
        <div className="line"></div>
      </div>
      <div className="avis-container">
        {/* Featured Review (Top Card) */}
        <div className="featured-review">
          <div className="quote-icon">"</div>
          <p>
            Très satisfait de l'application ! Elle me permet d'organiser mes séances et de donner des retours instantanés à mes clients. Le suivi des progrès est précis et motivant pour eux, c'est un excellent outil pour ma pratique.
          </p>
          <div className="featured-user">
            <img
              src={Alex}
              alt="Alex"
              className="featured-avatar"
            />
            <div className="user-info">
              <span className="featured-name">Alex</span>
              <span className="featured-handle">@Alex_Coach</span>
            </div>
          </div>
        </div>

        {/* 2 Reviews Below (Faded) */}
        <div className="reviews-row">
          <div className="review-card secondary">
            <p>
              “L'application est géniale ! Elle est facile à utiliser et les programmes sont super bien détaillés. 
              J'apprécie particulièrement de pouvoir suivre mes progrès au fil du temps et de recevoir des notifications motivantes.”
            </p>
            <div className="review-user">
              <img
                src={Élodie}
                alt="Thomas B."
                className="user-avatar"
              />
              <div>
                <span className="review-name">
                Élodie
                </span>
                <span className="review-handle">@Elodie_World</span>
              </div>
            </div>
          </div>

          <div className="review-card secondary">
            <p>
              “Très bonne expérience avec cette app ! Elle me permet de rester motivé et de suivre mes séances de manière structurée. 
              Les rappels réguliers sont très utiles pour ne jamais manquer une session.”
            </p>
            <div className="review-user">
              <img
                src={Antoine}
                alt="Fatima"
                className="user-avatar"
              />
              <div>
                <span className="review-name">Antoine</span>
                <span className="review-handle">@Antoine</span>
              </div>
            </div>
          </div>
        </div>

        {/* Show More Button */}
        {!showMore && (
          <div className="show-more-btn">
            <button onClick={handleShowMore}>Afficher plus de témoignages</button>
          </div>
        )}

        {/* 3 More Reviews (Appear After Click) */}
        {showMore && (
          <div className="reviews-row">
            <div className="review-card secondary">
              <p>
                “L'application est très bien conçue et intuitive. Elle me permet de suivre facilement les progrès de mes clients et d'adapter 
                leurs entraînements en temps réel. J'adore l'interface simple et claire.”
              </p>
              <div className="review-user">
                <img
                  src={sarah}
                  alt="Jean D."
                  className="user-avatar"
                />
                <div>
                  <span className="review-name">Sarah </span>
                  <span className="review-handle">@SarahCoach</span>
                </div>
              </div>
            </div>

            <div className="review-card secondary">
              <p>
                “L'application est bien conçue, avec des exercices adaptés à mon niveau. 
                J'apprécie particulièrement la fonctionnalité pour poser des questions à mon coach directement via l'app.”
              </p>
              <div className="review-user">
                <img
                  src={lucas}
                  alt="Sophie L."
                  className="user-avatar"
                />
                <div>
                  <span className="review-name">Lucas </span>
                  <span className="review-handle">@LucasFitnessGoals</span>
                </div>
              </div>
            </div>

            <div className="review-card secondary">
              <p>
                “Application pratique. J'adore pouvoir voir mes résultats, et l'interface est très fluide. 
                C'est un excellent moyen de rester engagée dans mes entraînements, surtout avec les conseils de mon coach.”
              </p>
              <div className="review-user">
                <img
                  src={Isabelle}
                  alt="Marie K."
                  className="user-avatar"
                />
                <div>
                  <span className="review-name">Isabelle </span>
                  <span className="review-handle">@Isabel-le</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Avis;
