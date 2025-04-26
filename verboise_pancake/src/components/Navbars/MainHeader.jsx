import React from "react";
import { useLocation, useHistory } from "react-router";
import Header from "../../layouts/header";

const MainHeader = (props) => {
  const route = useLocation();
  const history = useHistory();

  const renderLoginHeader = () => {
    return <Header />
  };

  return <div>{renderLoginHeader()}</div>;
};

export default MainHeader;
