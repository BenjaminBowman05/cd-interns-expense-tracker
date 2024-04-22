import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { useState, useEffect } from "react";
import FormPopUp from './Modals/FormPopUp';
import ApproveModal from './Modals/ApproveModal';
import DenyModal from './Modals/DenyModal';
import * as expenseService from '../services/ExpenseService.jsx';

const ReviewApproveTable = () => {

    //Obj array filled via backend
    const [request, setRequest] = useState([
        // {
        //     id: 1,
        //     firstName: "Benjamin",
        //     lastName: "Cruz",
        //     dateOfExpense: "2024/03/29",
        //     lastUpdatedDateOfExpense: "2024-04-05T13:28:48.218904",
        //     items: "Balls, Pens",
        //     purpose: "Kids need money",
        //     expensePrograms: [
        //         { id: 1, programName: "Kids", cost: 900, expenseId: 1 },
        //         { id: 2, programName: "Adults", cost: 100, expenseId: 2 }
        //     ],
        //     total: 1000,
        //     dateNeeded: "2024/04/01",
        //     requester: true,
        //     requesterSupervisor: false,
        //     userId: 1,
        //     doo: false,
        //     ceo: false,
        // },
    ]);

    //The UseEffect calls a function
    useEffect(() => {
        requestDataFromApi();
    }, [])

    //The Function makes use of the expenseService function list to call all of the expenses from the back-end
    //Then sets the empty objArray with all of the values from the back-end
    function requestDataFromApi() {
        expenseService.getAllExpenses()
            .then(res => {
                setRequest(res.data);
            })
    }

    //Used as a temp storage to send a obj to the popup
    const [modalObj, setModalObj] = useState({});

    //Method is responsible looking through array and finding obj with matching id and altering approval
    const setChecked = (btnVal, id) => {
        const updateRequest = request.map((req) => {
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

        //sets the array with updated value
        setRequest(updateRequest);
    };

    //showModal used in conjunction with the view button
    const [showModal, setShowModal] = useState(false);

    //This handles the approval decision
    const [showApproval, setShowApproval] = useState(false);
    const handleApprovalShow = () => {
        setShowApproval(false);
        window.alert("Approved");
    };

    //This handles the denial decision
    const [showDeny, setShowDeny] = useState(false);
    const handleDenyShow = () => {
            setShowDeny(false);
            window.alert("Denial has been sent")
    };

    //Temp Method with placeholder content is linked to the confirmation button will handle updating the status of expenses
    const confirmationHandle = (status, id) => {
        retrieveModalObj(id);
        if (status) {
            setShowApproval(true);
        } else {
            setShowDeny(true);
        }

    };

    //Finds the obj tied to the view button clicked then stores it for later
    const retrieveModalObj = (id) => {
        const updateRequest = request.map((req) => {
            if (req.id === id) {
                return req;
            }
        });
        setModalObj(updateRequest);
    }

    //Handles the modal for the view form
    const modalHandle = (id) => {
        retrieveModalObj(id);
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
                        <th>Date</th>
                        <th>View</th>
                        <th>Decision</th>
                        <th>Confirmation</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Outputs table rows for each obj display information */}
                    {request.map((data) => (
                        <tr key={data.id}>
                            <td>{data.id}</td>
                            <td>${data.total}</td>
                            <td>{data.expensePrograms.map((program) => (
                                <p key={program.programName} className="m-0">{program.programName}</p>
                            ))}</td>
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
                                        onClick={() => modalHandle(data.id)}
                                    >
                                        View
                                    </Button>
                                </ButtonGroup>
                            </td>
                            {/* Approval Button */}
                            <td>
                                <ToggleButtonGroup type="radio" name="actions" className="mb-2 " size="sm">
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
                                        className="mb-2"
                                        id={"Confirm: " + data.id}
                                        type="button"
                                        variant="outline-secondary"
                                        onClick={() => confirmationHandle(data.requesterSupervisor, data.id)}
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

            {showDeny ? <DenyModal show={showDeny} confirm={() => handleDenyShow()} close={() => setShowDeny(false)} data={modalObj} /> : ""}
            {showApproval ? <ApproveModal show={showApproval} confirm={() => handleApprovalShow()} close={() => setShowApproval(false)} data={modalObj} /> : ""}

        </>
    )
}

export default ReviewApproveTable;