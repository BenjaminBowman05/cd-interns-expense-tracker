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
import { useEffect } from "react";

const HomePage = () => {
  const [filterType, setFilterType] = useState("");
  const [users, setUsers] = useState();
  const [requests, setRequests] = useState();

  useEffect(() => {
    async function requestUserDataFromApi() {
      let res = await userService.getAllUsers();
      setUsers(res.data);
      setRequests(res.data[0].userExpenses);
    }
    requestUserDataFromApi();
  }, []);

  // get user expenses. change array indexing value for different users. Will rework in the future.

  const [showSett, setShowSett] = useState(false);
  function showSettings() {
    setShowSett(true);
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
            <Nav className="me-auto" variant="underline">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Filters" id="basic-nav-dropdown">
                <Nav.Item>
                  <NavDropdown title="Date Created">
                    <Nav.Item>
                      <Nav.Link>Latest</Nav.Link>
                    </Nav.Item>
                  </NavDropdown>
                </Nav.Item>
              </NavDropdown>
              <Button variant="transparent" size="md" onClick={showSettings}> Settings </Button>
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