import { useState } from "react";
import { Button, ButtonGroup, Modal } from "react-bootstrap";
import * as expenseService from "../../services/ExpenseService.jsx";

const ConfirmDeleteModal = ({ show, close, reqId }) => {
  const deleteExpense = () => {
    expenseService.deleteExpense(reqId);
  };

  return (
    <Modal show={show} onHide={close} size="lg" centered>
      <Modal.Header closeButton>Confirm</Modal.Header>
      <Modal.Body>Are you sure you want to delete this request?</Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-success"
          size="md"
          onClick={(e) => {
            deleteExpense();
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
