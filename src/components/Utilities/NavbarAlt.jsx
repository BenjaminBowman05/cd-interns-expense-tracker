import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";

const NavbarAlt = () => {
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
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/request">Request Form</Nav.Link>
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
    </>
  );
};

export default NavbarAlt;
