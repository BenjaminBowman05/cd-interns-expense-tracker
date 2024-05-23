import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { Person, PersonLinesFill, Palette, PaletteFill, Lock, UnlockFill } from "react-bootstrap-icons";

const SettingsModal = ({ show, hide, user, admin, isAdmin }) => {
  const [theme, setTheme] = useState("");
  const [profile, setProfile] = useState(false);
  const [color, setColor] = useState(false);

  useEffect(() => {
    const currTheme = document
      .querySelector("html")
      .getAttribute("data-bs-theme");

    if (currTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, []);

  function changeTheme() {
    if (theme == "light") {
      setTheme("dark");
      document.querySelector("html").setAttribute("data-bs-theme", "light");
    } else {
      setTheme("light");
      document.querySelector("html").setAttribute("data-bs-theme", "dark");
    }
  }

  const buttonVar = "outline-" + theme;

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <Modal size="lg" show={show} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body id="modal-body">
        <p>
          Toggle Theme:{" "}
          <Button variant={buttonVar} onClick={changeTheme}
          onMouseEnter={() => setColor(true)}
          onMouseLeave={() => setColor(false)}>
            {toTitleCase(theme)} {color ? <PaletteFill /> : <Palette />}
          </Button>{" "}
        </p>

        {user.admin ? (
          <p>
            Admin View:{" "}
            <Button variant={buttonVar} onClick={isAdmin}>
              {admin ? "ON" : "OFF"} {admin ? <UnlockFill /> : <Lock />}
            </Button>
          </p>
        ) : (
          ""
        )}

        <p>
          Profile:{" "}
          <Button variant={buttonVar} href="/profile"
          onMouseEnter={() => setProfile(true)}
          onMouseLeave={() => setProfile(false)}>
            View {profile ? <PersonLinesFill /> : <Person />}
          </Button>
        </p>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default SettingsModal;
