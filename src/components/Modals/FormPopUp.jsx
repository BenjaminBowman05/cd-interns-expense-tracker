import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";

const FormPopUp = ({ show, close, data, reqId }) => {
  return (
    <Modal id="modalPopUp" show={show} onHide={close} size="lg" centered>
      <Modal.Header closeButton>
      <Modal.Title>Expense Request Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row className="user mb-3">
            <Col>
              <FloatingLabel controlId="floatingInput" label="First Name">
              <Form.Control disabled
                      value={data[reqId - 1].firstName}
                      placeholder={data[reqId - 1].firstName}
                    />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="floatingInput" label="Last Name">
              <Form.Control disabled
                      value={data[reqId - 1].lastName}
                      placeholder={data[reqId - 1].lastName}
                    />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="itemsRequested mb-3">
            <Col>
              <Form.Control disabled
                value={data[reqId - 1].items}
                placeholder={data[reqId - 1].items}
              />
            </Col>
          </Row>
          <Row className="purpose">
            <Col>
              <FloatingLabel controlId="floatingInput" label="Purpose Of Request">
                <Form.Control disabled
                  value={data[reqId - 1].purpose}
                  placeholder={data[reqId - 1].purpose}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="selectedPrograms">
            <ul className="selectedPrograms-List">
              {data[reqId - 1].expensePrograms.map((program) => (
                <li key={Math.random()}>
                  <InputGroup className="mt-3">
                    <InputGroup.Text>{program.programName} cost: </InputGroup.Text>
                    <Form.Control disabled
                      value={program.cost}
                      placeholder={program.cost}
                    />
                  </InputGroup>
                </li>
              ))}
            </ul>
          </Row>
          <Row className="program-dropdown mb-3">
            <Col>
              <InputGroup size="lg">
                <InputGroup.Text>Programs</InputGroup.Text>
                <Dropdown>
                  <Dropdown.Toggle disabled variant="outline-secondary"></Dropdown.Toggle>
                </Dropdown>
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <FloatingLabel controlId="floatingInput" label="Total">
                  <Form.Control disabled
                    value={data[reqId - 1].total}
                    placeholder={data[reqId - 1].total}
                  />
                </FloatingLabel>
              </InputGroup>
            </Col>
          </Row>

          <Row className="dateNeeded mb-3">
            <Col>
              <FloatingLabel controlId="floatingInput" label="Date Needed">
                <Form.Control disabled
                  value={data[reqId - 1].dateNeeded}
                  placeholder={data[reqId - 1].dateNeeded}
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="signatures mb-3">
            <Col>
              <FloatingLabel controlId="floatingInput" label="Requestor">
                <Form.Control disabled
                  value={data[reqId - 1].requester == true ? "Aproved" : "Pending"}
                  placeholder={data[reqId - 1].requester == true ? "Aproved" : "Pending"}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Requestor Supervisor"
              >
                <Form.Control disabled
                  value={data[reqId - 1].requestorSupervisor == true ? "Aproved" : "Pending"}
                  placeholder={data[reqId - 1].requestorSupervisor == true ? "Aproved" : "Pending"}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Director Of Operations"
              >
                <Form.Control disabled
                  value={data[reqId - 1].DOO == true ? "Aproved" : "Pending"}
                  placeholder={data[reqId - 1].DOO == true ? "Aproved" : "Pending"}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="floatingInput" label="CEO">
                <Form.Control disabled
                  value={data[reqId - 1].CEO == true ? "Aproved" : "Pending"}
                  placeholder={data[reqId - 1].CEO == true ? "Aproved" : "Pending"}
                />

              </FloatingLabel>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={close}>Cancel</Button>
      </Modal.Footer> */}
    </Modal>
  );
}
export default FormPopUp;