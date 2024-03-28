import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import ListGroup from "react-bootstrap/ListGroup";

import { useState } from "react";

const PurchaseRequestForm = () => {
  const [formInfo, setFormInfo] = useState({
    firstName: "",
    lastName: "",
    currDate: "",
    items: "",
    purpose: "",
    programs: [
      {
        program: "",
        cost: 0,
      },
    ],
    total: 0,
    dateNeeded: "",
    signatures: {
      requestor: "",
      requestorSupervisor: "",
      DOO: "",
      CEO: "",
    },
  });

  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [programs, setPrograms] = useState([
    "Program 1",
    "Program 2",
    "Program 3",
    "Program 4asdasdsadas",
  ]);

  const handleInputChange = (event, fieldName, parentField = null) => {
    //let inputs = document.getElementsByClassName("form-control");
    console.log(formInfo);
    if (parentField) {
      setFormInfo({
        ...formInfo,
        [parentField]: {
          ...formInfo[parentField],
          [fieldName]: event.target.value,
        },
      });
    } else {
      setFormInfo({ ...formInfo, [fieldName]: event.target.value });
    }
  };

  const appendProgram = (event) => {
    setSelectedPrograms([...selectedPrograms, event.target.textContent]);
  };

  const deleteProgram = (event) => {
    let array = [...selectedPrograms];
    array.splice(event.target.id - 1, 1);
    setSelectedPrograms(array);
  };

  return (
    <>
      <Container fluid className="mb-5">
        <h1>Expense Request Form</h1>
      </Container>
      <Container fluid>
        <Row className="user mb-3">
          <Col>
            <FloatingLabel controlId="floatingInput" label="First Name">
              <Form.Control
                type="firstName"
                placeholder="John"
                value={formInfo.firstName}
                onChange={(e) => handleInputChange(e, "firstName")}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="floatingInput" label="Last Name">
              <Form.Control
                type="lastName"
                placeholder="Doe"
                value={formInfo.lastName}
                onChange={(e) => handleInputChange(e, "lastName")}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="floatingInput" label="Date">
              <Form.Control
                type="date"
                value={formInfo.currDate}
                onChange={(e) => handleInputChange(e, "currDate")}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="itemsRequested mb-3">
          <Col>
            <Form.Control
              as="textarea"
              rows="4"
              placeholder="Items Requested..."
              value={formInfo.items}
              onChange={(e) => handleInputChange(e, "items")}
            />
          </Col>
        </Row>
        <Row className="purpose">
          <Col>
            <FloatingLabel controlId="floatingInput" label="Purpose Of Request">
              <Form.Control
                type="purpose"
                placeholder="Purpose goes here..."
                value={formInfo.purpose}
                onChange={(e) => handleInputChange(e, "purpose")}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="selectedPrograms">
          <ul className="selectedPrograms-List">
            {selectedPrograms.map((program, index) => (
              <li key={index + 1} id={index + 1}>
                <InputGroup className="mt-3">
                  <InputGroup.Text>{program} cost: </InputGroup.Text>
                  <Form.Control as="input" />
                  <Button
                    onClick={deleteProgram}
                    variant="outline-danger"
                    id={index + 1}
                  >
                    X
                  </Button>
                </InputGroup>
              </li>
            ))}
          </ul>
        </Row>
        <Row className="program-dropdown mb-3">
          <Col>
            <InputGroup>
              <InputGroup.Text>Programs</InputGroup.Text>
              <Dropdown>
                <Dropdown.Toggle variant="outline-info"></Dropdown.Toggle>

                <Dropdown.Menu>
                  {programs.map((program, index) => (
                    <Dropdown.Item
                      key={index + 1}
                      id={index + 1}
                      as="button"
                      onClick={appendProgram}
                    >
                      {program}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </InputGroup>
          </Col>
          <Col>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <FloatingLabel controlId="floatingInput" label="Total">
                <Form.Control
                  placeholder="Total Calculated Amount"
                  value={formInfo.total}
                  onChange={(e) => handleInputChange(e, "total")}
                />
              </FloatingLabel>
            </InputGroup>
          </Col>
        </Row>

        <Row className="dateNeeded mb-3">
          <Col>
            <FloatingLabel controlId="floatingInput" label="Date Needed">
              <Form.Control
                type="date"
                value={formInfo.dateNeeded}
                onChange={(e) => handleInputChange(e, "dateNeeded")}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="signatures mb-3">
          <Col>
            <FloatingLabel controlId="floatingInput" label="Requestor">
              <Form.Control
                type="requestor"
                value={formInfo.signatures.requestor}
                onChange={(e) =>
                  handleInputChange(e, "requestor", "signatures")
                }
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel
              controlId="floatingInput"
              label="Requestor Supervisor"
            >
              <Form.Control
                type="requestorSupervisor"
                value={formInfo.signatures.requestorSupervisor}
                onChange={(e) =>
                  handleInputChange(e, "requestorSupervisor", "signatures")
                }
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel
              controlId="floatingInput"
              label="Director Of Operations"
            >
              <Form.Control
                value={formInfo.signatures.DOO}
                onChange={(e) => handleInputChange(e, "DOO", "signatures")}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="floatingInput" label="CEO">
              <Form.Control
                value={formInfo.signatures.CEO}
                onChange={(e) => handleInputChange(e, "CEO", "signatures")}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Button variant="outline-success px-5 py-3">
          Submit Expense Request
        </Button>
      </Container>
    </>
  );
};

export default PurchaseRequestForm;
