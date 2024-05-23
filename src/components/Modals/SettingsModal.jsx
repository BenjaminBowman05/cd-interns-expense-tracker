import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";

const SettingsModal = ({ show, hide, user, admin, isAdmin, theme, changeTheme }) => {
  const buttonVar = "outline-" + theme;

  // function toTitleCase(str) {
  //   return str.replace(/\w\S*/g, function (txt) {
  //     return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  //   });
  // }

  return (
    <Modal size="lg" show={show} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body id="modal-body">
        <p>
          Toggle Theme:{" "}
          <Button variant={buttonVar} onClick={changeTheme}>
            {theme}
          </Button>{" "}
        </p>

        {user.admin ? (
          <p>
            Admin View:{" "}
            <Button variant={buttonVar} onClick={isAdmin}>
              {admin ? "ON" : "OFF"}
            </Button>
          </p>
        ) : (
          ""
        )}
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default SettingsModal;
