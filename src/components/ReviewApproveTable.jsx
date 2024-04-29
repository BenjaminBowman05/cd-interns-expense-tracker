import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { useState, useEffect } from "react";
import FormPopUp from "./Modals/FormPopUp";
import ConfirmationModal from "./Modals/ConfirmationModal.jsx";
import * as expenseService from "../services/ExpenseService.jsx";
import Modal from "react-bootstrap/Modal";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from "react-bootstrap/DropdownButton";
import ShowReceipt from "./Modals/ShowReceipt.jsx";

const ReviewApproveTable = () => {
  const [files, setFiles] = useState([]);

  const [show, setShow] = useState(false);

  //Obj array filled via backend
  const [requests, setRequests] = useState([
    // {
    //   id: 1,
    //   firstName: "Benjamin",
    //   lastName: "Cruz",
    //   dateOfExpense: "2024/03/29",
    //   lastUpdatedDateOfExpense: "2024-04-05T13:28:48.218904",
    //   items: "Balls, Pens",
    //   purpose: "Kids need money",
    //   expensePrograms: [
    //     { id: 1, programName: "Kids", cost: 900, expenseId: 1 },
    //     { id: 2, programName: "Adults", cost: 100, expenseId: 2 },
    //   ],
    //   total: 1000,
    //   dateNeeded: "2024/04/01",
    //   requester: true,
    //   requesterSupervisor: false,
    //   userId: 1,
    //   doo: false,
    //   ceo: false,
    //   receipt: "",
    //   reason: "",
    // },
  ]);

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
      const newFileState = [...files];
      newFileState[id - 1] = false;
      setFiles(newFileState);
      console.log(files);

      return false;
    }
    return true;
  };

  //Handles the implentation of a file while calling the other file functions to verify and attach the url
  const handleFileSelect = (event, id) => {
    console.log(event);
    let valid = validateFile(id);

    if (valid) {
      console.log(event.target.files);
      const reader = new FileReader();
      reader.onload = (e) => handleFileLoadPdf(e, id);
      reader.readAsDataURL(event.target.files[0]);

      const newFileState = [...files];
      newFileState[id - 1] = true;
      setFiles(newFileState);
      console.log(files);
    }
  };

  //attaches the url of file to the request obj then updates array
  const handleFileLoadPdf = (event, id) => {
    let url = event.target.result;
    const newRequest = requests.map((request) => {
      if (request.id === id) {
        return { ...request, receipt: url };
      }
      return request;
    });

    setRequests(newRequest);
    console.log(requests);
  };

  //The UseEffect calls a function
  useEffect(() => {
    requestDataFromApi();
  }, []);

  //The Function makes use of the expenseService function list to call all of the expenses from the back-end
  //Then sets the empty objArray with all of the values from the back-end
  function requestDataFromApi() {
    expenseService.getAllExpenses().then((res) => {
      setRequests(res.data);
    });
  }

  //Used as a temp storage to send a obj to the popup
  const [modalObj, setModalObj] = useState({});

  //Method is responsible looking through array and finding obj with matching id and altering approval
  const setChecked = (btnVal, id) => {
    let btn = document.getElementById(`Confirm-${id}`);

    const updateRequest = requests.map((req) => {
      if (req.id === id) {
        if (btnVal == "Approved") {
          return { ...req, requesterSupervisor: true };
        } else if (btnVal == "Denied") {
          return { ...req, requesterSupervisor: false };
        }
      } else {
        return req;
      }
    });
    btn.classList.toggle('disabled');
    //sets the array with updated value
    setRequests(updateRequest);
  };

  //showModal used in conjunction with the view button
  const [showModal, setShowModal] = useState(false); // !!this should be for all modals not just the view modal!!

  const [showReceipt, setShowReceipt] = useState(false);

  //This handles the approval decision
  const [showConfirmation, setShowConfirmation] = useState(false);

  //This handles the decision
  const handleConfirmationShow = (reason) => {
    setShowConfirmation(false);
    if (modalObj[modalId - 1].requesterSupervisor) {
      console.log("Approved");
    } else {
      console.log("Denied");
      const updateRequest = requests.map((req) => {
        if (req.id === modalId) {
          return { ...req, reason: reason };
        } else {
          return req;
        }
      });

      setRequests(updateRequest);
    }
  };

  //used to keep track of modal info being passed into view and confirmation
  const [modalId, setModalId] = useState(0);
  //Finds the obj tied to the view button clicked then stores it for later

  const retrieveModalObj = (id) => {
    const updateRequest = requests.map((req) => {
      if (req.id === id) {
        setModalId(req.id);
        return req;
      }
    });

    setModalObj(updateRequest);
  };

  //Id used for finding receipt for modal
  const [reqId, setReqId] = useState(0);

  //Handles the modal for the view form
  const modalHandle = (status, id) => {
    retrieveModalObj(id);
    switch (status) {
      case "View":
        setShowModal(true);
        break;
      case "Reciept":
        setShowReceipt(true);
        setReqId(id);
        break;

      case "Confirm":
        setShowConfirmation(true);
    }
  };

  return (
    <>
      <div>
        {/* Creates a React Bootstrap Table that alternates from black to dark gray with a hover effect */}
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Expense</th>
              <th>Program</th>
              <th>Description</th>
              <th>Date</th>
              <th>View</th>
              <th>Decision</th>
              <th>Confirmation</th>
              <th>Reciept</th>
              {/* <th>TEST</th> */}
            </tr>
          </thead>
          <tbody>
            {/* Outputs table rows for each obj display information */}
            {requests.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>${data.total}</td>
                <td>
                  <DropdownButton size="sm" title="Programs" variant="outline-light">
                    {data.expensePrograms.map((program) => (
                      <Dropdown.Item disabled
                        key={program.programName}
                        as="button"
                      >
                        {program.programName}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                  {/* {data.expensePrograms.map((program) => (
                    <p key={program.programName} className="m-0">
                      {program.programName}
                    </p>
                  ))} */}
                </td>
                <td>{data.purpose}</td>
                <td>{data.dateOfExpense}</td>
                {/* View Button will open a version of expense form that is populated with obj data */}
                <td>
                  <ButtonGroup className="mb-2 " size="sm">
                    <Button
                      className="mb-2"
                      id={"View: " + data.id}
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
                      className="mb-2 me-2"
                      id={"Approve: " + data.id}
                      variant="outline-success"
                      onClick={() => setChecked("Approved", data.id)}
                      value={"approved"}
                    >
                      Approve
                    </ToggleButton>
                    {/* Deny Button */}
                    <ToggleButton
                      className="mb-2"
                      id={"Deny: " + data.id}
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
                      className="mb-2 disabled"
                      id={"Confirm-" + data.id}
                      type="button"
                      variant="outline-secondary"
                      onClick={() =>
                        modalHandle("Confirm", data.id)
                      }
                    >
                      Confirmation
                    </Button>
                  </ButtonGroup>
                </td>
                {/* File upload */}
                <td>
                  {files[data.id - 1] === undefined && (
                    <Form.Control
                      onChange={(e) => handleFileSelect(e, data.id)}
                      accept=".pdf, .png, .jpeg, .jpg"
                      id={`file-${data.id}`}
                      as="input"
                      type="file"
                    ></Form.Control>
                  )}
                  {files[data.id - 1] === true && (
                    <Button
                      onClick={() => modalHandle("Reciept", data.id)}
                      variant="outline-info"
                    >
                      View Receipt
                    </Button>
                  )}
                </td>
                {/* <td>
                  <p>{data.reason}</p>
                </td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {/* Makes a call to the popup component but it will only call if showModal is true and with the
            call it sends a variable called show with the value of showModal and close using the set method of showModal
            Then sends the obj that was clicked on to be used*/}
      {showModal ? (
        <FormPopUp
          show={showModal}
          close={() => setShowModal(false)}
          data={modalObj}
          reqId={modalId}
        />
      ) : (
        ""
      )}

      {showConfirmation ? (
        <ConfirmationModal
          show={showConfirmation}
          confirm={(reason) => handleConfirmationShow(reason)}
          close={() => setShowConfirmation(false)}
          data={modalObj}
          reqId={modalId}
        />
      ) : (
        ""
      )}

      {showReceipt ? (
        <ShowReceipt
          show={showReceipt}
          close={() => setShowReceipt(false)}
          data={requests}
          reqId={reqId}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ReviewApproveTable;