
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
import { useState, useEffect, useContext } from "react";
import NavbarC from "./Utilities/NavbarC.jsx";
import MyContext from "../FireBase/MyContext.jsx";
import { useNavigate } from "react-router-dom";

const HomePage = (adminView) => {
  // const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState();
  const { cookies, setCookies } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(cookies);
    if (!cookies.name) {
      navigate("/");
    }
    requestUserDataFromApi();
  }, [cookies.name]);

  function requestUserDataFromApi() {
    // console.log(cookies.name);
    userService.getUserByUsername(cookies.name).then((res) => {
      // console.log(res.data.userExpenses);
      setUser(res.data);
    });
  }

  return (
    <>
      {adminView ? (
        <ReviewApproveTable />
      ) : (
        <PurchaseTracker />
      )}
    </>
  );
};

export default HomePage;
