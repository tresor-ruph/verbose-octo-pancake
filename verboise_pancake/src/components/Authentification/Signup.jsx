import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router";


function Login(props) {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    console.log(username, password);
    dispatch({
      type: "LOG_IN",
      payload: {
        sessionId: "azerty",
        user: {
          username,
          isLogged: true,
        },
      },
    });
    props.history.push('/')
  };

  return (
    <div>
      <input
        type="text"
        placeholder="username / email"
        value={username}
        onChange={(event) => handleUsername(event)}
      />
      <br />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(event) => handlePassword(event)}
      />
      <br />
      <button onClick={() => handleSubmit()}>submit</button>
    </div>
  );
}

export default Login;
