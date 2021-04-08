import React from "react";
import MainHeader from "components/Navbars/MainHeader";
import TermsAndCondition from "components/modal/TermsCondition";
import { Button, Alert } from "react-bootstrap";
import 'customcss/signup.css'

const SignupUI = (props) => {
  const {
    showModal,
    setShowModal,
    modalDisplay,
    notif,
    setNotif,
    notifMess,
    loginImage,
    emailRef,
    emailLabel,
    email,
    emailInp,
    handleEmailFocus,
    handleEmailBlur,
    handleEmail,
    emailErr,
    userRef,
    userLabel,
    username,
    userInp,
    handleUserFocus,
    handleUserBlur,
    handleUsername,
    passwd,
    labelPasswd,
    pwd,
    password,
    handlePasswordFocus,
    handlePasswordBlur,
    handlePassword,
    passwd2,
    labelPasswd2,
    password2,
    pwd2,
    handlePassword2Focus,
    handlePassword2Blur,
    handlePassword2,
    disabled2,
    handleCheckBox,
    check,
    handleTerms,
    handlePrivacy,
    handleSubmit,
    variant,
    userErr,
    disabled,
    checkBoxErr,
  } = props;
  return (
    <div>
      <MainHeader />
      {showModal && (
        <TermsAndCondition display={modalDisplay}>
          <Button
            block
            className="btn-fill pull-right"
            type="submit"
            variant="info"
            onClick={() => setShowModal(false)}
          >
            close
          </Button>
        </TermsAndCondition>
      )}
      {notif && (
        <Alert variant={variant}>
          <button
            aria-hidden={true}
            className="close"
            data-dismiss="alert"
            type="button"
            onClick={() => setNotif(false)}
          >
            <i className="nc-icon nc-simple-remove"></i>
          </button>
          <span style={{ textAlign: "center" }}>{notifMess}</span>
        </Alert>
      )}
      <div className="d-lg-flex half ">
        <div className="bg order-2 order-md-1 login-i left">
          <img src={loginImage} width="100%" className="login-i " />
        </div>
        <div className="contents order-1 order-md-2 ">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-7">
                <div className="mb-4">
                  <h3>Sign In</h3>
                </div>
                <div className="form-group first frm-log" ref={emailRef}>
                  <label className="label" ref={emailLabel} htmlFor="username">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={email}
                    ref={emailInp}
                    onFocus={handleEmailFocus}
                    onBlur={handleEmailBlur}
                    onChange={(event) => handleEmail(event)}
                  />
                </div>
                {emailErr && (
                  <span className="pwd-inv-mess">email not valid</span>
                )}

                <br />
                <div className="form-group first frm-log" ref={userRef}>
                  <label className="label" ref={userLabel} htmlFor="username">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    ref={userInp}
                    onFocus={handleUserFocus}
                    onBlur={handleUserBlur}
                    onChange={(event) => handleUsername(event)}
                  />
                </div>
                {userErr && (
                  <span className="pwd-inv-mess">username not valid</span>
                )}

                <br />
                <div className="form-group frm-log" ref={passwd}>
                  <label htmlFor="password" ref={labelPasswd} className="label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    ref={pwd}
                    value={password}
                    onFocus={handlePasswordFocus}
                    onBlur={handlePasswordBlur}
                    onChange={(event) => handlePassword(event)}
                  />
                </div>
                {disabled && (
                  <span className="pwd-inv-mess">password not valid</span>
                )}
                <br />
                <div className="form-group frm-log" ref={passwd2}>
                  <label
                    className="label"
                    ref={labelPasswd2}
                    htmlFor="password2"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password2"
                    value={password2}
                    ref={pwd2}
                    onFocus={handlePassword2Focus}
                    onBlur={handlePassword2Blur}
                    onChange={(event) => handlePassword2(event)}
                    disabled={disabled}
                  />
                </div>
                {disabled2 && (
                  <span
                    className="pwd-inv-mess"
                    style={{ marginBottom: "20px" }}
                  >
                    password not identical
                  </span>
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
                      I accept the{" "}
                      <a
                        href="#"
                        style={{ color: "#42D0ED", textDecoration: "none" }}
                        onClick={() => handleTerms()}
                      >
                        terms and condition
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        style={{ color: "#42D0ED", textDecoration: "none" }}
                        onClick={() => handlePrivacy()}
                      >
                        private policy
                      </a>
                    </span>
                  </label>
                </div>
                {checkBoxErr && (
                  <span
                    className="pwd-inv-mess"
                    style={{ marginBottom: "20px" }}
                  >
                    You must accept our conditions
                  </span>
                )}
                <div className="signin-btn">
                  <Button
                    block
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={() => handleSubmit()}
                  >
                    Create Account
                  </Button>
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
