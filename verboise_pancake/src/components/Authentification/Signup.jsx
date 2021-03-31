import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import axios from "axios";
import "../../helper/axiosConfig";
function Signup(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState(null);
  const dispatch = useDispatch();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    console.log(email, username, password);
    const data = {
      email,
      password,
      username,
    };
    axios
      .post("/Signin", data)
      .then((res) => {
        console.log(res);
        setErr(null);
        dispatch({
          type: "LOG_IN",
          payload: {
            sessionId: res.data.token,
            userId: res.data.id,
            user: {
              username,
              email,
              isLogged: true,
            },
          },
        });
        props.history.push("/confEmail");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setErr(err.response.data.message);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(event) => handleEmail(event)}
      />
      <br />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(event) => handlePassword(event)}
      />
      <br />
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(event) => handleUsername(event)}
      />
      <br />

      <br />
      <button onClick={() => handleSubmit()}>submit</button>
      <br></br>
      <Link to="/Login">
        <button>Login</button>
      </Link>
      <div>{err != null && err}</div>
    </div>
  );
}

export default Signup;
