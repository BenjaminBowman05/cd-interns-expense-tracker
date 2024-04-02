import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useState, useEffect } from "react";
import FormPopUp from './FormPopUp';

const ReviewApproveTable = () => {



    //Obj array filled via backend
    const [request, setRequest] = useState([{
        id: 1,
        firstName: "Benjamin",
        lastName: "Cruz",
        currDate: "2024/03/29",
        items: "Balls, Pens",
        purpose: "Kids need money",
        programs: ["Kids", "Adults"],
        total: 1000,
        dateNeeded: "2024/04/01",
        status: "Pending...",
        signatures: {
            requestor: "Nicolas Blackson",
            requestorSupervisor: "Jeff Lawrence",
            DOO: "",
            CEO: "Stephanie Eldridge",
        },
    }]);

    const [showModal, setShowModal] = useState(false);
    const [modalObj, setModalObj] = useState({
        id: 0,
        firstName: "",
        lastName: "",
        currDate: "",
        items: "",
        purpose: "",
        programs: [],
        total: 0,
        dateNeeded: "",
        signatures: {
            requestor: "",
            requestorSupervisor: "",
            DOO: "",
            CEO: "",
        },
    });

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

    const modalHandle = (id) => {
        const updateRequest = request.map((req) => {
            if (req.id === id) {
                return req;
            }
        });
        setModalObj(updateRequest);
        setShowModal(true);
    };

    return (
        <>
            {/* Creates a React Bootstrap Table that alternates from black to dark gray with a hover effect */}
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
                        <th>View</th>
                        <th>Decision</th>
                        <th>Confirmation</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Outputs table rows for each obj display information */}
                    {request.map((requestInfo) => (
                        <tr key={requestInfo.id}>
                            <td>{requestInfo.id}</td>
                            <td>${requestInfo.total}</td>
                            <td>{requestInfo.programs.map((program) => (
                                <p key={program} className="m-0">{program}</p>
                            ))}</td>
                            <td>{requestInfo.purpose}</td>
                            <td>{requestInfo.signatures.requestor}</td>
                            <td>{requestInfo.currDate}</td>
                            <td>{requestInfo.status}</td>
                            {/* View Button will open a version of expense form that is populated with obj data */}
                            <td>
                                <ButtonGroup className="mb-2 " size="sm">
                                    <Button
                                        className="mb-2"
                                        id={"View: " + requestInfo.id}
                                        type="button"
                                        variant="outline-light"
                                        onClick={() => modalHandle(requestInfo.id)}
                                    >
                                        View
                                    </Button>
                                </ButtonGroup>
                            </td>
                            {/* Approval Button */}
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
                                {/* Deny Button */}
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
                            {/* Confirm Button */}
                            <td>
                                <ButtonGroup className="mb-2 " size="sm">
                                    <Button
                                        className="mb-2"
                                        id={"Confirm: " + requestInfo.id}
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
            {showModal ? <FormPopUp show={showModal} close={() => setShowModal(false)} data={modalObj} />: ""}
            
        </>
    )
}

export default ReviewApproveTable;