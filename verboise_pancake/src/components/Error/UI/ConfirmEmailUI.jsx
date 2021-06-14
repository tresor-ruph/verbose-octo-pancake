import React from "react";
import { Toast } from "primereact/toast";

const ConfirmEmailUI = (props) => {
  const { fromLoging, email, handleSendLink, returnHeader, toast } = props;
  return (
    <div>
      {returnHeader()}
      <Toast ref={toast} />
      <div style={{ backgroundColor: "white", height: "100vh" }}>
        <div className="main-div">
          <div className="center-div">
            <p className="text-res">Créer un compte</p>
            <hr />

            <p>
              {!fromLoging
                ? `Un e-mail d'activation a été envoyé à ${email}. Veuillez suivre les instructions dans le courrier afin d'activer votre compte.`
                : `Votre compte n'a pas été activé. Veuillez vérifier vos mails pour le lien d'activation`}
            </p>
            {!fromLoging && (
              <p style={{ marginTop: "50px", fontSize: "12px" }}>
                Je n'ai pas reçu l'email ?{" "}
                <a
                  style={{ color: "#42D0ED", textDecoration: "none" }}
                  onClick={() => handleSendLink()}
                >
                  Renvoyer le lien
                </a>
              </p>
            )}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmailUI;
