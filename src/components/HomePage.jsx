import Table from "react-bootstrap/Table";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";

const HomePage = () => {
  const navBarData = [
    { label: "Home", url: "/" },
    {label: "Purchase Request Form", url: "/"},
    {
      label: "Filters",
      submenu: [
        {
          label: "Status",
          url: "/",
          submenu: [
            { label: "Accepted", url: "/" },
            { label: "Pending", url: "/" },
          ],
        },
        {
          label: "Date Created",
          url: "/",
          submenu: [
            { label: "Latest", url: "/" },
            { label: "Oldest", url: "/" },
          ],
        },
        {
          label: "Date Needed",
          url: "/",
          submenu: [
            { label: "Latest", url: "/" },
            { label: "Oldest", url: "/" },
          ],
        },
      ],
    },
    { label: "Admin View", url: "/" },
  ];

  const menuShow = (mItems) => {
    return mItems.map((item, index) => {
      if (item.submenu) {
        return (
          <NavDropdown
            title={item.label}
            key={index}
            className="dropdown-menu-dark  
                                   dropend"
          >
            {menuShow(item.submenu)}
          </NavDropdown>
        );
      } else {
        return (
          <Nav.Link href={item.url} key={index}>
            {item.label}
          </Nav.Link>
        );
      }
    });
  };

  return (
    <>
      <Navbar expand="lg" fixed="top">
        <Container>
          <Navbar.Brand>
            <img width={30} src="/src/assets/cdLogo.webp" /> Code Differently
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto" navbarScroll>{menuShow(navBarData)}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default HomePage;
