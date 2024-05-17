import Table from "react-bootstrap/Table";
import ReviewApproveTable from "./Tables/ReviewApproveTable.jsx"; // !!!FOR ADMIN USE
import PurchaseTracker from "./Tables/PurchaseTracker.jsx"; // !!!FOR USER USE
import ExpenseRequestForm from "./Forms/ExpenseRequestForm.jsx";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import SettingsModal from "../components/Modals/SettingsModal.jsx";
import * as userService from "../services/UserService.jsx";
import { useState } from "react";
import Cookies from 'js-cookie';
import NavbarC from "./Utilities/NavbarC.jsx";
import { useLocation } from "react-router-dom";

const HomePage = () => {

  const [admin, setAdmin] = useState(false);
  const loc = useLocation();

  return (
    <>
      <NavbarC admin={admin} setAdmin={setAdmin} />
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
