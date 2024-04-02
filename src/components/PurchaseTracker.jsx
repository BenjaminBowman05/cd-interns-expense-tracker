import Table from "react-bootstrap/Table";
import { useState } from "react";

const PurchaseTracker = () => {
  //Obj array filled via backend
  const [request, setRequest] = useState([
    {
      id: 1,
      expense: "$1000",
      program: "Kids",
      description: "For the kids!",
      signedBy: "Nicolas",
      date: "3/27/2024",
      status: "Approved",
    },
    {
      id: 2,
      expense: "$1000",
      program: "Kids",
      description: "For the kids!",
      signedBy: "Nicolas",
      date: "3/27/2024",
      status: "Pending...",
    },
  ]);

  return (
    // <>
    //Creates a React Bootstrap Table that alternates from black to dark gray with a hover effect
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Expense</th>
          <th>Program</th>
          <th>Description</th>
          <th>Signed</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {/* Outputs table rows for each obj display information */}
        {request.map((requestInfo) => (
          <>
            <tr key={requestInfo.id}>
              <td>{requestInfo.id}</td>
              <td>{requestInfo.expense}</td>
              <td>{requestInfo.program}</td>
              <td>{requestInfo.description}</td>
              <td>{requestInfo.signedBy}</td>
              <td>{requestInfo.date}</td>
              <td>{requestInfo.status}</td>
            </tr>
          </>
        ))}
      </tbody>
    </Table>
    // </>
  );
};

export default PurchaseTracker;
