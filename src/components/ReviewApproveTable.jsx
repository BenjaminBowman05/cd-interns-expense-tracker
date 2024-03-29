import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useState } from "react";

const ReviewApproveTable = () => {

    //Obj array filled via backend
    const [request, setRequest] = useState([{id: 1, expense: "$1000", program: "Kids", description: "For the kids!", signedBy: "Nicolas", date: "3/27/2024", status: "Pending..."}, {id: 2, expense: "$1000", program: "Kids", description: "For the kids!", signedBy: "Nicolas", date: "3/27/2024", status: "Pending..."}]);

    //Method is responsible looking through array and finding obj with matching id and altering approval
    const setChecked = (id) => {
        // console.log(e);
        const updateRequest = request.map((req) => {
          if (req.id === id) {
            if (req.status == "Pending..." || req.status == "Denied") {
              return { ...req, status: "Approved" };
            }
              return { ...req, status: "Pending..." };
          } else {
            return req;
          }
        });
        // console.log(request);
     
        //sets the array with updated value
        setRequest(updateRequest);
      };
     
      const denyCheck = (id) => {
        const updateRequest = request.map((req) => {
          if (req.id === id) {
            if (req.status == "Pending..." || req.status == "Approved") {
              return { ...req, status: "Denied" };
            }
              return { ...req, status: "Pending..." };
          } else {
            return req;
          }
        });
        // console.log(request);
     
        //sets the array with updated value
        setRequest(updateRequest);
      };

      const confirmationHandle = (status) => {
        window.alert("The Request status is " + status);
      };

      return (
        // <>
        //Creates a React Bootstrap Table that alternates from black to dark gray with a hover effect
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Expense</th>
              <th>Program</th>
              <th>Description</th>
              <th>Signed</th>
              <th>Date</th>
              <th>Status</th>
              <th>Decision</th>
              <th>Confirmation</th>
            </tr>
          </thead>
          <tbody>
            {/* Outputs table rows for each obj display information */}
            {request.map((requestInfo) => (
              <tr key={requestInfo.id}>
                <td>{requestInfo.id}</td>
                <td>{requestInfo.expense}</td>
                <td>{requestInfo.program}</td>
                <td>{requestInfo.description}</td>
                <td>{requestInfo.signedBy}</td>
                <td>{requestInfo.date}</td>
                <td>{requestInfo.status}</td>
                <td>
                  <ButtonGroup className="mb-2 " size="sm">
                    <ToggleButton
                      className="mb-2"
                      id={"Approve: " + requestInfo.id}
                      type="checkbox"
                      variant="outline-success"
                      checked={requestInfo.status === "Approved"}
                      onClick={() => setChecked(requestInfo.id)}
                    >
                      {requestInfo.status === "Approved" ? "Approved" : "Approve"}
                    </ToggleButton>
                  </ButtonGroup>
                  <ButtonGroup size="sm" className="ms-2 mb-2">
                    <ToggleButton
                      className="mb-2"
                      id={"Deny: " + requestInfo.id}
                      type="checkbox"
                      variant="outline-danger"
                      checked={requestInfo.status === "Denied"}
                      onClick={() => denyCheck(requestInfo.id)}
                    >
                      {requestInfo.status === "Denied" ? "Denied" : "Deny"}
                    </ToggleButton>
                  </ButtonGroup>
                </td>
                <td>
                  <ButtonGroup className="mb-2 " size="sm">
                    <Button
                      className="mb-2"
                      id={"Approve: " + requestInfo.id}
                      type="button"
                      variant="outline-secondary"
                      onClick={() => confirmationHandle(requestInfo.status)}
                    >
                      Confirmation
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        // </> 
    )
}

export default ReviewApproveTable;