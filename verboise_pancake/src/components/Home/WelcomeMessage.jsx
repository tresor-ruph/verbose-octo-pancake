import { useState } from "react";
import { Button } from "react-bootstrap";
import welcomeImg from "assets/images/welcome.png";
import NewEvent from "../Events/NewEvent";
import "customcss/Welcome.scss";

const WelcomeMessage = ({ userName, handleReload }) => {
  const [showModal, setShowModal] = useState(false);

  const modalOnHide = (x) => {
    setShowModal(false);
    if (x === "reload") handleReload(true);
  };

  const modalOnShow = () => setShowModal(true);

  return (
    <div className="welcome-container">
      {showModal && <NewEvent hide={modalOnHide} show={modalOnShow} />}

      <div className="welcome-card">

        {/* Illustration */}
        <div className="welcome-illustration">
          <img
            src={welcomeImg}
            alt="Illustration de bienvenue"
            loading="lazy"
          />
        </div>

        {/* Texte + CTA */}
        <div className="welcome-text-block">
          <h2 className="welcome-title">Bienvenue {userName} !</h2>

          <p className="welcome-subtitle">
            Créez votre premier événement dès maintenant et engagez votre audience
          </p>

          <Button className="welcome-btn" onClick={modalOnShow}>
            Créer un événement
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
