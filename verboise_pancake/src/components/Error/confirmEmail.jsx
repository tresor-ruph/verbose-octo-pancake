import React from "react";
import axios from "axios";
import "helper/axiosConfig";
// import {useLocation, useHistory} from 'react-router'
import ConfirmEmailUI from 'components/Error/UI/ConfirmEmailUI'
import {useSelector} from 'react-redux'


export default function ConfirmMail(props) {
  const {sessionId, userId, user} =useSelector(state => state.SessionReducer)
  

  let data = {
    token: sessionId,
    userId: userId,
    userName: user.username,
    email:user.email,
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
   email={user.email}
   handleSendLink={handleSendLink}
   
   />
  );
}
