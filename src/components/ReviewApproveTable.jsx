import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useState, useEffect } from "react";
import FormPopUp from './FormPopUp';

const ReviewApproveTable = () => {

    //Obj array filled via backend
    const [request, setRequest] = useState([
        {
            id: 1,
            firstName: "Benjamin",
            lastName: "Cruz",
            currDate: "2024/03/29",
            items: "Balls, Pens",
            purpose: "Kids need money",
            programs: [{program: "Kids", cost: 900}, {program: "Adults", cost: 100}],
            total: 1000,
            dateNeeded: "2024/04/01",
            status: "Pending...",
            signatures: {
                requestor: "Nicolas Blackson",
                requestorSupervisor: "Jeff Lawrence",
                DOO: "",
                CEO: "Stephanie Eldridge",
            },
        }
    ]);

    

    //showModal used in conjunction with the view button
    const [showModal, setShowModal] = useState(false);

    //Used as a temp storage to send a obj to the popup
    const [modalObj, setModalObj] = useState({});

    //Method is responsible looking through array and finding obj with matching id and altering approval
    const setChecked = (btnVal, id) => {
        const updateRequest = request.map((req) => {
            if (req.id === id) {
                if (btnVal == "Approved" && req.status != btnVal) {
                    return { ...req, status: "Approved" };
                } else if (btnVal == "Denied" && req.status != btnVal) {
                    return { ...req, status: "Denied" };
                }
                return { ...req, status: "Pending..." };
            } else {
                return req;
            }
        });

        //sets the array with updated value
        setRequest(updateRequest);
    };

    //Temp Method with placeholder content is linked to the confirmation button will handle updating the status of expenses
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
                                <p key={program.program} className="m-0">{program.program}</p>
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
                                        onClick={() => setChecked("Approved", requestInfo.id)}
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
                                        onClick={() => setChecked("Denied", requestInfo.id)}
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
            {/* Makes a call to the popup component but it will only call if showModal is true and with the
            call it sends a variable called show with the value of showModal and close using the set method of showModal
            Then sends the obj that was clicked on to be used*/}
            {showModal ? <FormPopUp show={showModal} close={() => setShowModal(false)} data={modalObj} /> : ""}

        </>
    )
}

export default ReviewApproveTable;