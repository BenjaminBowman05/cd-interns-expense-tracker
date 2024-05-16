import Table from "react-bootstrap/Table";
import ReviewApproveTable from "../components/ReviewApproveTable.jsx"; // !!!FOR ADMIN USE
import PurchaseTracker from "../components/PurchaseTracker.jsx"; // !!!FOR USER USE
import ExpenseRequestForm from "../components/ExpenseRequestForm.jsx";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import SettingsModal from "../components/Modals/SettingsModal.jsx";
import * as userService from "../services/UserService.jsx";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../utils/MyContext";
import NavbarC from "./Utilities/NavbarC.jsx";

const HomePage = () => {
  const { cookies, setCookies } = useContext(MyContext);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(cookies);
    if (!cookies.name) {
      navigate("/");
    }
  }, [cookies.name]);

  const [requests, setRequests] = useState([]);

  const [showSett, setShowSett] = useState(false);
  function showSettings() {
    setShowSett(true);
  }

  const [admin, setAdmin] = useState();

  const [users, setUsers] = useState();

  // get users to see if admin -> Probably a better way to do this
  useEffect(() => {
    requestUserDataFromApi();
  }, []);

  function requestUserDataFromApi() {
    userService.getUserByUsername(cookies.name).then((res) => {
      console.log(res.data.userExpenses);
      setAdmin(res.data.admin);
      console.log(res.data);
      setUsers(res.data);
      setRequests(res.data.userExpenses);
    });
  }

  return (
    <>
      <NavbarC admin={admin} user={users} setAdmin={setAdmin} />
      {/* <Navbar expand="lg" fixed="top">
        <Container>
          <Navbar.Brand>
            <img style={{height: 25, margin: 0}} src="/src/assets/CDBrand.png" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/request">Request Form</Nav.Link>
              <Button variant="transparent" size="md" onClick={showSettings}>
                {" "}
                Settings{" "}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}

      {admin ? (
        <ReviewApproveTable />
      ) : (
        <PurchaseTracker />
        // <PurchaseTracker />
      )}
    </>
  );
};

export default HomePage;
