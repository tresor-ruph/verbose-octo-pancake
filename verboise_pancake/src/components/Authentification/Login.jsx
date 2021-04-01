import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "helper/axiosConfig";
import "helper/firebaseConfig";

function Login(props) {
  let uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: ({user}) =>{
        handleSubmit({
          email: user.email,
          password: user.uid,
          username: user.displayName,
          social: true,
        });
       
      }
    },
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
      firebase.auth().onAuthStateChanged((user) => {
      });
    

  }, []);
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (
    data = {
      em_usname: "",
      password: "",
    }
  ) => {
    if (data.em_usname !== "" || data.email !== undefined) {
      console.log(data);
      axios
        .get("/Login/" + JSON.stringify(data))
        .then((res) => {
          console.log(res);
          console.log(res.status)
          setErr(null);
          const { id, token } = res.data.token;

          dispatch({
            type: "LOG_IN",
            payload: {
              sessionId: token,
              userId: id,
              user: {
                username: data.username ? data.username : username,
                isLogged: res.status== 200 ? true : false,
              },
            },
          });
          if (res.status === 203) {
            props.history.push(`/confEmail/${id}`);
          } else if (res.status === 200) {
            window.location.reload("/home/")
          }
        })
        .catch((err) => {
          setErr(err.response.data.message);
        });
    }
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
      <button
        onClick={() =>
          handleSubmit({
            em_usname: username,
            password,
          })
        }
      >
        submit
      </button>
      <br />
      <div>
        <Link to="/Signup">
          <button>Signup</button>
        </Link>
      </div>
      <div>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
      <div>
        <button
          onClick={() =>
            firebase
              .auth()
              .signOut()
              .then(() => console.log("sign out"))
              .catch((err) => console.log(err))
          }
        >
          Sign out!
        </button>      
      </div>
      <div>
        <button onClick={() =>props.history.push('/resetpassword/test') }>reset password</button>
      </div>
    </div>
  );
}

export default Login;
