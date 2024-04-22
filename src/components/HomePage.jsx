import Table from "react-bootstrap/Table";
import ReviewApproveTable from "./ReviewApproveTable";
import PurchaseTracker from "./PurchaseTracker";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { useState } from "react";

const HomePage = () => {
  const [request, setRequest] = useState([
    {
      id: 1,
      firstName: "Benjamin",
      lastName: "Cruz",
      dateOfExpense: "2024/03/29",
      lastUpdatedDateOfExpense: "2024-04-05T13:28:48.218904",
      items: "Balls, Pens",
      purpose: "Kids need money",
      expensePrograms: [
        { id: 1, programName: "Kids", cost: 900, expenseId: 1 },
        { id: 2, programName: "Adults", cost: 100, expenseId: 2 },
      ],
      total: 1000,
      dateNeeded: "2024/04/01",
      requester: true,
      requesterSupervisor: false,
      userId: 1,
      doo: false,
      ceo: false,
      // Pass admin from user object. ADMIN WILL NOT BE STORED HERE. JUST FOR TESTING.
      admin: false,
    },
  ]);

  // Create navBar Hiearchy
  const navBarData = [
    { label: "Home", url: "/" },
    { label: "Purchase Request Form", url: "/" },
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
  ];

  const menuShow = (mItems) => {
    // get admin boolean from object. WILL CHANGE THIS IS NOT PERMANENT
    if (request[0].admin) {
      console.log("AHHH");
      addAdminView();
    }

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

  // will maybe change this not sure yet.
  const addAdminView = () => {
    navBarData.push({ label: "User View", url: "/" });
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
            <Nav className="me-auto" navbarScroll>
              {menuShow(navBarData)}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ReviewApproveTable />
    </>
  );
};

export default HomePage;
