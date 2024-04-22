import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

import { useState } from "react";

const PurchaseRequestForm = () => {
  const [formInfo, setFormInfo] = useState({
    firstName: "",
    lastName: "",
    currDate: "",
    items: "",
    purpose: "",
    expensePrograms: [],
    total: 0,
    dateNeeded: "",
    requestor: true,
    requestorSupervisor: false,
    DOO: false,
    CEO: false,
  });

  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [id, setId] = useState(1);
  const [expenseId, setExpenseId] = useState(1);
  const [programs, setPrograms] = useState([
    "Program 1",
    "Program 2",
    "Program 3",
    "Program 4asdasdsadas",
  ]);

  const handleSignatures = (e, person) => {
    if (e.target.value != "") {
      setFormInfo({ ...formInfo, [person]: true });
    } else {
      setFormInfo({ ...formInfo, [person]: false });
    }
    console.log(formInfo);
  };

  const handleInputChange = (
    event,
    fieldName,
    parentField = null,
    index = null
  ) => {
    /**
     * Good Luck!
     */

    console.log(formInfo);
    if (parentField !== null && index !== null) {
      let array = [...formInfo[parentField]];
      array[index] = {
        ...array[index],
        cost: event.target.value,
      };
      setFormInfo({ ...formInfo, [parentField]: array });
    } else {
      if (parentField && !index) {
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
    }
  };

  const appendProgram = (event) => {
    setSelectedPrograms([...selectedPrograms, event.target.textContent]);
    setId(id + 1);
    setExpenseId(expenseId + 1);
    setFormInfo({
      ...formInfo,
      expensePrograms: [
        ...formInfo.expensePrograms,
        {
          id: id,
          expenseId: expenseId,
          programName: event.target.textContent,
          cost: 0,
        }, //Set inital cost to 0
      ],
    });
    console.log(formInfo);
  };

  const deleteProgram = (event) => {
    /**Delete program from UI */
    let array1 = [...selectedPrograms];
    array1.splice(event.target.id - 1, 1);
    setSelectedPrograms(array1);

    /**Delete program from Object */
    let array2 = [...formInfo.expensePrograms];
    array2.splice(event.target.id - 1, 1);
    setFormInfo({ ...formInfo, expensePrograms: array2 });
    console.log(formInfo);
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
                  <Form.Control
                    as="input"
                    type="number"
                    onChange={(e) =>
                      handleInputChange(e, "cost", "expensePrograms", index)
                    }
                  />
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
            <InputGroup size="lg">
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
                onChange={(e) => handleSignatures(e, "requestor")}
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
                onChange={(e) => handleSignatures(e, "requestorSupervisor")}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel
              controlId="floatingInput"
              label="Director Of Operations"
            >
              <Form.Control onChange={(e) => handleSignatures(e, "DOO")} />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="floatingInput" label="CEO">
              <Form.Control onChange={(e) => handleSignatures(e, "CEO")} />
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
