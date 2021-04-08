import React from "react";
import axios from "axios";
import ls from "local-storage";
import "helper/axiosConfig";
import {useLocation, useHistory} from 'react-router'
import ConfirmEmailUI from 'components/Error/UI/ConfirmEmailUI'

export default function ConfirmMail(props) {
  const tok = JSON.parse(ls.get("token"));
  const id = JSON.parse(ls.get("userId"));
  const userName = JSON.parse(ls.get("username"));
  const email = JSON.parse(ls.get("email"));

  let data = {
    token: tok,
    userId: id,
    userName: userName,
    email,
  };

  const handleSendLink = () => {
    console.log(data);
    axios
      .get("/resendLink/" + JSON.stringify(data))
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));
  };
  return (
   <ConfirmEmailUI 
   email={email}
   handleSendLink={handleSendLink}
   
   />
  );
}
