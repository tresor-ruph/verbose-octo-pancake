import React from "react";
import { useLocation } from "react-router";
import NotFoundUI from "components/Error/UI/NotFoundUI";
import { returnHeader } from "helper/customMixin";

const NotFound = () => {
  let expireLink = false;
  const location = useLocation();
  location.pathname === "/error" ? (expireLink = true) : (expireLink = false);
  return <NotFoundUI MainHeader={returnHeader} expireLink={expireLink} />;
};

export default NotFound;
