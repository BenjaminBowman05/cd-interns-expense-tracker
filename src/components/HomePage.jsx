import ReviewApproveTable from "./ReviewApproveTable"; // !!!FOR ADMIN USE
import PurchaseTracker from "./PurchaseTracker"; // !!!FOR USER USE
import SettingsModal from "./Modals/SettingsModal";
import NavbarC from "./Utilities/NavbarC";

import { useEffect, useState } from "react";

const HomePage = () => {
  const [admin, setAdmin] = useState(false);

  return (
    <>
      <NavbarC admin={admin} setAdmin={setAdmin} />
      {/* <Navbar expand="lg" fixed="top">
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
