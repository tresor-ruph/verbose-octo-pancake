import { useState } from "react";
import { Button } from "react-bootstrap";
import NewEvent from "../Events/NewEvent";
import "customcss/Welcome.scss";

const WelcomeMessage = ({ userName, handleReload }) => {
  const [showModal, setShowModal] = useState(false);

  const modalOnHide = (x) => {
    setShowModal(false);
    if (x === "reload") {
      handleReload(true);
    }
  };

  const modalOnShow = () => {
    setShowModal(true);
  };

  return (
    <div className="main-welcome">
      {showModal && <NewEvent hide={modalOnHide} show={modalOnShow} />}
      <div className="p-d-flex p-jc-center">
        <div className=" content p-shadow-6">
          <div className="welcome-sub-content">
            <span className="welcome-title">{`Bienvenue ${userName}  !`}</span>
            <div className="welcome-content">
              Créez votre premier événement maintenant et incluez votre audience
            </div>
            <div className="start-btn">
              <Button
                size="lg"
                className="create-Event-btn"
                onClick={() => modalOnShow()}
              >
                <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  Nouvel événement
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
