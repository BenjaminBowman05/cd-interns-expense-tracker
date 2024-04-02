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
      </Modal.Header>
      <Modal.Body>
        {/* <h4>{data[0].lastName}</h4> */}
        <Container fluid className="mb-5">
        <h1>Expense Request Form</h1>
      </Container>
      <Container fluid>
        <Row className="user mb-3">
          <Col>
            <FloatingLabel controlId="floatingInput" label="First Name">
              {data[0].firstName}
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="floatingInput" label="Last Name">
              {data[0].lastName}
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="floatingInput" label="Date">
              {data[0].currDate}
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="itemsRequested mb-3">
          <Col>
            {data[0].items}
          </Col>
        </Row>
        <Row className="purpose">
          <Col>
            <FloatingLabel controlId="floatingInput" label="Purpose Of Request">
              {data[0].purpose}
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="selectedPrograms">
          <ul className="selectedPrograms-List">
            {data[0].programs.map((program) => (
              <li key={program}>
                <InputGroup className="mt-3">
                  <InputGroup.Text>{program} cost: </InputGroup.Text>
                </InputGroup>
              </li>
            ))}
          </ul>
        </Row>
        <Row className="program-dropdown mb-3">
          <Col>
            <InputGroup size="lg">
              <InputGroup.Text>Programs</InputGroup.Text>
              <Dropdown disabled="true">
                <Dropdown.Toggle variant="outline-info"></Dropdown.Toggle>
              </Dropdown>
            </InputGroup>
          </Col>
          <Col>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <FloatingLabel controlId="floatingInput" label="Total">
                {data[0].total}
              </FloatingLabel>
            </InputGroup>
          </Col>
        </Row>

        <Row className="dateNeeded mb-3">
          <Col>
            <FloatingLabel controlId="floatingInput" label="Date Needed">
                {data[0].dateNeeded}
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="signatures mb-3">
          <Col>
            <FloatingLabel controlId="floatingInput" label="Requestor">
              {data[0].signatures.requestor}
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel
              controlId="floatingInput"
              label="Requestor Supervisor"
            >
                {data[0].signatures.requestorSupervisor}
                
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel
              controlId="floatingInput"
              label="Director Of Operations"
            >
              {data[0].signatures.DOO}
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="floatingInput" label="CEO">
              {data[0].signatures.CEO}
            </FloatingLabel>
          </Col>
        </Row>
      </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={close}>Cancel</Button>
      </Modal.Footer>
    </Modal>
      );
}
export default FormPopUp;