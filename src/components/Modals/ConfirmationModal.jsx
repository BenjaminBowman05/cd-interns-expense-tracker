import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";

const ConfirmationModal = ({ show, confirm, close, data }) => {
  return (
    <Modal id="modalPopUp" show={show} onHide={close} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {data.requesterSupervisor ? "Approval" : "Denial"}
          Confirmation
        </Modal.Title>
      </Modal.Header>
      {data.requesterSupervisor ? (
        ""
      ) : (
        <Modal.Body>
          <Container fluid>
            <Row className="purpose">
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Reason for Denial"
                >
                  <Form.Control
                    placeholder={""}
                    onChange={(e) => {
                      // setReason(e.target.value);
                      data.reason = e.target.value;
                    }}
                    onPaste={(e) => {
                      // setReason(e.clipboardData.getData('text'));
                      data.reason = e.clipboardData.getData('text');
                    }}
                  />
                </FloatingLabel>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      )}
      <Modal.Footer>
        <Button onClick={(e) => confirm()}>Please Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ConfirmationModal;
