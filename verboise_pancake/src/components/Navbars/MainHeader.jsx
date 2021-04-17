import React from "react";
import { useLocation, useHistory } from "react-router";
import Header from "../../layouts/header";

const MainHeader = (props) => {
  const route = useLocation();
  const history = useHistory();

  const renderLoginHeader = () => {
    if (route.pathname === "/login") {
      return (
        <Header>
          <a
            // href="#"
            style={{ color: "#42D0ED", fontSize: '1.1rem', textDecoration: "none" }}
            onClick={() => history.push("/signup")}
          >
            Create an account
          </a>
        </Header>
      );
    } else if (route.pathname === "/signup") {
      return (
        <Header>
          <a
            // href="#"
            style={{ color: "#42D0ED", textDecoration: "none" }}
            onClick={() => history.push("/login")}
          >
            Login
          </a>
        </Header>
      );
    } else {
      return <Header></Header>;
    }
  };

  return <div>{renderLoginHeader()}</div>;
};

export default MainHeader;
