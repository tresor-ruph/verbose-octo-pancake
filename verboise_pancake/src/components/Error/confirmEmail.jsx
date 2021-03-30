import React, { useEffect } from "react";
import axios from "axios";
import ls from "local-storage";
import 'helper/axiosConfig'

export default function ConfirmMail(props) {
  const tok = ls.get("token");
  const id = ls.get("userId");

  const handleSendLink = () => {
    axios
      .get(`/resendLink/${tok, id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));
  };
  return (
    <div>
      <h1>Validate your email</h1>
      <button onClick={() => handleSendLink()}>resend link</button>
    </div>
  );
}
