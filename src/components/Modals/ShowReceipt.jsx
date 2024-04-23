import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const ShowReceipt = ({ show, close, data, reqId }) => {
  return (
    <Modal size="lg" show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Receipt</Modal.Title>
      </Modal.Header>
      <Modal.Body id="modal-body">
        <embed src={data[reqId - 1].receipt} width="500px" height="500px"></embed>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={close}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowReceipt;
