import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import loginImage from "assets/images/auth/login.svg"
import {returnHeader} from "helper/customMixin"

 import "customcss/login.css";

import LoginUI from "components/authentification/UI/LoginUI";

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
      signInSuccessWithAuthResult: ({ user }) => {
        handleSubmit({
          email: user.email,
          password: user.uid,
          username: user.displayName,
          social: true,
        });
      },
    },
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notif, setNotif] = useState(false);
  const [notifMess, setnotifMess] = useState("");
  const [variant, setVariant] = useState("");
  const toast = useRef(null);

  const user = useRef(null);
  const passwd = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {});
  }, []);
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleUserFocus = () => {
    user.current.classList.add("field--not-empty");
  };
  const handleUserBlur = () => {
    if (username.length === 0)
      user.current.classList.remove("field--not-empty");
  };
  const handlePasswordFocus = () => {
    passwd.current.classList.add("field--not-empty");
  };
  const handlePasswordBlur = () => {
    if (password.length === 0)
      passwd.current.classList.remove("field--not-empty");
  };

  const handleSubmit = (
    data = {
      em_usname: "",
      password: "",
    }
  ) => {
    if (data.em_usname !== "" || data.email !== undefined) {
      axios
        .get("/Login/" + JSON.stringify(data))
        .then((res) => {
          const id = res.data.user[0].userId
          const token = res.data.token
          const picture = res.data.user[0].imageUrl
          const accountStatus = res.data.user[0].accountStatus

          dispatch({
            type: "LOG_IN",
            payload: {
              sessionId: token,
              userId: id,
              user: {
                username: data.username ? data.username : username,
                isLogged: res.status == 200 ? true : false,
                picture: picture,
                status: accountStatus
              },
            },
          });

          if (res.status === 203) {
            props.history.push(`/confEmail/${id}`,'login');
          } else if (res.status === 200) {
            window.location.reload("/");
          }
        })
        .catch((err) => {
          console.log(err)
         
          if(err?.response?.status === 400){
          toast.current.show({severity:'error', summary: 'Error', detail:'Invalid credentials', life: 5000});
          }else {
            toast.current.show({severity:'error', summary: 'Error', detail:'an error occured', life: 5000});
          }
        
        });
    }
  };

  return (
    <LoginUI
    MainHeader={returnHeader()}
      notif={notif}
      variant={variant}
      setNotif={setNotif}
      notifMess={notifMess}
      loginImage={loginImage}
      user={user}
      username={username}
      handleUserFocus={handleUserFocus}
      handleUserBlur={handleUserBlur}
      handleUsername={handleUsername}
      passwd={passwd}
      password={password}
      handlePasswordFocus={handlePasswordFocus}
      handlePasswordBlur={handlePasswordBlur}
      handlePassword={handlePassword}
      handleSubmit={handleSubmit}
      toast={toast}
     
    >
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </LoginUI>
  );
}

export default Login;
