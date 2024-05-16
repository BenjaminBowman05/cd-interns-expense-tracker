import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import SettingsModal from "../Modals/SettingsModal";
import { useState, useContext } from "react";
import MyContext from "../../utils/MyContext";
import Cookies from "js-cookie";

const NavbarC = ({ admin, user, setAdmin }) => {
  const [showSett, setShowSett] = useState(false);
  const [logOut, setLogOut] = useState(false);

  function showSettings() {
    setShowSett(true);
  }

  return (
    <>
      <Navbar expand="lg" fixed="top">
        <Container>
          <Navbar.Brand>
            <img width={30} src="../src/assets/CDBrand.png" /> Code Differently
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
              <Button
                variant="transparent"
                size="md"
                onClick={() => Cookies.remove("name")}
              >
                Sign Out
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
          user={user}
          isAdmin={() => {
            setAdmin(!admin);
          }}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default NavbarC;
