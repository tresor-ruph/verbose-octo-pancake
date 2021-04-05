import React from "react";
import axios from "axios";
import ls from "local-storage";
import "helper/axiosConfig";

import MainHeader from "components/Navbars/MainHeader";
import { Button } from "react-bootstrap";

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
    // <div>
    //   <h1>Validate your email</h1>
    //   <button onClick={() => handleSendLink()}>resend link</button>
    //   <br />
    //   <button>Home</button>
    // </div>

    <div>
      <MainHeader />
      <div className="container bootstrap snippet">
        <div className="main-div">
          <div className="center-div">
            <p className="text-res">Confirm Account</p>
            <hr />

            <p>
              An activation EMail has been sent to {email}. Please follow the
              mail instructions in orther to activate your account{" "}
            </p>
            <p style={{ marginTop: "50px", fontSize: "12px" }}>
              Did not recieve the Mail ?   <a
              href=""
              style={{ color: "#42D0ED", textDecoration: "none" }}
              onClick={() => handleSendLink()}
            >
              resend Link
            </a>
            </p>
          
            {/* <Button
              className="btn-fill pull-right"
              type="submit"
              variant="info"
              onClick={() => handleSendLink()}
            >
              Resent Link
            </Button> */}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
