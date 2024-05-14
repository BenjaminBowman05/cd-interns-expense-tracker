import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import FormPopUp from "./Modals/FormPopUp.jsx";
import * as userService from "../services/UserService.jsx";
import { useState, useEffect } from "react";
import ConfirmDeleteModal from "./Modals/ConfirmDeleteModal.jsx";

const PurchaseTracker = () => {
  // get users to see if admin -> Probably a better way to do this
  useEffect(() => {
    requestUserDataFromApi();
  }, []);

  function requestUserDataFromApi() {
    userService.getUserById(1).then((res) => {
      // console.log(res.data);
      setRequests(res.data.userExpenses);
    });
  }

  const validateFile = (id) => {
    var fileInput = document.getElementById(`file-${id}`);

    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions = /(\.pdf|\.png|\.jpg|\.jpeg)$/i;

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

  const handleFileLoadText = (event) => {
    console.log(event);
    document.getElementById("modal-body").textContent = event.target.result;
  };

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

  const [show, setShow] = useState(false);
  // probably should connect all these to the backend as well not sure.
  // i literally cannot program good luck!
  const [reqId, setReqId] = useState(0);
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalObj, setModalObj] = useState({});
  const [modalId, setModalId] = useState(0);
  //Obj array filled via backend
  const [requests, setRequests] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setReqId(id - 1); // array indexing thats why we sub 1
    setShow(true);
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
    setModalId(id);
    switch (status) {
      case "View":
        setShowModal(true);
        break;
      case "Delete":
        setShowDeleteModal(true);
        break;
    }
  };

  return (
    <>
      {/*Creates a React Bootstrap Table that alternates from black to dark gray
      with a hover effect*/}
      <Table striped bordered hover size="lg">
        <thead>
          <tr>
            <th>ID</th>
            <th>Expense</th>
            {/* <th>Program</th> */}
            <th>Item</th>
            <th>Date Created</th>
            <th>Date Needed</th>
            <th>View</th>
            {/* <th>Status</th> */}
            <th>Receipt</th>
            <th>Cancel Request</th>
          </tr>
        </thead>
        <tbody>
          {/* Outputs table rows for each obj display information */}
          {requests.map((requestInfo) => (
            <tr key={requestInfo.id}>
              <td>{requestInfo.id}</td>
              <td>{requestInfo.total}</td>
              {/* <td>{requestInfo.program}</td> */}
              <td>{requestInfo.items}</td>
              <td>{requestInfo.dateOfExpense}</td>
              <td>{requestInfo.dateNeeded}</td>
              <td>
                <ButtonGroup className="mb-2 " size="sm">
                  <Button
                    id={"View-" + requestInfo.id}
                    type="button"
                    variant="outline-light"
                    onClick={() => modalHandle("View", requestInfo.id)}
                  >
                    View
                  </Button>
                </ButtonGroup>
              </td>
              <td>
                {files[requestInfo.id - 1] === undefined && (
                  <Form.Control
                    onChange={(e) => handleFileSelect(e, requestInfo.id)}
                    accept=".pdf, .png, .jpeg, .jpg"
                    id={`file-${requestInfo.id}`}
                    as="input"
                    type="file"
                  ></Form.Control>
                )}
                {files[requestInfo.id - 1] === true && (
                  <Button
                    onClick={() => handleShow(requestInfo.id)}
                    variant="outline-info"
                  >
                    View Receipt
                  </Button>
                )}
              </td>
              <td>
                <ButtonGroup className="mb-2 " size="sm">
                  <Button
                    id={"Cancel-" + requestInfo.id}
                    type="button"
                    variant="outline-danger"
                    onClick={() => modalHandle("Delete", requestInfo.id)}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              </td>
              {/**<Button
                  onClick={(e) => handleShow(requestInfo.id)}
                  variant="outline-info"
                >
                  View Receipt
                </Button> */}
            </tr>
          ))}
        </tbody>
      </Table>

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

      {showDeleteModal ? (
        <ConfirmDeleteModal
          show={showDeleteModal}
          close={() => setShowDeleteModal(false)}
          reqId={modalId}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default PurchaseTracker;
