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

const ApproveModal = ({ show, confirm, close, data }) => {
  const [reason, setReason] = useState("")
  return (
    <Modal id="modalPopUp" show={show} onHide={close} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>Approval Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row className="purpose">
            <Col>
            <Button onClick={confirm}>Please Confirm</Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
export default ApproveModal;