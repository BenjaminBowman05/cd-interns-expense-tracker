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
import { useState, useEffect, useContext } from "react";
import NavbarC from "./Utilities/NavbarC.jsx";
import MyContext from "../utils/MyContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState();
  const { cookies, setCookies } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(cookies);
    if (!cookies.name) {
      navigate("/");
    }
    requestUserDataFromApi();
  }, [cookies.name]);

  function requestUserDataFromApi() {
    console.log(cookies.name);
    userService.getUserByUsername(cookies.name).then((res) => {
      console.log(res.data.userExpenses);
      setUser(res.data);
    });
  }

  return (
    <>
      <NavbarC admin={admin} user={user} setAdmin={setAdmin} />
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
              <Button onClick={Cookies.remove('name')}>
                Log out
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
