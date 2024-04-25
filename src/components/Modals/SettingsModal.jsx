import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const SettingsModal = ({show, hide}) => {
  return (
    <Modal size="lg" show={show} onHide={hide}>
        <Modal.Header closeButton>
            <Modal.Title>Receipt</Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal-body">
            <Button variant="outline-danger">
                Close
            </Button>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-danger" onClick={hide}>
            Close
            </Button>
        </Modal.Footer>
    </Modal>
  );
};

export default SettingsModal;