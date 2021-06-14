import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { Toast } from "primereact/toast";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";

const LoginUI = (props) => {
  const {
    MainHeader,
    toast,
    loginImage,
    user,
    username,
    handleUserFocus,
    handleUserBlur,
    handleUsername,
    passwd,
    password,
    handlePasswordFocus,
    handlePasswordBlur,
    handlePassword,
    handleSubmit,
  } = props;

  const history = useHistory();

  return (
    <div className="main-login">
      {MainHeader}
      <Toast ref={toast} />
      <div className="d-lg-flex half ">
        <div className="bg order-2 order-md-1 login-i">
          <img src={loginImage} width="80%" className="login-i " />
        </div>
        <div className="contents order-1 order-md-2 log-form ">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-7">
                <div className="mb-4">
                  <span className="auth-txt">Connectez-vous</span>
                </div>

                <div className="input-div" ref={user}>
                  <span className="p-float-label">
                    <InputText
                      id="username"
                      value={username}
                      className="input-auth"
                      onChange={(event) => handleUsername(event)}
                      onBlur={handleUserBlur}
                      onFocus={handleUserFocus}
                    />
                    <label htmlFor="username" className="label-password">
                      Nom d'utilisateur ou email
                    </label>
                  </span>
                </div>
                <br />

                <div className="password-div">
                  <span className="p-float-label" ref={passwd}>
                    <Password
                      className="test-pass"
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

                <div className="d-flex mb-5 align-items-center">
                  <span className="ml-auto">
                    <a
                      className="forgot-pass"
                      onClick={() => history.push("/resetpassword/user")}
                    >
                      Mot de passe oublié ?
                    </a>
                  </span>
                </div>

                <Button
                  block
                  className="btn btn-block  btn-lg  "
                  type="submit"
                  variant="success"
                  style={{ backgroundColor: "#00C0F8" }}
                  onClick={() =>
                    handleSubmit({
                      em_usname: username,
                      password,
                    })
                  }
                >
                  Connexion
                </Button>

                <span className="d-block text-center my-4 text-muted">
                  &mdash; ou &mdash;
                </span>
                <div>{props.children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUI;
