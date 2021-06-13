import React, { useState, useRef } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import "helper/axiosConfig";
import { EmailVerification ,  PasswordVerification,} from "helper/detailsVerification";
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
  const [passwordErr, setPasswordErr] = useState(false)
  const [passwordErr1, setPasswordErr1] = useState(false)
  const [id, setId] = useState(null)
  const toast = useRef(null);

  let history = useHistory();
  let link = props.location.pathname;

  useEffect(() => {
    if (link === "/resetpassword/user") {
      setReset(true);
    } else if (link === "/resetpassword/validation") {
      setReset(false);
    } else {
      let arr = link.split("/");
      console.log(arr)
      axios
        .get(`/verifLink/${arr[2]}`)
        .then((res) => {
          if (res.data.message == "valid") {
            console.log(res.data)
            setId(res.data.id)
               setReset(false);

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
  const handleFocus = ()=> {
    setPasswordErr(false)
    setPasswordErr1(false)
  }

  const handleReset = () => {
    if (!EmailVerification(email)) {
      return;
    } else {
      axios
        .get(`/resetpassword/${email}`)
        .then((res) => {
          if (res.status == 200) {
            toast.current.show({severity:'success', summary: 'success', detail:` An Email has been sent to ${email}. Follow the instructions to reset
            your password`, life: 10000});
          }
        })
        .catch((err) => {
          toast.current.show({severity:'error', summary: 'Error', detail:'IAn error occured`', life: 5000});    
        });
    }
  };
  const updatePassword = () => {
    if (!PasswordVerification(password1)) {
      setPasswordErr1(true)
      return   
    }
    if (password1 !== password2) {
      setPasswordErr(true)
      console.log("erro")
      return;
    } else {
      const data = {
        password: password1,
        id:id
      };

      axios
        .put("/password", data)
        .then((res) => {
          toast.current.show({severity:'success', summary: 'success', detail:'password updated', life: 5000});
          setTimeout(function () {
            history.push("/login");
          }, 1000);
        })
        .catch((err) => {
          toast.current.show({severity:'error', summary: 'Error', detail:'An error occured`', life: 5000});
        });
    }
  };

  return (
    <ResetPasswordUI
      MainHeader={returnHeader}
      notif={notif}
      variant={variant}
      handleFocus={handleFocus}
      passwordErr={passwordErr}
      toast={toast}
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
      passwordErr1={passwordErr1}
    />
  );
}
