import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { useState, useEffect, useContext } from "react";
import FormPopUp from "../Modals/FormPopUp.jsx";
import ConfirmationModal from "../Modals/ConfirmationModal.jsx";
import * as expenseService from "../../services/ExpenseService.jsx";
import * as userService from "../../services/UserService.jsx";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import ShowReceipt from "../Modals/ShowReceipt.jsx";
import { Update } from "../Utilities/Update.jsx";
import PurchaserModal from "../Modals/PurchaserModal.jsx";
import MyContext from "../../FireBase/MyContext.jsx";
import { useNavigate } from "react-router-dom";

const ReviewApproveTable = () => {
  // make method to handle types of filters
  const [files, setFiles] = useState([]);
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState();
  //Obj array filled via backend
  const [requests, setRequests] = useState([]);

  //Used as a temp storage to send a obj to the popup
  const [modalObj, setModalObj] = useState();

  //showModal used in conjunction with the view button
  const [showModal, setShowModal] = useState(false);

  const [showReceipt, setShowReceipt] = useState(false);

  //This handles the approval decision
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [showPurchaser, setShowPurchaser] = useState(false);
  const { cookies, setCookies } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(cookies);
    if (!cookies.name) {
      navigate("/");
    }
    requestUserDataFromApi();
  }, [cookies.name]);

  function requestUserDataFromApi() {
    userService.getUserByUsername(cookies.name).then((res) => {
      setUsers(res.data);
      setRequests(res.data.userExpenses);
    });
  }

  //validates files passed into table and obj
  const validateFile = (id) => {
    var fileInput = document.getElementById(`file-${id}`);

    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions = /(\.pdf|\.png|\.jpg|\.jpeg)$/i;

    //If the give file is not part of the allowed extension it will remove it and throw error
    if (!allowedExtensions.exec(filePath)) {
      alert("Invalid file type");
      fileInput.value = "";
      // const newFileState = [...files];
      // newFileState[id - 1] = false;
      // setFiles(newFileState);
      // console.log(files);

      return false;
    }
    return true;
  };

  //Handles the implentation of a file while calling the other file functions to verify and attach the url
  const handleFileSelect = (event, id) => {
    // console.log(event);
    let valid = validateFile(id);

    if (valid) {
      // console.log(event.target.files);
      const reader = new FileReader();
      reader.onload = (e) => handleFileLoadPdf(e, id);
      reader.readAsDataURL(event.target.files[0]);
      // const newFileState = [...files];
      // newFileState[id - 1] = true;
      // setFiles(newFileState);
      // console.log(files);
      console.log(requests);
      modalHandle("Purchaser", id);
    }
  };

  //attaches the url of file to the request obj then updates array
  const handleFileLoadPdf = (event, id) => {
    let url = event.target.result;
    // console.log(url);
    // console.log(url);
    const newRequest = requests.map((request) => {
      if (request.id === id) {
        request.receipt = url;
        return request;
      }
      return request;
    });

    setRequests(newRequest);
    // Update(modalObj);
  };

  //Finds the obj tied to the view button clicked then stores it for later
  const retrieveModalObj = (id) => {
    const updateRequest = requests.map((req) => {
      if (req.id === id) {
        // setModalId(req.id);
        setModalObj(req);
        return req;
      }
    });
    // setModalObj(updateRequest[id - 1]);
  };

  //Handles the modal for the view form
  const modalHandle = (status, id) => {
    retrieveModalObj(id);
    switch (status) {
      case "View":
        setShowModal(true);
        break;

      case "Reciept":
        setShowReceipt(true);
        break;

      case "Confirm":
        setShowConfirmation(true);
        break;

      case "Purchaser":
        setShowPurchaser(true);
        break;
    }
  };

  const handlePurchaserShow = () => {
    setShowPurchaser(false);
    console.log(modalObj.purchaser, modalObj.dateDelivered);
    const updateRequest = requests.map((req) => {
      if (req.id === modalObj.id) {
        if (modalObj.purchaser == "" && modalObj.dateDelivered == "") {
          if (modalObj.purchaser == "" && modalObj.dateDelivered == "") {
            req.receipt = "";
            window.alert("Please fill out all fields and reattach file");
          } else {
            req.purchaser = modalObj.purchaser;
            req.dateDelivered = modalObj.dateDelivered;
          }
        }
        return req;
      }
    });

    Update(modalObj);
    setRequests(updateRequest);
  };

  //Method is responsible looking through array and finding obj with matching id and altering approval
  const setChecked = (btnVal, id) => {
    let btn = document.getElementById(`Confirm-${id}`);

    const updateRequest = requests.map((req) => {
      if (req.id === id) {
        if (btnVal == "Approved") {
          console.log("APPROVED BTN VALUE");
          return { ...req, [users.role]: true };
        } else if (btnVal == "Denied") {
          console.log("DENIED BTN VALUE");
          return { ...req, [users.role]: false };
        }
      } else {
        return req;
      }
    });
    expenseService.updateExpense(id, updateRequest[id - 1]);

    if (btn.value == "Disabled") {
      btn.classList.toggle("disabled");
      btn.value = "Not Disabled";
    }

    //sets the array with updated value
    setRequests(updateRequest);
    console.log(requests);
  };

  //used to keep track of modal info being passed into view and confirmation
  // const [modalId, setModalId] = useState(0);

  //This handles the confirmation decision of approve and deny
  //This handles the confirmation decision of approve and deny
  const handleConfirmationShow = () => {
    setShowConfirmation(false);
    if (modalObj[users.role]) {
      console.log("Approved");
    } else {
      console.log("Denied");
      const updateRequest = requests.map((req) => {
        if (req.id === modalObj.id) {
          return { ...req, reason: modalObj.reason };
        } else {
          return req;
        }
      });

      Update(modalObj);
      setRequests(updateRequest);
    }
  };

  return (
    <div>
      <h1>Your Users Requests</h1>
      {/* Creates a React Bootstrap Table that alternates from black to dark gray with a hover effect */}
      <Table striped bordered hover size="lg" style={{fontFamily: 'Open Sans', width: '1000px'}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Expense</th>
            {/* <th>Program</th>
              <th>Description</th> */}
            <th>Date Created</th>
            <th>Date Needed</th>
            <th>View</th>
            <th>Decision</th>
            <th>Confirmation</th>
            <th>Reciept</th>
          </tr>
        </thead>
        <tbody>
          {/* Outputs table rows for each obj display information */}
          {requests.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>${data.total}</td>
              {/* <td>
                  <DropdownButton size="sm" title="Programs" variant="outline-light">
                    {data.expensePrograms.map((program) => (
                      <Dropdown.Item disabled
                        key={program.programName}
                        as="button"
                      >
                        {program.programName}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton> */}
              {/* {data.expensePrograms.map((program) => (
                    <p key={program.programName} className="m-0">
                      {program.programName}
                    </p>
                  ))} */}
              {/* </td> */}
              <td>{data.dateOfExpense}</td>
              <td>{data.dateNeeded}</td>
              {/* View Button will open a version of expense form that is populated with obj data */}
              <td>
                <ButtonGroup className="mb-2 " size="sm">
                  <Button
                    id={"View-" + data.id}
                    type="button"
                    variant="outline-light"
                    onClick={() => modalHandle("View", data.id)}
                  >
                    View
                  </Button>
                </ButtonGroup>
              </td>
              {/* Approval Button */}
              <td>
                <ToggleButtonGroup
                  type="radio"
                  name={"actions " + data.id}
                  className="mb-2 "
                  size="sm"
                >
                  <ToggleButton
                    className="me-2"
                    id={"Approve-" + data.id}
                    variant="outline-success"
                    onClick={() => setChecked("Approved", data.id)}
                    value={"approved"}
                  >
                    Approve
                  </ToggleButton>
                  {/* Deny Button */}
                  <ToggleButton
                    id={"Deny-" + data.id}
                    variant="outline-danger"
                    value={"deny"}
                    onClick={() => setChecked("Denied", data.id)}
                  >
                    Deny
                  </ToggleButton>
                </ToggleButtonGroup>
              </td>
              {/* Confirm Button */}
              <td>
                <ButtonGroup className="mb-2 " size="sm">
                  <Button
                    className="disabled"
                    id={"Confirm-" + data.id}
                    type="button"
                    variant="outline-secondary"
                    value={"Disabled"}
                    onClick={() => modalHandle("Confirm", data.id)}
                  >
                    Confirmation
                  </Button>
                </ButtonGroup>
              </td>
              {/* File upload */}
              <td
                id={`file ${data.id}`}
                className={
                  data.receipt == "" ? "" : "d-flex align-items-center"
                }
              >
                {data.receipt == "" ? (
                  <Form.Control
                    onChange={(e) => handleFileSelect(e, data.id)}
                    accept=".pdf, .png, .jpeg, .jpg"
                    id={`file-${data.id}`}
                    as="input"
                    type="file"
                  ></Form.Control>
                ) : (
                  <>
                    <Button
                      onClick={() => modalHandle("Reciept", data.id)}
                      className="d-inline-block me-2"
                      variant="outline-info"
                    >
                      View Receipt
                    </Button>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Name | Date"
                    >
                      <Form.Control
                        className="d-inline-block"
                        value={data.purchaser + " | " + data.dateDelivered}
                      />
                    </FloatingLabel>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* This Section contains all of the needed modals for the admin actions */}
      {showModal ? (
        <FormPopUp
          show={showModal}
          close={() => setShowModal(false)}
          data={modalObj}
        />
      ) : (
        ""
      )}

      {showConfirmation ? (
        <ConfirmationModal
          show={showConfirmation}
          confirm={() => handleConfirmationShow()}
          close={() => setShowConfirmation(false)}
          data={modalObj}
          role={users.role}
        />
      ) : (
        ""
      )}

      {showPurchaser ? (
        <PurchaserModal
          show={showPurchaser}
          confirm={() => handlePurchaserShow()}
          close={() => setShowPurchaser(false)}
          data={modalObj}
        />
      ) : (
        ""
      )}

      {showReceipt ? (
        <ShowReceipt
          show={showReceipt}
          close={() => setShowReceipt(false)}
          data={modalObj}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ReviewApproveTable;
