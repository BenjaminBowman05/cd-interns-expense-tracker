import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";

const FormPopUp = ({ show, close, data }) => {
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
                      value={data[0].firstName}
                      placeholder={data[0].firstName}
                    />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="floatingInput" label="Last Name">
              <Form.Control disabled
                      value={data[0].lastName}
                      placeholder={data[0].lastName}
                    />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="floatingInput" label="Date">
              <Form.Control disabled
                      value={data[0].dateOfExpense}
                      placeholder={data[0].dateOfExpense}
                    />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="itemsRequested mb-3">
            <Col>
              <Form.Control disabled
                value={data[0].items}
                placeholder={data[0].items}
              />
            </Col>
          </Row>
          <Row className="purpose">
            <Col>
              <FloatingLabel controlId="floatingInput" label="Purpose Of Request">
                <Form.Control disabled
                  value={data[0].purpose}
                  placeholder={data[0].purpose}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="selectedPrograms">
            <ul className="selectedPrograms-List">
              {data[0].expensePrograms.map((program) => (
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
                    value={data[0].total}
                    placeholder={data[0].total}
                  />
                </FloatingLabel>
              </InputGroup>
            </Col>
          </Row>

          <Row className="dateNeeded mb-3">
            <Col>
              <FloatingLabel controlId="floatingInput" label="Date Needed">
                <Form.Control disabled
                  value={data[0].dateNeeded}
                  placeholder={data[0].dateNeeded}
                />
              </FloatingLabel>
            </Col>
          </Row>

          {/* <Row className="signatures mb-3">
            <Col>
              <FloatingLabel controlId="floatingInput" label="Requestor">
                <Form.Control disabled
                  value={data[0].signatures.requestor}
                  placeholder={data[0].signatures.requestor}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Requestor Supervisor"
              >
                <Form.Control disabled
                  value={data[0].signatures.requestorSupervisor}
                  placeholder={data[0].signatures.requestorSupervisor}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Director Of Operations"
              >
                <Form.Control disabled
                  value={data[0].signatures.DOO}
                  placeholder={data[0].signatures.DOO}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="floatingInput" label="CEO">
                <Form.Control disabled
                  value={data[0].signatures.CEO}
                  placeholder={data[0].signatures.CEO}
                />

              </FloatingLabel>
            </Col>
          </Row> */}
        </Container>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={close}>Cancel</Button>
      </Modal.Footer> */}
    </Modal>
  );
}
export default FormPopUp;