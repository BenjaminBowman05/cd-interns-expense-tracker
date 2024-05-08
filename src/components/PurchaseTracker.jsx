import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
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

  const [show, setShow] = useState(false);
  // probably should connect all these to the backend as well not sure.
  // i literally cannot program good luck!
  const [reqId, setReqId] = useState(0);
  const [files, setFiles] = useState([]);
  //Obj array filled via backend
  const [requests, setRequests] = useState([
    {
      id: 1,
      expense: "$1000",
      program: "Kids",
      item: "Baskets",
      description: "For the kids!",
      signedBy: "Nicolas",
      date: "3/27/2024",
      dateNeeded: "4/5/2024",
      status: "Approved",
      receipt: "",
    },
    {
      id: 2,
      expense: "$1000",
      program: "Kids",
      item: "Rubber Balls",
      description: "For the kids!",
      signedBy: "Nicolas",
      date: "3/27/2024",
      dateNeeded: "4/5/2024",
      status: "Pending...",
      receipt: "",
    },
    {
      id: 3,
      expense: "$1000",
      program: "Kids",
      item: "Pack of 15 Crayons",
      description: "For the kids!",
      signedBy: "Nicolas",
      date: "3/27/2024",
      dateNeeded: "4/5/2024",
      status: "Pending...",
      receipt: "",
    },
  ]);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setReqId(id - 1); // array indexing thats why we sub 1
    setShow(true);
  };

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose}>
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
          <Button variant="outline-danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/*Creates a React Bootstrap Table that alternates from black to dark gray
      with a hover effect*/}
      <Table striped bordered hover size="lg"
      caption="hello"
      columns={requests}
      >
      </Table>
    </>
  );
};

export default PurchaseTracker;
