// import {Modal,Button} from 'react-bootstrap'
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const DeleteModal = ({ show, selEvent, handleClose, confirmDelete }) => {
  const footer = (
    <div style={{ textAlign: "center" }}>
      <Button className='p-button-danger p-button-sm' onClick={() => handleClose()}>
        Annuler
      </Button>
      <Button className='p-button-sm ' onClick={() => confirmDelete()}>
        supprimer
      </Button>
    </div>
  );

  return (
    <Dialog
      header="Créer un événement"
      showHeader={false}
      footer={footer}
      visible={true}
      style={{ width: "45vw" }}
      modal
      closable={false}
    >
      <div style = {{marginTop: '3vh', textAlign: 'center'}}>
        Voulez-vous vraiment supprimer l'événement :{selEvent.title || ""}
      </div>
    </Dialog>
  );
};

export default DeleteModal;
