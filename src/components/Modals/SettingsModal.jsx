import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";

const SettingsModal = ({show, hide}) => {

    const [theme, setTheme] = useState("")

    useEffect(() => {
        const currTheme = document.querySelector("html").getAttribute("data-bs-theme");

        if(currTheme === "dark") {
            setTheme("light");
        }
        else {
            setTheme("dark");
        }
    }, [])

    function changeTheme() {
        if (theme == "light") {
            setTheme("dark")
            document.querySelector("html").setAttribute("data-bs-theme", "light")
        }
        else {
            setTheme("light")
            document.querySelector("html").setAttribute("data-bs-theme", "dark")
        }
        
        console.log()
    }

    const buttonVar = ("outline-" + theme);

  return (
    <Modal size="lg" show={show} onHide={hide}>
        <Modal.Header closeButton>
            <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal-body">
            Toggle Theme: <Button variant={buttonVar} onClick={changeTheme}> {theme} </Button>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default SettingsModal;