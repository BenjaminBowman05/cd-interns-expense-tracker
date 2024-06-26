import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import FormPopUp from "../Modals/FormPopUp.jsx";
import * as userService from "../../services/UserService.jsx";
import { useState, useEffect, useContext } from "react";
import ConfirmArchiveModal from "../Modals/ConfirmArchiveModal.jsx";
import ShowReceipt from "../Modals/ShowReceipt.jsx";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Update } from "../Utilities/Update.jsx";
import PurchaserModal from "../Modals/PurchaserModal.jsx";
import MyContext from "../../FireBase/MyContext.jsx";

const PurchaseTracker = () => {
  // i literally cannot program good luck!
  const [showModal, setShowModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [modalObj, setModalObj] = useState({});

  //Obj array filled via backend
  const [requests, setRequests] = useState([]);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showPurchaser, setShowPurchaser] = useState(false);
  const { cookies, setCookies } = useContext(MyContext);

  // get users to see if admin -> Probably a better way to do this
  useEffect(() => {
    requestUserDataFromApi();
  }, []);

  const [users, setUsers] = useState();

  function requestUserDataFromApi() {
    userService.getUserByEmail(cookies.key).then((res) => {
      setUsers(res.data);
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

      return false;
    }
    return true;
  };

  const handleFileSelect = (event, id) => {
    let valid = validateFile(id);
    if (valid) {
      const reader = new FileReader();
      reader.onload = (e) => handleFileLoadPdf(e, id);
      reader.readAsDataURL(event.target.files[0]);
      modalHandle("Purchaser", id);
    }
  };

  const handlePurchaserShow = () => {
    setShowPurchaser(false);
    const updateRequest = requests.map((req) => {
      if (req.id === modalObj.id) {
        if (modalObj.purchaser == "" && modalObj.dateDelivered == "") {
          req.receipt = "";
          window.alert("Please fill out all fields and reattach file");
        } else {
          req.purchaser = modalObj.purchaser;
          req.dateDelivered = modalObj.dateDelivered;
        }
      }
      return req;
    });

    Update(modalObj);
    setRequests(updateRequest);
  };

  const handleFileLoadPdf = (event, id) => {
    let url = event.target.result;
    const newRequest = requests.map((request) => {
      if (request.id === id) {
        request.receipt = url;
        return request;
      }
      return request;
    });

    setRequests(newRequest);
  };

  function previewFiles(event, id) {
    const files = document.querySelector("#file-" + id).files;

    function readAndPreview(file, indexOfFile) {
      // Make sure `file.name` matches our extensions criteria
      if (/(\.pdf|\.png|\.jpg|\.jpeg)$/i.test(file.name)) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          const newRequest = requests.map((request) => {
            if (request.id === id) {
              request.receipts[indexOfFile] = reader.result;
              return request;
            }
            return request;
          });

          setRequests(newRequest);
        });
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

  // this code deletes the current receipt the user has selected
  // could close both modals to fix any bugs
  const receiptDelete = (index) => {
    // const updateRequest = requests.map((req) => {
    //   if (req.id === modalObj.id) {
    //     if (modalObj.receipts.length != 1) {
    //       req.receipts = req.receipts.filter((t) => t !== modalObj.receipts[index]);
    //       setModalObj(req)
    //     } else {
    //       req.receipts = [""]
    //       req.purchaser = "";
    //       req.dateDelivered = "";
    //       setModalObj(req)
    //     }
    //   } return req;
    // });
    // setRequests(updateRequest);
    // Update(modalObj);
  }

  const deleteAllReceipts = () => {
    modalObj.receipts = [];
    modalObj.purchaser = "";
    modalObj.dateDelivered = "";
    Update(modalObj);
    const updateRequest = requests.map((req) => {
      if (req.id === modalObj.id) {
        req.receipts = [""];
        req.purchaser = "";
        req.dateDelivered = "";
      }
      return req;
    });
    setRequests(updateRequest);
  }

  //Handles the modal for the view form
  const modalHandle = (status, id) => {
    retrieveModalObj(id);
    switch (status) {
      case "View":
        setShowModal(true);
        break;
      case "Archive":
        setShowArchiveModal(true);
        break;
      case "Reciept":
        setShowReceipt(true);
        break;
      case "Purchaser":
        setShowPurchaser(true);
        break;
    }
  };

  function updateReq() {
    modalObj.archive = true;
    Update(modalObj);
    const updateRequest = requests.map((req) => {
      if (req.id === modalObj.id) {
        const newTodos = requests.filter((t) => t !== req);
        setRequests(newTodos);
      } else {
        return req;
      }
    });
  }

  return (
    <div>
      <h2>Your Requests</h2>

      {/*Creates a React Bootstrap Table that alternates from black to dark gray
      with a hover effect*/}
      <div className="table-container">
        <Table
          striped
          bordered
          hover
          size="lg"
          style={{ fontFamily: "Open Sans" }}
        >
          {/* in table style removed width: "1000px" can be readded but padding in the th need to be removed */}
          <thead>
            <tr>
              <th style={{ padding: "15px" }}>ID</th>
              <th style={{ padding: "15px" }}>Expense</th>
              {/* <th>Program</th> */}
              <th style={{ padding: "15px" }}>Item</th>
              <th style={{ padding: "15px" }}>Date Created</th>
              <th style={{ padding: "15px" }}>Date Needed</th>
              <th style={{ padding: "15px" }}>View</th>
              {/* <th>Status</th> */}
              <th style={{ padding: "15px" }}>Receipt</th>
              <th style={{ padding: "15px" }}>Archive Request</th>
            </tr>
          </thead>
          <tbody>
            {/* Outputs table rows for each obj display information */}
            {requests.map((requestInfo) =>
              requestInfo.archive ? (
                ""
              ) : (
                <tr key={requestInfo.id}>
                  <td>{requestInfo.id}</td>
                  <td>${requestInfo.total}</td>
                  {/* <td>{requestInfo.program}</td> */}
                  <td>{requestInfo.items}</td>
                  <td>{requestInfo.dateOfExpense.substring(0, 10)}</td>
                  <td>{requestInfo.dateNeeded}</td>
                  <td>
                    <ButtonGroup className="mb-2 " size="sm">
                      <Button
                        id={"View-" + requestInfo.id}
                        type="button"
                        variant={
                          cookies.theme == "light"
                            ? "outline-primary"
                            : "outline-info"
                        }
                        onClick={() => modalHandle("View", requestInfo.id)}
                      >
                        View
                      </Button>
                    </ButtonGroup>
                  </td>
                  <td
                    id={`file ${requestInfo.id}`}
                    className={
                      requestInfo.receipts[0] == ""
                        ? ""
                        : "d-flex align-items-center"
                    }
                  >
                    {requestInfo.ceo &&
                      requestInfo.doo &&
                      requestInfo.requesterSupervisor ? (
                      requestInfo.receipts[0] == "" ? (
                        <Form.Control
                          onChange={(e) => previewFiles(e, requestInfo.id)}
                          accept=".pdf, .png, .jpeg, .jpg"
                          id={`file-${requestInfo.id}`}
                          as="input"
                          type="file"
                          multiple
                        ></Form.Control>
                      ) : (
                        <>
                          <Button
                            onClick={() =>
                              modalHandle("Reciept", requestInfo.id)
                            }
                            className="d-inline-block"
                            variant="outline-info"
                          >
                            View Receipt{requestInfo.receipts.length > 1 ? "s" : ""}
                          </Button>
                        </>
                      )
                    ) : requestInfo.reason != [] ? (
                      "Denied"
                    ) : (
                      "Pending..."
                    )}
                  </td>
                  <td>
                    <ButtonGroup className="mb-2 " size="sm">
                      <Button
                        id={"Archive-" + requestInfo.id}
                        type="button"
                        variant="outline-danger"
                        onClick={() => modalHandle("Archive", requestInfo.id)}
                      >
                        Archive
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </div>

      {showModal ? (
        <FormPopUp
          show={showModal}
          close={() => setShowModal(false)}
          data={modalObj}
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

      {showArchiveModal ? (
        <ConfirmArchiveModal
          show={showArchiveModal}
          close={() => {
            setShowArchiveModal(false);
          }}
          data={modalObj}
          updateUI={updateReq}
        />
      ) : (
        ""
      )}

      {showReceipt ? (
        <ShowReceipt
          show={showReceipt}
          close={() => setShowReceipt(false)}
          data={modalObj}
          deleteIndex={receiptDelete}
          deleteAll={() => deleteAllReceipts()}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default PurchaseTracker;