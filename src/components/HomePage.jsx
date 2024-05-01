import Table from "react-bootstrap/Table";
import ReviewApproveTable from "./ReviewApproveTable"; // !!!FOR ADMIN USE
import PurchaseTracker from "./PurchaseTracker"; // !!!FOR USER USE
import ExpenseRequestForm from "./ExpenseRequestForm.jsx";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import SettingsModal from "./Modals/SettingsModal";
import * as userService from "../services/UserService.jsx";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [request, setRequest] = useState([
    {
      id: 1,
      firstName: "Benjamin",
      lastName: "Cruz",
      dateOfExpense: "2024/03/29",
      lastUpdatedDateOfExpense: "2024-04-05T13:28:48.218904",
      items: "Balls, Pens",
      purpose: "Kids need money",
      expensePrograms: [
        { id: 1, programName: "Kids", cost: 900, expenseId: 1 },
        { id: 2, programName: "Adults", cost: 100, expenseId: 2 },
      ],
      total: 1000,
      dateNeeded: "2024/04/01",
      requester: true,
      requesterSupervisor: false,
      userId: 1,
      doo: false,
      ceo: false,
    },
  ]);

  const [showSett, setShowSett] = useState(false);
  function showSettings() { setShowSett(true); }
  
  const [admin, setAdmin] = useState(false);

  const [users, setUsers] = useState();

  // get users to see if admin -> Probably a better way to do this
  useEffect(() => {
    requestUserDataFromApi();
  }, []);

  function requestUserDataFromApi() {
    userService.getAllUsers().then((res) => {
      setUsers(res.data);
    });
  }

  return (
    <>
      <Navbar expand="lg" fixed="top">
        <Container>
          <Navbar.Brand>
            <img width={30} src="/src/assets/cdLogo.webp" /> Code Differently
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/request">Request Form</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown title="TEST">
                  <NavDropdown.Item>TEST</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              <Button variant="transparent" size="md" onClick={showSettings}> settings </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {showSett ? (
        <SettingsModal
          show = {showSett}
          hide = {() => setShowSett(false)}
          admin = {admin}
          isAdmin = {() => {admin ? (setAdmin(false)) : (setAdmin(true))}}
        />
      ) : (
        ""
      )}

      {admin ? (
        <ReviewApproveTable />
      ) : (
        <PurchaseTracker />
      )}
    
    </>
  );
};

export default HomePage;