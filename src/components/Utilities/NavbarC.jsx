import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import SettingsModal from "../Modals/SettingsModal";
import { useState, useEffect, useContext } from "react";
import MyContext from "../../utils/MyContext";
import Cookies from "js-cookie";

const NavbarC = ({ admin, user, setAdmin }) => {
  const [showSett, setShowSett] = useState(false);
  const [logOut, setLogOut] = useState(false);

  const [theme, setTheme] = useState("");
  const [navStyle, setNavStyle] = useState({});
  const [themeChange, setThemeChange] = useState(false);

  useEffect(() => {
    // console.log(theme)
    const currTheme = document
      .querySelector("html")
      .getAttribute("data-bs-theme");

    if (currTheme === "dark") {
      document.querySelector("html").setAttribute("data-bs-theme", "light");
      setTheme("Dark");
      setNavStyle({backgroundColor: '#d1d3d4'});
    } else {
      document.querySelector("html").setAttribute("data-bs-theme", "dark");
      setTheme("Light")
      setNavStyle({});
    }
  }, [themeChange]);

  function toggleTheme() {
    console.log(themeChange);
    setThemeChange((curr) => (curr == false ? true : false));
  }

  // function changeTheme() {
  //   if (theme == "light") {
  //     setTheme("dark");
  //     document.querySelector("html").setAttribute("data-bs-theme", "light");
  //     setNavStyle({backgroundColor: '#d1d3d4'});
  //   } else {
  //     setTheme("light");
  //     document.querySelector("html").setAttribute("data-bs-theme", "dark");
  //     setNavStyle({});
  //   }
  // }

  return (
    <>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;1,300&display=swap');
      </style>
      <Navbar 
      style={navStyle}
      expand="lg" fixed="top">
        <Container>
          <Navbar.Brand>
            <Nav.Link href="/">
              <img height={25} src="/src/assets/CDBrand.png" />
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse style={{marginLeft: "5px"}} id="navbarScroll">
            <Nav variant="underline" className="me-auto" style={{fontFamily: 'Open Sans'}}>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/request">Request Form</Nav.Link>
              <Button 
                variant="transparent"
                size="md"
                onClick={() => setShowSett(true)}
              >
                {" "}
                Settings
                {" "}
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
          theme={theme}
          changeTheme={() => {toggleTheme()}}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default NavbarC;
