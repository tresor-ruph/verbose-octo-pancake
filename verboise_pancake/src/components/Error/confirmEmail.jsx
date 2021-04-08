import React, { useEffect } from "react";
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

  const arr = location.pathname.split("/");

  const fromLoging = location.state === "login" ? true : false
  console.log(fromLoging)

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
    console.log(data);
    axios
      .get("/resendLink/" + JSON.stringify(data))
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));
  };
  return <ConfirmEmailUI fromLoging={fromLoging} email={user.email} handleSendLink={handleSendLink} />;
}
