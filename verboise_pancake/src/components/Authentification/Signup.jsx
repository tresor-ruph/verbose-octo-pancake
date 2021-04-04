import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import axios from "axios";
import "../../helper/axiosConfig";
import "components/authentification/signup.css";
function Signup(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [disabled2, setDisabled2] = useState(false);
  const [userErr, setUserErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);

  const emailRef = useRef(null);
  const emailLabel = useRef(null);
  const emailInp = useRef(null);

  const userRef = useRef(null);
  const userLabel = useRef(null);
  const userInp = useRef(null);
  const passwd = useRef(null);
  const passwd2 = useRef(null);
  const pwd = useRef(null);
  const labelPasswd = useRef(null);
  const pwd2 = useRef(null);
  const labelPasswd2 = useRef(null);

  const [err, setErr] = useState(null);
  const dispatch = useDispatch();

  const setStyle = (x, y, z) => {
    x.current.classList.add("is-invalid");
    x.current.style.color = "red";
    y.current.classList.add("pwd-invalid");
    y.current.classList.contains("frm-log") &&
      y.current.classList.remove("frm-log");
    z.current.style.color = "red";
  };

  const clearStyle = (x, y, z) => {
    x.current.classList.contains("is-invalid") &&
      x.current.classList.remove("is-invalid");
    x.current.classList.contains("pwd-invalid") &&
      x.current.classList.remove("pwd-invalid");
    !x.current.classList.contains("frm-log") &&
      y.current.classList.add("frm-log");
    x.current.style.color = "";
    z.current.style.color = "#b3b3b3";
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handlePassword2 = (event) => {
    setPassword2(event.target.value);
  };

  const handleEmailStyle = () => {
    emailRef.current.classList.add("field--not-empty");
    clearStyle(emailInp, emailRef, emailLabel);
    setEmailErr(false);
  };

  const handleRemoveEmailStyle = () => {
    if (email.length === 0)
      emailRef.current.classList.remove("field--not-empty");
    if (!verifEmail()) {
      setStyle(emailInp, emailRef, emailLabel);
      setEmailErr(true);
    } else {
      clearStyle(userInp, userRef, userLabel);
      setEmailErr(false);
    }
  };

  const handleUserStyle = () => {
    userRef.current.classList.add("field--not-empty");
    clearStyle(userInp, userRef, userLabel);
    setUserErr(false);
  };

  const handleRemoveUserStyle = () => {
    if (username.length === 0)
      userRef.current.classList.remove("field--not-empty");

    if (!verifUsername()) {
      setStyle(userInp, userRef, userLabel);
      setUserErr(true);
    }
  };

  const handlePasswordStyle = () => {
    passwd.current.classList.add("field--not-empty");
    clearStyle(pwd, passwd, labelPasswd);
    setDisabled(false);
  };

  const handleRemovePasswdStyle = () => {
    if (password.length === 0) {
      passwd.current.classList.remove("field--not-empty");
    }

    if (!verifPassword()) {
      setStyle(pwd, passwd, labelPasswd);
      setDisabled(true);
    } else {
      clearStyle(pwd, passwd, labelPasswd);
      setDisabled(false);
    }
  };

  const handlePassword2Style = () => {
    passwd2.current.classList.add("field--not-empty");
    clearStyle(pwd2, passwd2, labelPasswd2);
    setDisabled2(false);
  };

  const handleRemovePasswd2Style = () => {
    if (password2.length === 0)
      passwd2.current.classList.remove("field--not-empty");

    if (password !== password2) {
      setStyle(pwd2, passwd2, labelPasswd2);
      setDisabled2(true);
    }
  };

  const verifEmail = () => {
    let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;

    return re.test(email);
  };
  const verifUsername = () => {
    let bol = false;
    if (username.length > 3) {
      bol = true;
    }
    return bol;
  };

  const verifPassword = () => {
    let bol = false;
    if (
      password.length > 6 &&
      /[0-9]/.test(password) &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(passwd)
    ) {
      bol = true;
    }
    return bol;
  };

  const handleSubmit = () => {
    const data = {
      email,
      password,
      username,
    };
    axios
      .post("/Signin", data)
      .then((res) => {
        console.log(res);
        setErr(null);
        dispatch({
          type: "LOG_IN",
          payload: {
            sessionId: res.data.token,
            userId: res.data.id,
            user: {
              username,
              email,
              isLogged: false,
            },
          },
        });

        props.history.push(`/confEmail/${res.data.id}`);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setErr(err.response.data.message);
      });
  };

  return (
    <div>
      <div className="d-lg-flex half ">
        <div className="bg order-2 order-md-1 login-i"></div>
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
                    onFocus={handleEmailStyle}
                    onBlur={handleRemoveEmailStyle}
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
                    onFocus={handleUserStyle}
                    onBlur={handleRemoveUserStyle}
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
                    onFocus={handlePasswordStyle}
                    onBlur={handleRemovePasswdStyle}
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
                    onFocus={handlePassword2Style}
                    onBlur={handleRemovePasswd2Style}
                    onChange={(event) => handlePassword2(event)}
                    disabled={disabled}
                  />
                </div>
                {disabled2 && (
                  <span className="pwd-inv-mess">password not identical</span>
                )}
                <br />
                <button
                  className="btn btn-block btn-primary"
                  onClick={() => handleSubmit()}
                >
                  submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
