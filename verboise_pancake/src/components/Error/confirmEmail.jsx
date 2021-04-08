import React, { useState } from "react";
import axios from "axios";
import "helper/axiosConfig";
import { useLocation, useHistory } from "react-router";
import ConfirmEmailUI from "components/Error/UI/ConfirmEmailUI";
import { useSelector } from "react-redux";

export default function ConfirmMail(props) {
  const { sessionId, userId, user } = useSelector(
    (state) => state.SessionReducer
  );
  const location = useLocation();
  const history = useHistory();

  const [notif, setNotif] = useState(false);
  const [notifMess, setnotifMess] = useState("");
  const [variant, setVariant] = useState("");

  const arr = location.pathname.split("/");

  const fromLoging = location.state === "login" ? true : false;

  let data = {
    token: sessionId,
    userId: userId,
    userName: user.username,
    email: user.email,
  };

  if (arr[2] != userId) {
    history.push("/login");
  }

  const handleSendLink = () => {
    axios
      .get("/resendLink/" + JSON.stringify(data))
      .then((res) => {
        setnotifMess("email sent");
        setVariant("success");
        setNotif(true);
      })
      .catch((err) => {
        setnotifMess(err.response.data.message);
        setVariant("success");
        setNotif(true);
      });
  };
  return (
    <ConfirmEmailUI
      fromLoging={fromLoging}
      email={user.email}
      handleSendLink={handleSendLink}
      notif={notif}
      variant={variant}
      setNotif={setNotif}
      notifMess={notifMess}
    />
  );
}
