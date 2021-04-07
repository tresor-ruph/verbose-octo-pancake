import React from "react";
import { Button, Alert } from "react-bootstrap";
import {useHistory} from 'react-router'
import MainHeader from "components/Navbars/MainHeader";
import "customcss/login.css";

const LoginUI = (props) => {
  const {
    notif,
    variant,
    setNotif,
    notifMess,
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

  const history = useHistory()

  return (
    <div>
      <MainHeader />
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
        <div className="bg order-2 order-md-1 login-i">
          <img src={loginImage} width="100%" className="login-i " />
        </div>
        <div className="contents order-1 order-md-2 ">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-7">
                <div className="mb-4">
                  <h3>Log In</h3>
                </div>
                <div className="form-group first frm-log" ref={user}>
                  <label className="label" htmlFor="username">
                    Username or Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onFocus={handleUserFocus}
                    onBlur={handleUserBlur}
                    onChange={(event) => handleUsername(event)}
                  />
                </div>
                <br />
                <div className="form-group frm-log last mb-3" ref={passwd}>
                  <label className="label" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onFocus={handlePasswordFocus}
                    onBlur={handlePasswordBlur}
                    onChange={(event) => handlePassword(event)}
                  />
                </div>

                <div className="d-flex mb-5 align-items-center">
                  <span className="ml-auto">
                    <a
                      href="#"
                      className="forgot-pass"
                      onClick={() =>history.push("/resetpassword/user")}
                    >
                      Forgot Password
                    </a>
                  </span>
                </div>

                <Button
                  block
                  className="btn-fill pull-right"
                  type="submit"
                  variant="info"
                  onClick={() =>
                    handleSubmit({
                      em_usname: username,
                      password,
                    })
                  }
                >
                  Login
                </Button>

                <span className="d-block text-center my-4 text-muted">
                  &mdash; or &mdash;
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

export default LoginUI