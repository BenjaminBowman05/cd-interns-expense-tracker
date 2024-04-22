import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";

const ConfirmationModal = ({ show, confirm, close, data }) => {
  const [reason, setReason] = useState("")
  return (
    <Modal id="modalPopUp" show={show} onHide={close} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>{data[0].requesterSupervisor ? "Approval" : "Denial"} Confirmation</Modal.Title>
      </Modal.Header>
      {data[0].requesterSupervisor ? "" : 
        <Modal.Body>
                <Container fluid>
                    <Row className="purpose">
                        <Col>
                            <FloatingLabel controlId="floatingInput" label="Reason for Denial">
                                <Form.Control
                                    value={reason}
                                    placeholder={""}
                                    onChange={(e) => setReason(e.target.value)}
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            }
      <Modal.Footer>
            <Button onClick={confirm}>Please Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ConfirmationModal;