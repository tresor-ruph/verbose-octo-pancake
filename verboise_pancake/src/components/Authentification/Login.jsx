import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Link} from 'react-router-dom'

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleLogIn = () => {
    dispatch({
      type: "LOG_IN",
      payload: { sessionId: "azerty", user: { userName } },
    });
  };
  return (
    <div>
      <input
        type="text"
        placeholder="username"
        onChange={(event) => setUserName(event.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <br />
     <Link to='/Home'> <button onClick={() => handleLogIn()}>Login</button></Link>
    </div>
  );
};

export default Login;
