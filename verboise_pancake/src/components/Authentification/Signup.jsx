import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import SignupUI from "components/authentification/UI/SignupUI";
import TermsAndCondition from "components/modal/TermsCondition";
import { Button } from "react-bootstrap";
import loginImage from "assets/images/auth/login.svg";
import { returnHeader } from "helper/customMixin";
import "customcss/signup.css";
import axios from "axios";
import "../../helper/axiosConfig";
import {
  EmailVerification,
  PasswordVerification,
  UsernameVerification,
} from "helper/detailsVerification";


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
  const toast = useRef(null);
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
    setEmailErr(false);
  };

  const handleEmailBlur = () => {
    if (!EmailVerification(email)) {
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }
  };

  const handleUserFocus = () => {
    setUserErr(false);
  };

  const handleUserBlur = () => {
    if (!UsernameVerification(username)) {
      setUserErr(true);
    }
  };

  const handlePasswordFocus = () => {
    setDisabled(false);
  };

  const handlePasswordBlur = () => {
    if (!PasswordVerification(password)) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const handlePassword2Focus = () => {
    setDisabled2(false);
  };

  const handlePassword2Blur = () => {
    if (password !== password2) {
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
      setDisabled(true);
      err = true;
    }
    if (password.length > 1 && password != password2) {
      setDisabled2(true);
      err = true;
    }
    if (!EmailVerification(email)) {
      setEmailErr(true);
      err = true;
    }
    if (!UsernameVerification(username)) {
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
        console.log('res', res.data)
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
        console.log(res.data.id.userId)
        props.history.push(`/confEmail/${res.data.id.userId}`, "");
      })
      .catch((err) => {
        console.log(err?.response)
        if (err?.response?.status === 404) {
          toast.current.show({
            severity: "error",
            summary: "Erreur",
            detail: "L'utilisateur existe déjà",
            life: 5000,
          });
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "une erreur est survenue",
            life: 5000,
          });
        }
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
      toast ={toast}
      returnTermsAndCondition={returnTermsAndCondition()}
      showModal={showModal}
      setShowModal={setShowModal}
      modalDisplay={modalDisplay}
      loginImage={loginImage}
      email={email}
      handleEmailFocus={handleEmailFocus}
      handleEmailBlur={handleEmailBlur}
      handleEmail={handleEmail}
      emailErr={emailErr}
      username={username}
      handleUserFocus={handleUserFocus}
      handleUserBlur={handleUserBlur}
      handleUsername={handleUsername}
      password={password}
      handlePasswordFocus={handlePasswordFocus}
      handlePasswordBlur={handlePasswordBlur}
      handlePassword={handlePassword}
      password2={password2}
      handlePassword2Focus={handlePassword2Focus}
      handlePassword2Blur={handlePassword2Blur}
      handlePassword2={handlePassword2}
      disabled2={disabled2}
      handleCheckBox={handleCheckBox}
      check={check}
      handleTerms={handleTerms}
      handlePrivacy={handlePrivacy}
      handleSubmit={handleSubmit}
      userErr={userErr}
      disabled={disabled}
      checkBoxErr={checkBoxErr}
      MainHeader={returnHeader()}
    />
  );
}

export default Signup;
