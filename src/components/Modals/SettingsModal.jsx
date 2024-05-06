import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";

const SettingsModal = ({show, hide, admin, isAdmin}) => {

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
        admin = true;
    }

    const buttonVar = ("outline-" + theme);

    function OI() {
        if (admin === true) {
            return "ON";
        }
        else {
            return "OFF";
        }
    }

  return (
    <Modal size="lg" show={show} onHide={hide}>
        <Modal.Header closeButton>
            <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal-body">
            <p>Toggle Theme: <Button variant={buttonVar} onClick={changeTheme}>{theme}</Button> </p>
            <p>Admin View: <Button variant={buttonVar} onClick={isAdmin}>{OI()}</Button></p>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default SettingsModal;