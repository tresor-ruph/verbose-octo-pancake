import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import 'helper/axiosConfig'

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  const dispatch = useDispatch();

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    const data = {
      em_usname: username,
      password,
    };
    console.log(data);
    axios
      .get("/Login/" + JSON.stringify(data))
      .then((res) => {
        setErr(null);
        const {id, token} = res.data.token
      
        dispatch({
          type: "LOG_IN",
          payload: {
            sessionId:token,
            userId: id,
            user: {
              username,
              isLogged: true,
            },
          },
        });
        if(res.status===203){
          console.log("we are here")
          props.history.push("/confEmail")
        }else if(res.status === 200){
          props.history.push("/")
        }
      
      })
      .catch((err) => {
        setErr(err.response.data.message);
        console.log(err.response);
      });
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
      <br />
      <Link to="/Signup">
        <button>Signup</button>
      </Link>
    </div>
  );
}

export default Login;
