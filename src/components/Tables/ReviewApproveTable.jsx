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

const ReviewApproveTable = () => {
  // make method to handle types of filters
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

  useEffect(() => {
    requestUserDataFromApi();
  }, []);

  function requestUserDataFromApi() {
    userService.getUserByEmail(cookies.key).then((res) => {
      setUsers(res.data);
      expenseService.getAllExpenses().then((res) => {
        setRequests(res.data);
        console.log(res.data);
      });
    });
  }

  function previewFiles(event, id) {
    const files = document.querySelector("#file-" + id).files;
    console.log("EVENT:");
    console.log(event);
    console.log("FILES HERE::");
    console.log(files);

    function readAndPreview(file, indexOfFile) {
      // Make sure `file.name` matches our extensions criteria
      if (/(\.pdf|\.png|\.jpg|\.jpeg)$/i.test(file.name)) {
        const reader = new FileReader();
        console.log("FILE HERE");
        console.log(file);

        reader.addEventListener("load", () => {
          const newRequest = requests.map((request) => {
            if (request.id === id) {
              console.log("REQUESTTT");
              console.log(request);
              request.receipts[indexOfFile] = reader.result;

              console.log("arrayidxing test, INDEX: " + indexOfFile);
              console.log(request.receipts[indexOfFile]);
              return request;
            }
            return request;
          });

          setRequests(newRequest);
        });

        console.log("RECIEPTS ARRAY HEREERER");
        console.log(requests.receipts);
        reader.readAsDataURL(file);
      }
    }

    if (files) {
      for (let i = 0; i < files.length; i++) {
        readAndPreview(files.item(i), i);
      }
      modalHandle("Purchaser", id);
    }
  }

  //Finds the obj tied to the view button clicked then stores it for later
  const retrieveModalObj = (id) => {
    const updateRequest = requests.map((req) => {
      if (req.id === id) {
        setModalObj(req);
        return req;
      }
    });
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
    const updateRequest = requests.map((req) => {
      if (req.id === modalObj.id) {
        if (modalObj.purchaser == "" && modalObj.dateDelivered == "") {
          req.receipts = [""]; // change later?
          window.alert("Please fill out all fields and reattach file");
        } else {
          req.purchaser = modalObj.purchaser;
          req.dateDelivered = modalObj.dateDelivered;
        }
      }
      return req;
    });

    console.log("MODAL OBJECT");
    console.log(modalObj);

    Update(modalObj);
    setRequests(updateRequest);
  };

  //Modal handle for confirmation
  const receiptRemove = () => {
    const updateRequest = requests.map((req) => {
      if (req.id === modalObj.id) {
        req.receipt = "";
      }
      return req;
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
          return { ...req, [users.role]: true };
        } else if (btnVal == "Denied") {
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
  };

  //This handles the confirmation decision of approve and deny
  const handleConfirmationShow = () => {
    setShowConfirmation(false);
    if (modalObj[users.role]) {
      modalObj.receipts[0] = ""; // CHANGE LATER?
    } else {
      const updateRequest = requests.map((req) => {
        if (req.id === modalObj.id) {
          return { ...req, reason: modalObj.reason };
        } else {
          return req;
        }
      });
      setRequests(updateRequest);
    }
    Update(modalObj);
  };

  return (
    <div>
      <h2>All User Requests</h2>
      {/* Creates a React Bootstrap Table that alternates from black to dark gray with a hover effect */}
      <div className="table-container">
        <Table striped bordered hover size="lg">
          <thead>
            <tr>
              <th style={{ padding: "15px" }}>ID</th>
              <th style={{ padding: "15px" }}>Expense</th>
              {/* <th>Program</th>
              <th>Description</th> */}
              <th style={{ padding: "15px" }}>Date Created</th>
              <th style={{ padding: "15px" }}>Date Needed</th>
              <th style={{ padding: "15px" }}>View</th>
              <th style={{ padding: "15px" }}>Decision</th>
              <th style={{ padding: "15px" }}>Confirmation</th>
              <th style={{ padding: "15px" }}>Reciept</th>
            </tr>
          </thead>
          <tbody>
            {/* Outputs table rows for each obj display information */}
            {requests.map((data) =>
              data.archive ? (
                ""
              ) : (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>${data.total}</td>
                  <td>{data.dateOfExpense.substring(0, 10)}</td>
                  <td>{data.dateNeeded}</td>
                  {/* View Button will open a version of expense form that is populated with obj data */}
                  <td>
                    <ButtonGroup className="mb-2 " size="sm">
                      <Button
                        id={"View-" + data.id}
                        type="button"
                        variant={
                          cookies.theme == "light"
                            ? "outline-primary"
                            : "outline-info"
                        }
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
                      defaultValue={
                        data.doo
                          ? "Approved-" + data.id
                          : data.reason != ""
                          ? "Deny-" + data.id
                          : ""
                      }
                    >
                      <ToggleButton
                        className="me-2"
                        id={"Approve-" + data.id}
                        variant="outline-success"
                        onClick={() => setChecked("Approved", data.id)}
                        value={"Approved-" + data.id}
                        disabled={data.receipt != "" ? true : false}
                      >
                        Approve
                      </ToggleButton>
                      {/* Deny Button */}
                      <ToggleButton
                        id={"Deny-" + data.id}
                        variant="outline-danger"
                        value={"Deny-" + data.id}
                        onClick={() => setChecked("Denied", data.id)}
                        disabled={data.receipt != "" ? true : false}
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
                      data.receipts[0] == "" ? "" : "d-flex align-items-center"
                    }
                  >
                    {data.receipts[0] == "" ? (
                      <Form.Control
                        onChange={(e) => {
                          previewFiles(e, data.id);
                        }}
                        accept=".pdf, .png, .jpeg, .jpg"
                        id={`file-${data.id}`}
                        as="input"
                        type="file"
                        multiple
                        disabled={
                          data.ceo &&
                          data.doo &&
                          data.requesterSupervisor &&
                          data.reason == []
                            ? ""
                            : true
                        }
                      ></Form.Control>
                    ) : (
                      <>
                        <Button
                          onClick={() => modalHandle("Reciept", data.id)}
                          className="d-inline-block me-2"
                          variant="outline-info"
                        >
                          View Receipt{data.receipts.length > 1 ? "s" : ""}
                        </Button>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Name | Date"
                        >
                          <Form.Control
                            className="d-inline-block"
                            defaultValue={data.purchaser + " | " + data.dateDelivered}
                          />
                        </FloatingLabel>
                      </>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </div>

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
