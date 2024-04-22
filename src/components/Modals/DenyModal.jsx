import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";

const DenyModal = ({ show, confirm, close, data }) => {
    //Temp could be replaced with a new obj slot
    const [reason, setReason] = useState("")
    return (
        <Modal id="modalPopUp" show={show} onHide={close} size="md" centered>
            <Modal.Header closeButton>
                <Modal.Title>Denial Confirmation</Modal.Title>
            </Modal.Header>
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
            <Modal.Footer>
                <Button onClick={confirm}>Confirm Denial</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default DenyModal;