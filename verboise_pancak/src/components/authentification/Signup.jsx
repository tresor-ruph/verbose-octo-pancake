import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import loginImage from "assets/images/background/login.jpg";
import SignupUI from "components/authentification/UI/SignupUI";
import TermsAndCondition from "components/modal/TermsCondition";

import { Button } from "react-bootstrap";
import {
  EmailVerification,
  PasswordVerification,
  UsernameVerification,
} from "helper/detailsVerification";
import { returnHeader } from "helper/customMixin";
import { setStyle, clearStyle } from "helper/dynamicCss";
import "customcss/signup.css";
import "../../helper/axiosConfig";

function Signup(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [disabled2, setDisabled2] = useState(false);
  const [userErr, setUserErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalDisplay, setModalDisplay] = useState("");
  const [check, setCheck] = useState("off");
  const [checkBoxErr, setCheckBoxErr] = useState(false);
  const [notif, setNotif] = useState(false);
  const [notifMess, setnotifMess] = useState("");
  const [variant, setVariant] = useState("");
  const [err, setErr] = useState(null);
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
  const dispatch = useDispatch();

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
  const handleCheckBox = () => {
    if (check === "on") {
      setCheck("off");
    } else {
      setCheck("on");
      setCheckBoxErr(false);
    }
  };
  const returnTermsAndCondition = () => {
    return (
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
    );
  };
  const handleEmailFocus = () => {
    emailRef.current.classList.add("field--not-empty");
    clearStyle(emailInp, emailRef, emailLabel);
    setEmailErr(false);
  };

  const handleEmailBlur = () => {
    if (email.length === 0)
      emailRef.current.classList.remove("field--not-empty");
    if (!EmailVerification(email)) {
      setStyle(emailInp, emailRef, emailLabel);
      setEmailErr(true);
    } else {
      clearStyle(userInp, userRef, userLabel);
      setEmailErr(false);
    }
  };

  const handleUserFocus = () => {
    userRef.current.classList.add("field--not-empty");
    clearStyle(userInp, userRef, userLabel);
    setUserErr(false);
  };

  const handleUserBlur = () => {
    if (username.length === 0)
      userRef.current.classList.remove("field--not-empty");

    if (!UsernameVerification(username)) {
      setStyle(userInp, userRef, userLabel);
      setUserErr(true);
    }
  };

  const handlePasswordFocus = () => {
    passwd.current.classList.add("field--not-empty");
    clearStyle(pwd, passwd, labelPasswd);
    setDisabled(false);
  };

  const handlePasswordBlur = () => {
    if (password.length === 0) {
      passwd.current.classList.remove("field--not-empty");
    }

    if (!PasswordVerification(password)) {
      setStyle(pwd, passwd, labelPasswd);
      setDisabled(true);
    } else {
      clearStyle(pwd, passwd, labelPasswd);
      setDisabled(false);
    }
  };

  const handlePassword2Focus = () => {
    passwd2.current.classList.add("field--not-empty");
    clearStyle(pwd2, passwd2, labelPasswd2);
    setDisabled2(false);
  };

  const handlePassword2Blur = () => {
    if (password2.length === 0)
      passwd2.current.classList.remove("field--not-empty");

    if (password !== password2) {
      setStyle(pwd2, passwd2, labelPasswd2);
      setDisabled2(true);
    }
  };

  const handleSubmit = () => {
    let err = false;
    if (check === "off") {
      setCheckBoxErr(true);
      err = true;
    }
    if (!PasswordVerification(password)) {
      setStyle(pwd, passwd, labelPasswd);
      setDisabled(true);
      err = true;
    }
    if (password.length > 1 && password != password2) {
      setStyle(pwd2, passwd2, labelPasswd2);
      setDisabled2(true);
      err = true;
    }
    if (!EmailVerification(email)) {
      setStyle(emailInp, emailRef, emailLabel);
      setEmailErr(true);
      err = true;
    }
    if (!UsernameVerification(username)) {
      setStyle(userInp, userRef, userLabel);
      setUserErr(true);
      err = true;
    }
    if (err === true) return;
    const data = {
      email,
      password,
      username,
    };
    axios
      .post("/Signin", data)
      .then((res) => {
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

        props.history.push(`/confEmail/${res.data.id}`, "");
      })
      .catch((err) => {
        setnotifMess(err?.response?.data?.message || "An error occured");
        setVariant("danger");
        setNotif(true);
      });
  };

  const handleTerms = () => {
    setModalDisplay("terms");
    setShowModal(true);
  };
  const handlePrivacy = () => {
    setModalDisplay("privacy");
    setShowModal(true);
  };

  return (
    <SignupUI
      returnHeader={returnHeader()}
      returnTermsAndCondition={returnTermsAndCondition()}
      showModal={showModal}
      setShowModal={setShowModal}
      modalDisplay={modalDisplay}
      notif={notif}
      setNotif={setNotif}
      notifMess={notifMess}
      loginImage={loginImage}
      emailRef={emailRef}
      emailLabel={emailLabel}
      email={email}
      emailInp={emailInp}
      handleEmailFocus={handleEmailFocus}
      handleEmailBlur={handleEmailBlur}
      handleEmail={handleEmail}
      emailErr={emailErr}
      userRef={userRef}
      userLabel={userLabel}
      username={username}
      userInp={userInp}
      handleUserFocus={handleUserFocus}
      handleUserBlur={handleUserBlur}
      handleUsername={handleUsername}
      passwd={passwd}
      labelPasswd={labelPasswd}
      pwd={pwd}
      password={password}
      handlePasswordFocus={handlePasswordFocus}
      handlePasswordBlur={handlePasswordBlur}
      handlePassword={handlePassword}
      passwd2={passwd2}
      labelPasswd2={labelPasswd2}
      password2={password2}
      pwd2={pwd2}
      handlePassword2Focus={handlePassword2Focus}
      handlePassword2Blur={handlePassword2Blur}
      handlePassword2={handlePassword2}
      disabled2={disabled2}
      handleCheckBox={handleCheckBox}
      check={check}
      handleTerms={handleTerms}
      handlePrivacy={handlePrivacy}
      handleSubmit={handleSubmit}
      variant={variant}
      userErr={userErr}
      disabled={disabled}
      checkBoxErr={checkBoxErr}
      MainHeader={returnHeader()}
    />
  );
}

export default Signup;
