import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import "helper/axiosConfig";
import {EmailVerification} from "helper/detailsVerification" 
import ResetPasswordUI from 'components/Error/UI/ResetPasswordUI'

export default function Reset(props) {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [notif, setNotif] = useState(false);
  const [notifMess, setnotifMess] = useState("");
  const [variant, setVariant] = useState("");

  
  let history = useHistory();
  let reset = true;
  let link = props.location.pathname;
  let arr = link.split(",");
  if (arr.length === 2) {
    reset = false;
  }
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword1 = (event) => {
    setPassword1(event.target.value);
  };
  const handlePassword2 = (event) => {
    setPassword2(event.target.value);
  };


  const handleReset = () => {
    if (!EmailVerification(email)) {
      return;
    } else {
      axios
        .get(`/resetpassword/${email}`)
        .then((res) => {
          console.log(res);

          if (res.status == 200) {
            setnotifMess(` An Email has been sent to ${email}. Follow the instructions to reset
            your password`);
            setNotif(true);
            setVariant("success");
          }
        })
        .catch((err) => {
          console.log(err)
          setnotifMess(`An error occured`);
          setVariant("danger");
          setNotif(true);
        });
    }
  };
  const updatePassword = () => {
    if (password1 !== password2) {
      setnotifMess(`Password are different`);
      setVariant("danger");
      setNotif(true);
      return;
    } else {
      const data = {
        userId: arr[1],
        password: password1,
      };

      axios
        .put("/password", data)
        .then((res) => {
          console.log(res);
          setnotifMess(` password updated`);
          setVariant("success");
          setNotif(true);

          setTimeout(function () {
            console.log('test')
            history.push("/login");
          }, 1000);
        })
        .catch((err) => {
          setnotifMess(`An error occured`);
          setVariant("danger");
          setNotif(true);
        });
    }
  };

  return (
    <ResetPasswordUI 
    notif={notif}
    variant={variant}
    setNotif={setNotif}
    notifMess={notifMess}
    email={email}
    handleEmail={handleEmail}
    handleReset={handleReset}
    password1={password1}
    handlePassword1={handlePassword1}
    password2={password2}
    handlePassword2={handlePassword2}
    updatePassword={updatePassword}
    reset={reset}
    
    />
     
  );
}
