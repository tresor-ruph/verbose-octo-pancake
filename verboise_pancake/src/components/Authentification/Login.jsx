import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import loginImage from "resources/Images/login.jpg";

import "helper/axiosConfig";
import "helper/firebaseConfig";
import "components/authentification/login.css";
import { Button } from "react-bootstrap";
import MainHeader from "components/Navbars/MainHeader";

function Login(props) {
  let uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: ({ user }) => {
        handleSubmit({
          email: user.email,
          password: user.uid,
          username: user.displayName,
          social: true,
        });
      },
    },
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  const user = useRef(null);
  const passwd = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {});
  }, []);
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleUserStyle = () => {
    user.current.classList.add("field--not-empty");
  };
  const handleRemoveUserStyle = () => {
    if (username.length === 0)
      user.current.classList.remove("field--not-empty");
  };
  const handlePasswordStyle = () => {
    passwd.current.classList.add("field--not-empty");
  };
  const handleRemovePasswdStyle = () => {
    if (password.length === 0)
      passwd.current.classList.remove("field--not-empty");
  };

  const handleSubmit = (
    data = {
      em_usname: "",
      password: "",
    }
  ) => {
    if (data.em_usname !== "" || data.email !== undefined) {
      console.log(data);
      axios
        .get("/Login/" + JSON.stringify(data))
        .then((res) => {
          setErr(null);
          const { id, token } = res.data.token;

          dispatch({
            type: "LOG_IN",
            payload: {
              sessionId: token,
              userId: id,
              user: {
                username: data.username ? data.username : username,
                isLogged: res.status == 200 ? true : false,
              },
            },
          });
          if (res.status === 203) {
            props.history.push(`/confEmail/${id}`);
          } else if (res.status === 200) {
            window.location.reload("/");
          }
        })
        .catch((err) => {
          setErr(err.response.data.message);
        });
    }
  };

  return (
    <div>
      <MainHeader />
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
                    onFocus={handleUserStyle}
                    onBlur={handleRemoveUserStyle}
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
                    onFocus={handlePasswordStyle}
                    onBlur={handleRemovePasswdStyle}
                    onChange={(event) => handlePassword(event)}
                  />
                </div>

                <div className="d-flex mb-5 align-items-center">
                 
                  <span className="ml-auto">
                    <a
                      href="#"
                      className="forgot-pass"
                      onClick={() => props.history.push("/resetpassword/test")}
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
                <div>
                  <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
