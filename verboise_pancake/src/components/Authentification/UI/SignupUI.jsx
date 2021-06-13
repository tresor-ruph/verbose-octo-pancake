import React from "react";
import { Button } from "react-bootstrap";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
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

  return (
    <div class="main-sigin">
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
                  <span className="auth-txt">Sign In</span>
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
                  <div class="error-div">
                    <small id="username2-help error-div" className="p-error">
                      Invalid Email..{" "}
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
                      Username
                    </label>
                  </span>
                </div>
                {userErr && (
                  <div class="error-div">
                    <small id="username2-help error-div" className="p-error">
                      Invalid Username.{" "}
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
                      Password
                    </label>
                  </span>
                </div>
                {disabled && (
                  <div class="error-div">
                    <small id="username2-help error-div" className="p-error">
                      Invalid password.{" "}
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
                      Confirm Password
                    </label>
                  </span>
                </div>
                {disabled2 && (
                  <div class="error-div">
                    <small id="username2-help error-div" className="p-error">
                      Passwords must be identical.
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
                  <small
                    id="username2-help error-div "
                    style={{ marginBottom: "20px" }}
                    className="p-error"
                  >
                    You must accept our conditions
                  </small>
                )}
                <div className="signin-btn">
                  <Button
                    block
                    className="btn btn-block btn-lg"
                    variant="success"
                    style={{ backgroundColor: "#00C0F8" }}
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
