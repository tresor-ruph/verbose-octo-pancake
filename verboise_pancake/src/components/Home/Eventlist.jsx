import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import moment from "moment";
import { Column } from "primereact/column";
import EventDelete from "./DeleteModal";
import "customcss/Event.scss";
import axios from "axios";
import "helper/axiosConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewEvent from "../Events/NewEvent";



const EventList = ({ userId }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [eventData, setEventData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [reload, setReload] = useState(false);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`/getEvent/${userId}`)
      .then((res) => {
        console.log(res.data);
        let arr = [];
        if(res.data.length === 0){
          window.location.reload("/dashboard/event");
        }

        res.data.forEach((elt) => [
          arr.push({
            eventId: elt.eventId,
            title: elt.title,
            eventType: elt.eventType,
            createdAt: moment(res.data[0].createdAt, "YYYYMMDD").fromNow(),
          }),
        ]);
        setEventData(arr);
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
    if(x=== 'reload'){
      setReload(prev => !prev)
    }
  };

  const modalOnShow = () => {
    setShowModal(true);
    
  };

  const showAddEventModal = () => {
    setShowModal(true)
  }
  const openEvent = () => {
    history.push("/dashboard/gallup");
  };

  
  return (
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
        <Button onClick ={() => showAddEventModal()}>New Event</Button>
      </div>
      <hr />
      <div className="card event-list">
        <DataTable value={eventData} headerClassName="test34">
          <Column
            field="title"
            header="EventTitle"
            editor={(props) => openEvent(props)}
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
  );
};

export default EventList;
