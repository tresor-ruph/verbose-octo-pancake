import React from "react";
import NotFoundUI from "components/Error/UI/NotFoundUI";
import {useLocation} from 'react-router'
import { returnHeader } from "helper/customMixin";

const NotFound = () => {
  let expireLink = false;
  let location =useLocation()
  location.pathname === "/error" ? (expireLink = true) : (expireLink = false);
  return <NotFoundUI expireLink={expireLink} />;
};

export default NotFound;
