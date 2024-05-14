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

import { useEffect, useState } from "react";

const HomePage = () => {
  const [showSett, setShowSett] = useState(false);
  function showSettings() {
    setShowSett(true);
  }

  const [admin, setAdmin] = useState(false);

  

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
              <Button variant="transparent" size="md" onClick={showSettings}>
                {" "}
                Settings{" "}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {showSett ? (
        <SettingsModal
          show={showSett}
          hide={() => setShowSett(false)}
          admin={admin}
          isAdmin={() => {
            admin ? setAdmin(false) : setAdmin(true);
          }}
        />
      ) : (
        ""
      )}

      {admin ? (
        <ReviewApproveTable />
      ) : (
        <PurchaseTracker/>
        // <PurchaseTracker />
      )}
    </>
  );
};

export default HomePage;
