import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import SettingsModal from "../Modals/SettingsModal";
import { useState } from "react";

const NavbarC = ({ admin, setAdmin }) => {
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
    </>
  );
};

export default NavbarC;
