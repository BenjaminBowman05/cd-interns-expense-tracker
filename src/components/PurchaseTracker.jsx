import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ShowReceipt from "./Modals/ShowReceipt";
import FormPopUp from "./Modals/FormPopUp";
import ConfirmDeleteModal from "./Modals/ConfirmDeleteModal"
import { useState } from "react";
 
const PurchaseTracker = () => {
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

  const [showView, setShowView] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const [request, setRequest] = useState({});

  // probably should connect all these to the backend as well not sure.
  // i literally cannot program good luck!
  const [reqId, setReqId] = useState(0);
  const [files, setFiles] = useState([]);
  //Obj array filled via backend
  const [requests, setRequests] = useState([
    {
      id: 1,
      dateOfExpense: "05-10-2024",
      lastUpdatedDateOfExpense: "05-10-2024 13:22:39",
      firstName: "T",
      lastName: "T",
      items: "money",
      purpose: "money",
      reason: "",
      receipt: "",
      expensePrograms: [
          {
              id: 1,
              programName: "Program 1",
              cost: 7000.0,
              expenseId: 1
          }
      ],
      total: 7000.0,
      dateNeeded: "2024-05-11",
      dateDelivered: null,
      requester: true,
      requesterSupervisor: false,
      recurring: true,
      userId: null,
      ceo: false,
      doo: false
    },
    {
      id: 3,
      dateOfExpense: "05-10-2024",
      lastUpdatedDateOfExpense: "05-10-2024 13:34:21",
      firstName: "John",
      lastName: "John",
      items: "Many items",
      purpose: "Yes",
      reason: "",
      receipt: "",
      expensePrograms: [
        {
          id: 3,
          programName: "Program 1",
          cost: 140.0,
          expenseId: 3
        },
        {
          id: 4,
          programName: "Program 2",
          cost: 500000.0,
          expenseId: 3
        },
        {
          id: 5,
          programName: "Program 4",
          cost: 1.0,
          expenseId: 3
        },
        {
          id: 6,
          programName: "Program 3",
          cost: 1.6E9,
          expenseId: 3
        }
      ],
      total: 1.600500141E9,
      dateNeeded: "2024-05-10",
      dateDelivered: null,
      requester: true,
      requesterSupervisor: false,
      recurring: false,
      userId: null,
      ceo: false,
      doo: false
    },
  ]);

  const retrieveModalObj = (id) => {
    const updateRequest = requests.map((req) => {
      if (req.id === id) {
        setReqId(req.id);
        return req;
      }
    });

    setRequest(updateRequest);
  };

  const handleView = (status, id) => {
    console.log(status);
    retrieveModalObj(id);
    switch (status) {
      case "View":
        setShowView(true);
        break;
      case "Reciept":
        setShowReceipt(true);
        setReqId(id);
        break;
      case "Delete":
        setShowConfirmation(true);
        break;
    }
  };
 
  return (
    <>
      {/* <Modal size="lg" show={showReceipt} onHide={() => setShowReceipt(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Receipt</Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal-body">
          <embed
            src={requests[reqId].receipt}
            width="500px"
            height="500px"
          ></embed>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={onHide()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
 
      {/*Creates a React Bootstrap Table that alternates from black to dark gray
      with a hover effect*/}
      <Table striped bordered hover size="lg">
        <thead>
          <tr>
            <th>ID</th>
            <th>Expense Total</th>
            {/* <th>Program</th> */}
            <th>Item(s)</th>
            {/* <th>Description</th>
            <th>Signed</th> */}
            <th>Date Created</th>
            <th>Date Needed</th>
            <th>Details</th>
            {/* <th>Status</th> */}
            <th>Receipt</th>
            <th>Cancel Request</th>
          </tr>
        </thead>
        <tbody>
          {/* Outputs table rows for each obj display information */}
          {requests.map((requestInfo) => (
            <>
              <tr key={requestInfo.id}>
                <td>{requestInfo.id}</td>
                <td>{requestInfo.total}</td>
                {/* <td>{requestInfo.program}</td> */}
                <td>{requestInfo.items}</td>
                {/* <td>{requestInfo.description}</td> */}
                {/* <td>{requestInfo.signedBy}</td> */}
                <td>{requestInfo.dateOfExpense}</td>
                <td>{requestInfo.dateNeeded}</td>
                {/* <td>{requestInfo.status}</td> */}
                <td>
                  {/* <ButtonGroup className="mb-2 " size="sm"> */}
                    <Button
                      className="mb-2"
                      id={"View-" + requestInfo.id}
                      type="button"
                      variant="outline-light"
                      onClick={() => handleView("View", requestInfo.id)}
                    >
                      View
                    </Button>
                  {/* </ButtonGroup> */}
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
                      onClick={() => handleView("Reciept")}
                      variant="outline-info"
                    >
                      View Receipt
                    </Button>
                  )}
                </td>
                <td>
                  <Button 
                    variant="outline-danger"
                    onClick={() => handleView("Delete", requestInfo.id)}
                  >
                    Delete
                  </Button>
                </td>
                {/**<Button
                  onClick={(e) => handleShow(requestInfo.id)}
                  variant="outline-info"
                >
                  View Receipt
                </Button> */}
              </tr>
            </>
          ))}
        </tbody>
      </Table>

      {showView ? (
        <FormPopUp
          show={showView}
          close={() => setShowView(false)}
          data={requests}
          reqId={reqId}
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

      {showConfirmation ? (
        <ConfirmDeleteModal 
        show={showConfirmation}
        close={() => setShowConfirmation(false)}
        reqId={reqId}
        />
      ) : (
        ""
      )}

    </>
  );
};
 
export default PurchaseTracker;
 