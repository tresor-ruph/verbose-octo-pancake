import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import "helper/axiosConfig";
import { EmailVerification } from "helper/detailsVerification";
import ResetPasswordUI from "components/Error/UI/ResetPasswordUI";
import { useEffect } from "react";
import { returnHeader } from "helper/customMixin";

import "customcss/resetPassword.css";

export default function Reset(props) {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [notif, setNotif] = useState(false);
  const [notifMess, setnotifMess] = useState("");
  const [variant, setVariant] = useState("");
  const [reset, setReset] = useState(true);
  let history = useHistory();
  let link = props.location.pathname;

  useEffect(() => {
    if (link === "/resetpassword/user") {
      setReset(true);
    } else if (link === "/resetpassword/validation") {
      setReset(false);
    } else {
      let arr = link.split("/");
      axios
        .get(`/verifLink/${arr[2]}`)
        .then((res) => {
          if (res.data.message == "valid") {
            history.push("/resetpassword/validation");
          } else if (res.data.message == "invalid") {
            history.push("/error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.location]);

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
          if (res.status == 200) {
            setnotifMess(` An Email has been sent to ${email}. Follow the instructions to reset
            your password`);
            setNotif(true);
            setVariant("success");
          }
        })
        .catch((err) => {
          setnotifMess(err?.response?.data?.message || "An error occured");
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
        password: password1,
      };

      axios
        .put("/password", data)
        .then((res) => {
          setnotifMess(` password updated`);
          setVariant("success");
          setNotif(true);

          setTimeout(function () {
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
      MainHeader={returnHeader}
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
