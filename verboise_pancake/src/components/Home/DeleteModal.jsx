import {Modal,Button} from 'react-bootstrap'
const DeleteModal = ({ show, selEvent, handleClose,confirmDelete }) => {
  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
    //   onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          {console.log('test2',selEvent)}
        Do you really want to delete the event :{selEvent.title || ''}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() =>handleClose()}>
          Close
        </Button>
        <Button variant="danger" onClick={() =>confirmDelete()}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
