import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ReceiptDeleteModal = ({ show, deleteIndex, deleteAll, close, index }) => {
    const handleDel = () => {
        deleteAll();
        close();
    }
    // modal can be optimized
    return (
        <Modal id="modalPopUp" show={show} onHide={close} size="md" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Confirmation
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h2>Please choose an action</h2>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {deleteIndex(index); close();}}>Delete Receipt {index+1}</Button>
                <Button onClick={handleDel}>Delete All</Button>
                <Button onClick={close}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
};
export default ReceiptDeleteModal;