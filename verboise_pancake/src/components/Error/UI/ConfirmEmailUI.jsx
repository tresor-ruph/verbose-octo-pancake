import React from "react";
import MainHeader from "components/Navbars/MainHeader";

const ConfirmEmailUI = (props) => {
  const { fromLoging, email, handleSendLink } = props;
  return (
    <div>
      <MainHeader />
      <div className="container bootstrap snippet">
        <div className="main-div">
          <div className="center-div">
            <p className="text-res">Confirm Account</p>
            <hr />

            <p>
              {!fromLoging
                ? `An activation EMail has been sent to ${email}. Please follow the
              mail instructions in orther to activate your account`
                : `Your account has not been activated. Please verify your mails for the activation link`}
            </p>
            <p style={{ marginTop: "50px", fontSize: "12px" }}>
              Did not recieve the Mail ?{" "}
              <a
                // href=""
                style={{ color: "#42D0ED", textDecoration: "none" }}
                onClick={() => handleSendLink()}
              >
                resend Link
              </a>
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmailUI;
