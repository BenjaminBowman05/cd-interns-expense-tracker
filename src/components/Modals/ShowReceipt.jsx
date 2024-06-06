import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { CloseButton } from "react-bootstrap";

const ShowReceipt = ({ show, close, data }) => {
  console.log(data)
  return (
    <Modal size="lg" show={show} onHide={close}>
      <Modal.Header>
        <Modal.Title>Receipt</Modal.Title>
        <CloseButton onClick={close}/>
      </Modal.Header>
      <Modal.Body id="modal-body" className="d-flex justify-content-center">
        <embed src={data.receipt} width="500px" height="500px"></embed>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="outline-primary" onClick={console.log(data)}>
          Update Purchaser
        </Button>
        {/* <Button variant="outline-danger" onClick={close}>
          Close
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default ShowReceipt;
