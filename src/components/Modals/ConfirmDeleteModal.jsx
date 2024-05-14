import { useState } from "react"
import { Button, ButtonGroup, Modal } from "react-bootstrap"

const ConfirmDeleteModal = ({show, close, reqId}) => {
    return (
        <Modal show={show} onHide={close} size="lg" centered>
            <Modal.Header closeButton>
                Confirm
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this request?
            </Modal.Body>
            <Modal.Footer>
                    <Button
                        variant="outline-success"
                        size="md"
                    >
                        YES
                    </Button>
                    <Button
                        variant="outline-danger"
                        size="md"
                    >
                        NO
                    </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmDeleteModal;