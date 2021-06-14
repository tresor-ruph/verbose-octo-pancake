import React, { useState, useRef } from "react";
import axios from "axios";
import "helper/axiosConfig";
import { useLocation, useHistory } from "react-router";
import ConfirmEmailUI from "components/Error/UI/ConfirmEmailUI";
import { useSelector } from "react-redux";
import { returnHeader } from "helper/customMixin";

export default function ConfirmMail(props) {
  const { sessionId, userId, user } = useSelector(
    (state) => state.SessionReducer
  );
  const location = useLocation();
  const history = useHistory();

  const [notif, setNotif] = useState(false);
  const [notifMess, setnotifMess] = useState("");
  const [variant, setVariant] = useState("");
  const toast = useRef(null);
  const arr = location.pathname.split("/");

  const fromLoging = location.state === "login" ? true : false;

  let data = {
    token: sessionId,
    userId: userId,
    userName: user.username,
    email: user.email,
  };

  if (arr[2] != userId.userId) {
    history.push("/login");
  }

  const handleSendLink = () => {
    axios
      .get("/resendLink/" + JSON.stringify(data))
      .then((res) => {
        toast.current.show({
          severity: "success",
          summary: "Succès",
          detail: "email envoyé",
          life: 3000,
        });
      })
      .catch((err) => {
        toast.current.show({
          severity: "error",
          summary: "Erreur",
          detail: "Une erreur est survenue",
          life: 5000,
        });
      });
  };
  return (
    <ConfirmEmailUI
      returnHeader={returnHeader}
      fromLoging={fromLoging}
      email={user.email}
      handleSendLink={handleSendLink}
      notif={notif}
      variant={variant}
      setNotif={setNotif}
      notifMess={notifMess}
      toast={toast}
    />
  );
}
