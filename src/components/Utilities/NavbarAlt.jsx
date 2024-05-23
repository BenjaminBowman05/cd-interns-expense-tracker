import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import { useState } from "react";
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

const NavbarAlt = () => {
  const [home, setHome] = useState(false);
  const [form, setForm] = useState(false);
  const [logOut, setLogOut] = useState(false);
  return (
    <>
      <Navbar expand="lg" fixed="top">
        <Container>
          <Nav.Link href="/">
              <img height={25} src="/src/assets/CDBrand.png" />
          </Nav.Link>
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
    </>
  );
};

export default NavbarAlt;
