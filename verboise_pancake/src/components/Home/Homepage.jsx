import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Spinner } from "react-bootstrap";

import moment from "moment";
import { Column } from "primereact/column";
import EventDelete from "./DeleteModal";
import "customcss/Event.scss";
import axios from "axios";
import "helper/axiosConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewEvent from "../Events/NewEvent";
import WelcomeMessage from "./WelcomeMessage";
import { useSelector, useDispatch } from "react-redux";

const EventList = () => {
  const [showDelete, setShowDelete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [eventData, setEventData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [reload, setReload] = useState(false);
  const [welcome, setWelcome] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const userInfo = useSelector((state) => state.SessionReducer);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/getEvent/${userInfo.userId}`)
      .then((res) => {
        console.log(res.data);
        let arr = [];
        if (res.data.length === 0) {
          setWelcome(true);
        } else {
          setWelcome(false);
        }

        res.data.forEach((elt) => [
          arr.push({
            eventId: elt.eventId,
            title: elt.title,
            eventType: elt.eventType,
            code: elt.code,
            status: elt.status,
            createdAt: moment(res.data[0].createdAt, "YYYYMMDD").fromNow(),
          }),
        ]);
        setEventData(arr);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload]);

  const hideDelModal = () => {
    setShowDelete(false);
  };

  const handleDelete = (e) => {
    //-----
  };
  const actionBodyTemplate = () => {
    return <FontAwesomeIcon icon="trash-alt" />;
  };

  const handleReload = (reload) => {
    if (reload) {
      setReload((prev) => !prev);
      console.log("big bang");
    }
  };

  const confirmDelete = () => {
    console.log("delete", selectedEvent);
    axios
      .delete(`/Event/${selectedEvent.eventId}`)
      .then((res) => {
        hideDelModal();
        setReload((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  };

  const onBeforeEditorHide = () => {
    setShowDelete(false);

    return;
  };
  const onBeforeEditorShow = (e) => {
    setSelectedEvent(e.columnProps.rowData);
    setShowDelete(true);
    return;
  };
  const modalOnHide = (x) => {
    setShowModal(false);
    if (x === "reload") {
      setReload((prev) => !prev);
    }
  };

  const modalOnShow = () => {
    setShowModal(true);
  };

  const showAddEventModal = () => {
    setShowModal(true);
  };
  const openEvent = (event) => {
    let eventData =event.columnProps.rowData
    eventData.tempQuestionArr =[]
    eventData.questionCount =0
    eventData.optionList =[]
    eventData.questionList =[]
    
    
    dispatch({
      type: "NEW_EVENT",
      payload: {
        event: eventData,
      },
    });
    history.push(`/Event/${event.columnProps.rowData.code}`);

  };

  return (
    <div>
      {loaded ? (
        <div>
          {welcome ? (
            <WelcomeMessage
              userName={userInfo.user.username}
              handleReload={handleReload}
            />
          ) : (
            <div>
              {showDelete && (
                <EventDelete
                  show={showDelete}
                  selEvent={selectedEvent}
                  handleClose={hideDelModal}
                  confirmDelete={confirmDelete}
                />
              )}{" "}
              {showModal && <NewEvent hide={modalOnHide} show={modalOnShow} />}
              <div className="btn-add">
                <Button onClick={() => showAddEventModal()}>New Event</Button>
              </div>
              <hr />
              <div className="card event-list">
                <DataTable value={eventData} headerClassName="test34">
                  <Column
                    field="title"
                    header="EventTitle"
                    editor={() => console.log("")}
                    onBeforeEditorShow={(event) => openEvent(event)}
                    bodyClassName="event-td"
                  ></Column>
                  <Column
                    headerStyle={{ width: "10em" }}
                    header="Created At"
                    bodyStyle={{ color: "gray" }}
                    field="createdAt"
                  ></Column>

                  <Column
                    body={actionBodyTemplate}
                    editor={(props) => handleDelete(props)}
                    onBeforeEditorHide={(props) => onBeforeEditorHide(props)}
                    onBeforeEditorShow={(props) => onBeforeEditorShow(props)}
                    headerStyle={{ width: "10em", textAlign: "center" }}
                    bodyStyle={{
                      textAlign: "center",
                      overflow: "visible",
                      color: "gray",
                    }}
                  ></Column>
                </DataTable>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="spinner" style={{ marginTop: "40vh" }}>
          <Spinner
            animation="border"
            role="status"
            variant="primary"
            size="x-lg"
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
    </div>
  );
};

export default EventList;
