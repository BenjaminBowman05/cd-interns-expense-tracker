import { useState } from "react";
import { Button, ButtonGroup, Modal } from "react-bootstrap";
import * as expenseService from "../../services/ExpenseService.jsx";
import * as programsService from "../../services/ProgramService.jsx";

const ConfirmDeleteModal = ({ show, close, updateUI, data }) => {
  const deleteExpense = () => {
    for (let i = 0; i < data.expensePrograms.length; i++) {
      programsService.deleteProgram(data.expensePrograms[i].id);
    }

    expenseService.deleteExpense(data.id);
  };

  return (
    <Modal show={show} size="lg" centered backdrop="static">
      <Modal.Header>Confirm</Modal.Header>
      <Modal.Body>Are you sure you want to delete this request?</Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-success"
          size="md"
          onClick={(e) => {
            deleteExpense();
            updateUI();
            close();
          }}
        >
          YES
        </Button>
        <Button variant="outline-danger" size="md" onClick={close}>
          NO
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteModal;
