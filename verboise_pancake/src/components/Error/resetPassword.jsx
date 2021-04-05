import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import "helper/axiosConfig";
import "components/Error/resetPassword.css";
import { Button, Alert } from "react-bootstrap";
import MainHeader from "components/Navbars/MainHeader";

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

  const verifEmail = () => {
    let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;

    return re.test(email);
  };

  const handleReset = () => {
    if (!verifEmail()) {
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
      {reset ? (
        <div className="main-div">
          <div className="center-div">
            <div>
              <p className="text-res">Forgot your Password ?</p>
              <span>
                To reset your password please provide your account email Address
              </span>
            </div>

            <input
              type="text"
              placeholder="enter your email"
              value={email}
              className="email-res"
              onChange={(event) => handleEmail(event)}
            />
            <br />
            <Button
              className="btn-fill pull-right"
              type="submit"
              variant="info"
              onClick={() => handleReset()}
            >
              Reset Password
            </Button>
          </div>
        </div>
      ) : (
        <div className="main-div">
          <div className="center-div">
            <div>
              <p className="text-res">Update your Password</p>
              <span>Please enter your new password</span>
            </div>
            <input
              type="password"
              placeholder="password"
              className="email-res"
              value={password1}
              onChange={(event) => handlePassword1(event)}
            />
            <br />
            <input
              type="password"
              placeholder="repeat password"
              className="email-res2"
              value={password2}
              onChange={(event) => handlePassword2(event)}
            />
            <br />
            <Button
              className="btn-fill pull-right"
              type="submit"
              variant="info"
              onClick={() => updatePassword()}
            >
              Update password
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
