import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";

import WelcomeMessage from "./WelcomeMessage";
import EventList from "./Eventlist";
import axios from "axios";
import "helper/axiosConfig";
import { TramRounded } from "@material-ui/icons";

const HomePage = () => {
  const [eventData, setEventData] = useState("");
  const [loaded, setLoaded] = useState(false);
  const userInfo = useSelector((state) => state.SessionReducer);

  useEffect(() => {
    axios
      .get(`/getEvent/${userInfo.userId}`)
      .then((res) => {
        setEventData(res.data);
        setLoaded(TramRounded);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const returnHome = () => {
    return eventData.length > 0 ? (
      <EventList userId ={userInfo.userId} />
    ) : (
      <WelcomeMessage userName={userInfo.user.username} />
    );
  };
  

  return (
    <div>
     {!loaded ? <div className="spinner" style= {{marginTop: '40vh'}}>
        <Spinner animation="border" role="status" variant="primary" size="x-lg">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>: returnHome() }
      
    </div>
  );
};
export default HomePage;