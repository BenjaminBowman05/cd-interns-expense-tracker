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

const PurchaserModal = ({ show, confirm, close, data }) => {
    return (
        <Modal id="modalPopUp" show={show} onHide={close} size="md" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Purchase Information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid>
                    <Row className="purpose">
                        <Col>
                            <Row>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Full Name of Purchaser"
                                >
                                    <Form.Control
                                        placeholder={""}
                                        onChange={(e) => {
                                            // setReason(e.target.value);
                                            data.purchaser = e.target.value;
                                        }}
                                        onPaste={(e) => {
                                            // setReason(e.clipboardData.getData('text'));
                                            data.purchaser = e.clipboardData.getData('text');
                                        }}
                                    />
                                </FloatingLabel>
                            </Row>
                            <Row>
                                <FloatingLabel controlId="floatingInput" label="Date of Delivery">
                                    <Form.Control
                                        type="date"
                                        onChange={(e) => (data.dateDelivered = e.target.value)}
                                    />
                                </FloatingLabel>
                            </Row>

                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={(e) => confirm()}>Please Confirm</Button>
            </Modal.Footer>
        </Modal>
    );
};
export default PurchaserModal;