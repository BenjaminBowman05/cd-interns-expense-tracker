import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ShowReceipt from "./Modals/ShowReceipt";
import FormPopUp from "./Modals/FormPopUp";
import ConfirmDeleteModal from "./Modals/ConfirmDeleteModal"
import { useState, useEffect } from "react";

const PurchaseTracker = ({ requestObj }) => {
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
  const [requests, setRequests] = useState(requestObj);
 
  return (
    <>
      {/*Creates a React Bootstrap Table that alternates from black to dark gray
      with a hover effect*/}
      <Table striped bordered hover size="lg">
        <thead>
          <tr>
            <th>ID</th>
            <th>Expense Total</th>
            <th>Item(s)</th>
            <th>Date Created</th>
            <th>Date Needed</th>
            <th>Details</th>
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
                <td>{requestInfo.items}</td>
                <td>{requestInfo.dateOfExpense}</td>
                <td>{requestInfo.dateNeeded}</td>
                <td>
                    <Button
                      className="mb-2"
                      id={"View-" + requestInfo.id}
                      type="button"
                      variant="outline-light"
                      onClick={() => handleView("View", requestInfo.id)}
                    >
                      View
                    </Button>
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
              </tr>
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