import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import "helper/axiosConfig";

export default function Reset(props) {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

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
    axios
      .get(`/resetpassword/${email}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));
  };
  const updatePassword = () => {
    const data = {
      userId: arr[1],
      password: password1,
    };
    console.log(data);

    axios
      .put("/password", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));
  };

  return (
    <div>
      {reset ? (
        <div>
          <input
            type="text"
            placeholder="enter your email"
            value={email}
            onChange={(event) => handleEmail(event)}
          />
          <br />
          <button onClick={() => handleReset()}>submit</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="enter new password"
            value={password1}
            onChange={(event) => handlePassword1(event)}
          />
          <br />
          <input
            type="text"
            placeholder="repeat password"
            value={password2}
            onChange={(event) => handlePassword2(event)}
          />
          <br />
          <button onClick={() => updatePassword()}>submit</button>
        </div>
      )}
    </div>
  );
}
