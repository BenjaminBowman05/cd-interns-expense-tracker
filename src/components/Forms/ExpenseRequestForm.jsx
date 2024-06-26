import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import * as expenseService from "../../services/ExpenseService.jsx";
import * as programService from "../../services/ProgramService.jsx";
import * as userService from "../../services/UserService.jsx";
import * as selectionsService from "../../services/SelectionsService.jsx";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../../FireBase/MyContext.jsx";
import EmailSend from "../Email/EmailSend.jsx";

const PurchaseRequestForm = () => {
  const navigate = useNavigate();
  const { cookies, setCookies } = useContext(MyContext);

  // we could get user object from the cookie and restore the settings button. But how about no.
  useEffect(() => {
    requestUserDataFromApi();
  }, []);

  const [user, setUser] = useState();

  function requestUserDataFromApi() {
    // console.log(cookies)
    userService.getUserByEmail(cookies.key).then((res) => {
      setUser(res.data);
    });
    // console.log(programs.length);
    // console.log(programs.length);
    if(programs.length == 0){
      selectionsService.getAllSelections().then((res) => {
        // console.log(res.data);
        // console.log(res.data);
        setPrograms(res.data);
      });
    }
  }

  //Obj that will hold all of the form information besides the programs
  const [formInfo, setFormInfo] = useState({
    // firstName: "",
    // lastName: "",
    name: "",
    // firstName: "",
    // lastName: "",
    name: "",
    items: "",
    purpose: "",
    total: 0,
    dateNeeded: "",
    requester: true,
    userId: null,
    recurring: false,
    requesterEmail: ""
  });

  //Array var that will hold the expense programs objs
  const [expensePrograms, setExpensePrograms] = useState([]);

  //list of all programs available can be added to if needed
  const [programs, setPrograms] = useState([]);

  //Handles the form submit and post to back-end
  const handleSubmit = () => {
    // console.log(user)
    //Makes sure all info is filled before submitting
    formInfo.total = parseFloat(document.getElementById("totalBox").value);
    formInfo.userId = user.id;
    // console.log(formInfo)
    formInfo.requesterEmail = user.email;
    formInfo.name = user.name
    if (
      // formInfo.firstName != "" &&
      // formInfo.lastName != "" &&
      // formInfo.firstName != "" &&
      // formInfo.lastName != "" &&
      formInfo.items != "" &&
      formInfo.purpose != "" &&
      formInfo.dateNeeded != "" &&
      expensePrograms.length != 0
    ) {
      // console.log(formInfo);
      //Calls back-end to create expense for with the form info OBJ
      expenseService.createExpense(formInfo).then((response) => {
        //Maps through all available programs then sets the exepense id to the expense form id so they link
        const newRequest = expensePrograms.map((info) => {
          return { ...info, expenseId: response.data.id };
        });
        //This loops through all programs and creates them
        for (let i = 0; i < newRequest.length; i++) {
          programService.createProgram(newRequest[i]).then((response) => {
            navigate(`/`);
          });
        }
        // console.log(expenseService.getAllExpenses())
        
        // // User information relevant for Confirmation_Email goes below
        // const UInfo = {
        //   FirstName: user.name.slice(user.name.indexOf(",")+2),
        //   LastName: user.name.slice(0, user.name.indexOf(",")),
        //   Email: user.email,
        // };
    
        // // All user's manager info relevant for Approval_Email template goes below
        // const MInfo = {
        //   FirstName: user.managerName.slice(user.name.indexOf(",")+2),
        //   LastName: user.managerName.slice(0, user.name.indexOf(",")),
        //   Email: user.managerEmail,
        //   // Official site domain should go below
        //   URL: "http://localhost:5173",
        // };

        // EmailSend(UInfo, MInfo);
      });
    } else {
      window.alert("Please fillout the entire form");
    }
  };

  const updateTotal = () => {
    let total = 0;
    let totalBox = document.getElementById("totalBox");
    let programs = document.getElementsByClassName("programs");

    for (let i = 0; i < programs.length; i++) {
      if (programs[i].value < 0) {
        programs[i].value = 0;
      }

      if (!isNaN(parseFloat(programs[i].value))) {
        total += parseFloat(programs[i].value);
      }
    }
    totalBox.value = total;
  };

  const handleProgram = (e, dex) => {
    //Verifies that the index passed through is not null
    if (dex !== null) {
      //maps through the programs to compare indexes and once it finds the right one it updates the cost the returns
      const updateProgram = expensePrograms.map((pro, index) => {
        if (index === dex) {
          if (isNaN(parseFloat(e.target.value))) {
            pro.cost = 0;
          } else {
            pro.cost = parseFloat(e.target.value);
          }
          updateTotal();
          return pro;
        }
        return pro;
      });
      //after the complete mapping it updates the obj
      setExpensePrograms(updateProgram);
    }
  };

  //adds the selected program to the obj array
  const appendProgram = (event, program) => {
    setExpensePrograms([
      ...expensePrograms,
      {
        expenseId: 0,
        programName: program.selectionName,
        cost: 0,
      },
    ]);
  };

  const deleteProgram = (event) => {
    /**Delete program from UI and Obj */
    let array1 = [...expensePrograms];
    array1.splice(event.target.id - 1, 1);

    setExpensePrograms(array1);
  };

  //most of the fields are using a controlled input to update on change
  return (
    <div>
      <Container fluid>
        <h1>Expense Request Form</h1>
      </Container>
      <Container fluid>
        {/* <Row className="user mb-2">
          <Col>
            <FloatingLabel controlId="firstName" label="First Name">
              <Form.Control
                type="firstName"
                placeholder="John"
                onChange={(e) => (formInfo.firstName = e.target.value)}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="lastName" label="Last Name">
              <Form.Control
                type="lastName"
                placeholder="Doe"
                onChange={(e) => (formInfo.lastName = e.target.value)}
              />
            </FloatingLabel>
          </Col>
        </Row> */}
        <Row className="itemsRequested mb-2">
          <Col>
            <Form.Control
              as="textarea"
              rows="2"
              placeholder="Items Requested..."
              onChange={(e) => (formInfo.items = e.target.value)}
            />
          </Col>
        </Row>
        <Row className="purpose">
          <Col>
            <FloatingLabel controlId="purpose" label="Purpose Of Request">
              <Form.Control
                type="purpose"
                placeholder="Purpose goes here..."
                onChange={(e) => (formInfo.purpose = e.target.value)}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="selectedPrograms">
          <ul className="selectedPrograms-List">
            {expensePrograms.map((program, index) => (
              <li key={index + 1} id={index + 1}>
                <InputGroup className="mt-3">
                  <InputGroup.Text>
                    {program.programName} cost:{" "}
                  </InputGroup.Text>
                  <Form.Control
                    id={`program-${index + 1}`}
                    className="programs"
                    as="input"
                    type="number"
                    onChange={(e) => handleProgram(e, index)}
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
        <Row className="program-dropdown mb-2">
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
                      onClick={(e) => appendProgram(e, program)}
                    >
                      {program.selectionName}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </InputGroup>
          </Col>
          <Col>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <FloatingLabel label="Total">
                <Form.Control
                  disabled
                  id="totalBox"
                  placeholder="Total Calculated Amount"
                  onChange={(e) => (formInfo.total = parseInt(e.target.value))}
                />
              </FloatingLabel>
            </InputGroup>
          </Col>
        </Row>
        <Row className="w-25 mx-auto mb-2">
          <Col>
            <Form.Check
              type={"checkbox"}
              id={`default-checkbox`}
              label={`Is Recurring`}
              onClick={() => {
                formInfo.recurring = !formInfo.recurring;
              }}
            />
          </Col>
        </Row>
        <Row className="dateNeeded mb-2">
          <Col>
            <FloatingLabel controlId="date" label="Date Needed">
              <Form.Control
                type="date"
                onChange={(e) => (formInfo.dateNeeded = e.target.value)}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Button variant="outline-success px-5 py-3" onClick={handleSubmit}>
          Submit Expense Request
        </Button>
      </Container>
    </div>
  );
};
 
export default PurchaseRequestForm;