import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import SettingsModal from "../Modals/SettingsModal";
import { useState, useContext } from "react";
import MyContext from "../../FireBase/MyContext";
import Cookies from "js-cookie";
// Add more variety to icons to make change more noticable
import {
  DoorClosed,
  DoorOpenFill,
  House,
  HouseFill,
  Gear,
  GearFill,
  FileText,
  FileRichtextFill,
  FileTextFill,
} from "react-bootstrap-icons";

const NavbarC = ({ admin, user, setAdmin }) => {
  const [showSett, setShowSett] = useState(false);
  const [home, setHome] = useState(false);
  const [form, setForm] = useState(false);
  const [sett, setSett] = useState(false);
  const [logOut, setLogOut] = useState(false);

  function showSettings() {
    setShowSett(true);
  }

  return (
    <>
      <Navbar expand="lg" fixed="top">
        <Container>
          <Navbar.Brand>
            <img
              style={{ height: 25, margin: 0 }}
              src="../src/assets/CDBrand.png"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Nav.Link
                href="/"
                onMouseEnter={() => setHome(true)}
                onMouseLeave={() => setHome(false)}
              >
                Home {home ? <HouseFill size={20} /> : <House size={20} />}
              </Nav.Link>
              <Nav.Link
                href="/request"
                onMouseEnter={() => setForm(true)}
                onMouseLeave={() => setForm(false)}
              >
                {/* FileRichtextFill instead of FileTextFill */}
                Request Form{" "}
                {form ? <FileTextFill size={20} /> : <FileText size={20} />}
              </Nav.Link>
              <Button
                variant="transparent"
                size="md"
                onClick={showSettings}
                onMouseEnter={() => setSett(true)}
                onMouseLeave={() => setSett(false)}
              >
                Settings {sett ? <GearFill size={20} /> : <Gear size={20} />}
              </Button>
              <Button
                variant="transparent"
                size="md"
                onClick={() => Cookies.remove("name")}
                onMouseEnter={() => setLogOut(true)}
                onMouseLeave={() => setLogOut(false)}
              >
                Sign Out{" "}
                {logOut ? <DoorOpenFill size={20} /> : <DoorClosed size={20} />}
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
