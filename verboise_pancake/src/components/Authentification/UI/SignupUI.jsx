import React from "react";
import { Button } from "react-bootstrap";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { useHistory } from "react-router";
import { Toast } from "primereact/toast";

const SignupUI = (props) => {
  const {
    MainHeader,
    showModal,
    returnTermsAndCondition,
    loginImage,
    email,
    handleEmailFocus,
    handleEmailBlur,
    handleEmail,
    emailErr,
    username,
    handleUserFocus,
    handleUserBlur,
    handleUsername,
    password,
    handlePasswordFocus,
    handlePasswordBlur,
    handlePassword,
    password2,
    handlePassword2Focus,
    handlePassword2Blur,
    handlePassword2,
    disabled2,
    handleCheckBox,
    check,
    handleTerms,
    handlePrivacy,
    handleSubmit,
    userErr,
    disabled,
    checkBoxErr,
    toast,
  } = props;

  const history = useHistory();

  return (
    <div className="main-sigin">
      {showModal && returnTermsAndCondition}
      {MainHeader}
      <Toast ref={toast} />
      <div className="d-lg-flex half ">
        <div className="bg order-2 order-md-1 login-i left">
          <img src={loginImage} width="80%" className="login-i " />
        </div>
        <div className="contents order-1 order-md-2 ">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-7">
                <div className="mb-4">
                  <span className="auth-txt">Créer un compte</span>
                </div>

                <div className="input-div">
                  <span className="p-float-label">
                    <InputText
                      id="email"
                      value={email}
                      className="input-auth"
                      onFocus={handleEmailFocus}
                      onBlur={handleEmailBlur}
                      onChange={(event) => handleEmail(event)}
                    />
                    <label htmlFor="email" className="label-password">
                      Email
                    </label>
                  </span>
                </div>
                {emailErr && (
                  <div className="error-div">
                    <small id="username2-help error-div" className="p-error">
                      Email non valide
                    </small>
                  </div>
                )}

                <br />

                <div className="input-div-2">
                  <span className="p-float-label">
                    <InputText
                      id="username"
                      value={username}
                      className="input-auth"
                      onFocus={handleUserFocus}
                      onBlur={handleUserBlur}
                      onChange={(event) => handleUsername(event)}
                    />
                    <label htmlFor="email" className="label-password">
                      Nom d'utilisateur
                    </label>
                  </span>
                </div>
                {userErr && (
                  <div className="error-div">
                    <small id="username2-help error-div" className="p-error">
                      Nom d'utilisateur invalide.{" "}
                    </small>
                  </div>
                )}

                <br />

                <div className="password-div">
                  <span className="p-float-label">
                    <Password
                      className="test-pass"
                      value={password}
                      onFocus={handlePasswordFocus}
                      onBlur={handlePasswordBlur}
                      onChange={(event) => handlePassword(event)}
                      feedback={false}
                      toggleMask
                    />
                    <label htmlFor="password" className="label-password">
                      Mot de passe
                    </label>
                  </span>
                </div>
                {disabled && (
                  <div className="error-div">
                    <small id="username2-help error-div" className="p-error">
                      Mot de passe invalide.{" "}
                    </small>
                  </div>
                )}
                <br />

                <div className="password-div">
                  <span className="p-float-label">
                    <Password
                      className="test-pass"
                      value={password2}
                      onFocus={handlePassword2Focus}
                      onBlur={handlePassword2Blur}
                      onChange={(event) => handlePassword2(event)}
                      disabled={disabled}
                      feedback={false}
                      toggleMask
                    />
                    <label htmlFor="password" className="label-password">
                      Confirmer le mot de passe
                    </label>
                  </span>
                </div>
                {disabled2 && (
                  <div className="error-div">
                    <small id="username2-help error-div" className="p-error">
                      Les mots de passe doivent être identiques.
                    </small>
                  </div>
                )}
                <br />
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="defaultUnchecked"
                    onChange={(event) => handleCheckBox(event)}
                    ckecked={check}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="defaultUnchecked"
                  >
                    <span className="caption">
                      J'accepte les{" "}
                      <a
                        href="#"
                        style={{ color: "#42D0ED", textDecoration: "none" }}
                        onClick={() => handleTerms()}
                      >
                        termes et conditions
                      </a>{" "}
                      et{" "}
                      <a
                        href="#"
                        style={{ color: "#42D0ED", textDecoration: "none" }}
                        onClick={() => handlePrivacy()}
                      >
                        la politique privée
                      </a>
                    </span>
                  </label>
                </div>
                {checkBoxErr && (
                  <small
                    id="username2-help error-div "
                    style={{ marginBottom: "20px" }}
                    className="p-error"
                  >
                    Vous devez accepter nos conditions d'utilisation{" "}
                  </small>
                )}
                <div className="signin-btn">
                  <Button
                    block
                    className="btn btn-block btn-lg"
                    variant="success"
                    style={{ backgroundColor: "#00C0F8" }}
                    type="submit"
                    onClick={() => handleSubmit()}
                  >
                    Créer un compte
                  </Button>
                  <div className="d-flex mb-5 align-items-center">
                <span className="align-items-left ">
                    <a
                      className="login-link"
                      onClick={() => history.push("/login")}
                    >
                      Vous avez déjà un compte ? [Connectez vous]
                    </a>
                </span>
                
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupUI;
