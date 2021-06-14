import React from "react";
import { Button, Alert } from "react-bootstrap";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Password } from "primereact/password";
const ResetPasswordUI = (props) => {
  const {
    MainHeader,
    email,
    toast,
    handleEmail,
    handleReset,
    password1,
    handlePassword1,
    password2,
    handlePassword2,
    updatePassword,
    passwordErr,
    handleFocus,
    reset,
    passwordErr1,
  } = props;

  return (
    <div className="reset-passwd">
      <div>
        {MainHeader()}
        <Toast ref={toast} />
      </div>

      {reset ? (
        <div className="main-div">
          <div className="center-div p-shadow-1">
            <div>
              <p className="text-res">Mot de passe oublié ?</p>
              <span className="textsub-res">
                Pour réinitialiser votre mot de passe, veuillez fournir votre
                adresse mail.
              </span>
            </div>

            <div className="input-div">
              <span className="p-float-label">
                <InputText
                  id="email"
                  value={email}
                  className="input-auth input-auth2 "
                  onChange={(event) => handleEmail(event)}
                />
                <label htmlFor="email" className="label-password">
                  Entrez votre email
                </label>
              </span>
            </div>
            <br />
            <Button
              className="btn-fill pull-right"
              type="submit"
              variant="info"
              onClick={() => handleReset()}
              style={{ backgroundColor: "#00C0F8" }}
            >
              Réinitialiser le mot de passe
            </Button>
          </div>
        </div>
      ) : (
        <div className="main-div p-shadow-1">
          <div className="center-div">
            <div>
              <p className="text-res">Mettez à jour votre mot de passe</p>
              <span>Veuillez entrer votre nouveau mot de passe</span>
            </div>
            <div className="password-div">
              <span className="p-float-label">
                <Password
                  id="passwd1"
                  value={password1}
                  onFocus={() => handleFocus()}
                  onChange={(event) => handlePassword1(event)}
                  feedback={false}
                  toggleMask
                />
                <label htmlFor="password" className="label-password">
                  mot de passe
                </label>
              </span>
            </div>
            {passwordErr1 && (
              <div className="error-div">
                <small id="username2-help error-div" className="p-error">
                  Mot de passe invalide{" "}
                </small>
              </div>
            )}
            <br />

            <div className="password-div">
              <span className="p-float-label">
                <Password
                  id="passwd2"
                  value={password2}
                  onFocus={() => handleFocus()}
                  onChange={(event) => handlePassword2(event)}
                  feedback={false}
                  toggleMask
                />
                <label htmlFor="password" className="label-password">
                  répéter le mot de passe
                </label>
              </span>
            </div>
            {passwordErr && (
              <div className="error-div">
                <small id="username2-help error-div" className="p-error">
                  Les mots de passe doivent être les mêmes{" "}
                </small>
              </div>
            )}
            <br />
            <Button
              className="btn-fill pull-right"
              type="submit"
              variant="info"
              onClick={() => updatePassword()}
            >
              Meettre à jour le mot de passe
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordUI;
