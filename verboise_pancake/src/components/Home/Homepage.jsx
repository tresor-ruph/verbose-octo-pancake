import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chip } from "primereact/chip";
import { Column } from "primereact/column";
import axios from "axios";
import "helper/axiosConfig";

import EventDelete from "./DeleteModal";
import NewEvent from "../Events/NewEvent";
import WelcomeMessage from "./WelcomeMessage";
import "customcss/Event.scss";

/**
 * Page d'accueil principale affichant la liste des événements de l'utilisateur
 * 
 * @component EventList
 * @description Interface principale permettant aux utilisateurs de visualiser, 
 * gérer et créer leurs événements. Affiche un message de bienvenue si aucun 
 * événement n'existe, sinon présente un tableau paginé avec les détails des événements.
 * 
 * @returns {JSX.Element} Interface de gestion des événements avec tableau et actions
 * 
 * Fonctionnalités principales :
 * - Affichage conditionnel (message de bienvenue vs liste d'événements)
 * - Création de nouveaux événements via modale
 * - Suppression d'événements avec confirmation
 * - Navigation vers les détails d'un événement
 * - Pagination et tri des données
 * - Indicateurs visuels de statut et type d'événement
 * 
 * @example
 * <EventList />
 */
const EventList = () => {
  // États pour la gestion des modales et interface utilisateur
  const [showDelete, setShowDelete] = useState(false); // Contrôle l'affichage de la modale de suppression
  const [showModal, setShowModal] = useState(false); // Contrôle l'affichage de la modale de création d'événement
  const [eventData, setEventData] = useState([]); // Données des événements à afficher dans le tableau
  const [selectedEvent, setSelectedEvent] = useState(null); // Événement sélectionné pour suppression
  const [reload, setReload] = useState(false); // Trigger pour recharger les données
  const [welcome, setWelcome] = useState(false); // Détermine si l'écran de bienvenue doit être affiché
  const [loaded, setLoaded] = useState(false); // Indique si les données ont été chargées

  const userInfo = useSelector((state) => state.SessionReducer);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/getEvent/${userInfo.userId}`)
      .then((res) => {
        let arr = [];
        if (res.data.length === 0) {
          setWelcome(true);
        } else {
          setWelcome(false);
        }
        res.data.forEach((elt) => {
          let dataFormat = elt.createdAt.split("T")[0];
          arr.push({
            eventId: elt.eventId,
            title: elt.title,
            eventType: elt.eventType,
            code: elt.code,
            status: elt.status,
            createdAt: dataFormat,
          });
        });
        setEventData(arr);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload]);

  /**
   * Ferme la modale de suppression d'événement
   */
  const hideDelModal = () => {
    setShowDelete(false);
  };

  /**
   * Gestionnaire pour l'action de suppression (placeholder)
   * @param {Object} e - Événement de suppression
   */
  const handleDelete = (e) => {
    //-----
  };

  /**
   * Template pour afficher l'icône de suppression dans le tableau
   * @returns {JSX.Element} Icône de corbeille pour la suppression
   */
  const actionBodyTemplate = () => {
    return <FontAwesomeIcon icon="trash-alt" />;
  };

  /**
   * Gère le rechargement des données d'événements
   * @param {boolean} reload - Indique si un rechargement est nécessaire
   */
  const handleReload = (reload) => {
    if (reload) {
      setReload((prev) => !prev);
    }
  };

  /**
   * Confirme et exécute la suppression d'un événement
   */
  const confirmDelete = () => {
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

  /**
   * Gestionnaire appelé avant de masquer l'éditeur (suppression)
   */
  const onBeforeEditorHide = () => {
    setShowDelete(false);
    return;
  };

  /**
   * Gestionnaire appelé avant d'afficher l'éditeur (suppression)
   * @param {Object} e - Événement contenant les données de la ligne
   */
  const onBeforeEditorShow = (e) => {
    setSelectedEvent(e.columnProps.rowData);
    setShowDelete(true);
    return;
  };

  /**
   * Gère la fermeture de la modale de création d'événement
   * @param {string} x - Paramètre indiquant si un rechargement est nécessaire
   */
  const modalOnHide = (x) => {
    setShowModal(false);
    if (x === "reload") {
      setReload((prev) => !prev);
    }
  };

  /**
   * Ouvre la modale de création d'événement
   */
  const modalOnShow = () => {
    setShowModal(true);
  };

  /**
   * Affiche la modale d'ajout d'événement
   */
  const showAddEventModal = () => {
    setShowModal(true);
  };
  /**
   * Ouvre un événement pour modification/gestion
   * Initialise les données de l'événement dans Redux et navigue vers la page de détail
   * @param {Object} event - Événement contenant les données de la ligne sélectionnée
   */
  const openEvent = (event) => {
    let eventData = event.columnProps.rowData;
    // Initialisation des propriétés pour la gestion des questions et options
    eventData.tempQuestionArr = [];
    eventData.questionCount = 0;
    eventData.optionList = [];
    eventData.questionList = [];

    // Mise à jour du store Redux avec les données de l'événement
    dispatch({
      type: "NEW_EVENT",
      payload: {
        event: eventData,
      },
    });

    // Navigation vers la page de gestion de l'événement
    history.push(`/Event/${event.columnProps.rowData.code}`);
  };

  /**
   * Template pour afficher le statut d'un événement avec les couleurs appropriées
   * @param {Object} rowData - Données de la ligne contenant le statut
   * @returns {JSX.Element} Chip coloré avec le statut traduit
   */
  const statusBodyTemplate = (rowData) => {
    if (rowData.status === "In progress") {
      return (
        <Chip
          label='En cours'
          className={`status-progress p-mr-2 p-mb-2 chip`}
        />
      );
    } else if (rowData.status === "inactive") {
      return (
        <Chip
          label='En attente'
          className={`status-${rowData.status.toLowerCase()} p-mr-2 p-mb-2 chip`}
        />
      );
    } else {
      return (
        <Chip
          label='Terminé'
          className={`status-${rowData.status.toLowerCase()} p-mr-2 p-mb-2 chip`}
        />
      );
    }
  };
  /**
   * Template pour afficher l'icône correspondant au type d'événement
   * @param {Object} rowData - Données de la ligne contenant le type d'événement
   * @returns {JSX.Element} Icône FontAwesome représentant le type d'événement
   */
  const typeBodyTemplate = (rowData) => {
    if (rowData.eventType === "gallup") {
      return (
        <div>
          <FontAwesomeIcon color="#888" icon="chart-line" size="1x" />
        </div>
      );
    } else if (rowData.eventType === "polls") {
      return (
        <div>
          <FontAwesomeIcon color="#888" icon="chart-bar" size="1x" />
        </div>
      );
    } else if (rowData.eventType === "ranking") {
      return (
        <div>
          <FontAwesomeIcon icon="trophy" color="#888" size="1x" />
        </div>
      );
    }
  };

  return (
    <div className="evt-list-container">
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
                <Button
                  className="p-shadow-4"
                  style={{ backgroundColor: "#00C0F8", fontWeight: "500" }}
                  onClick={() => showAddEventModal()}
                >
                  Créer un événement
                </Button>
              </div>
              <hr />
              <div className="card event-list">
                <DataTable
                  value={eventData}
                  className="p-datatable-striped datatable-responsive-demo p-datatable-sm p-shadow-4"
                  paginator
                  paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                  currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} événements"
                  rows={6}
                  rowsPerPageOptions={[6, 16, 30]}
                >
                  <Column
                    field="title"
                    header="Nom de l'événement"
                    editor={() => console.log("")}
                    onBeforeEditorShow={(event) => openEvent(event)}
                    bodyClassName="event-td"
                    sortable
                  ></Column>
                  <Column
                    field="status"
                    header="Statut"
                    body={statusBodyTemplate}
                    sortable
                  />
                  <Column field="Type" header="Type" body={typeBodyTemplate} />

                  <Column
                    headerStyle={{ width: "10em" }}
                    header="Date de création"
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
        <div
          className="spinner p-d-flex p-jc-center"
          style={{ marginTop: "40vh" }}
        >
          <ProgressSpinner />
        </div>
      )}
    </div>
  );
};

export default EventList;
