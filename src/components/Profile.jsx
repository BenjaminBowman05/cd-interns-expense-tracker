import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import NavbarAlt from "./Utilities/NavbarAlt";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../FireBase/MyContext.jsx";
import * as userService from "../services/UserService.jsx";

const Profile = () => {
  const { cookies, setCookies } = useContext(MyContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  
  useEffect(() => {
    if (!cookies.name) {
      navigate("/");
    }
    requestUserDataFromApi();
  }, [cookies.name]);

  function requestUserDataFromApi() {
    userService.getUserByUsername(cookies.name).then((res) => {
      setUser(res.data);
    });
  }

  return (
    <>
      {/* <NavbarAlt /> */}

      <Container fluid>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="../src/assets/CDLogo.png" />
          <Card.Body>
            <Card.Title>User Information</Card.Title>
            <Card.Text>
              <ul id="user-info">
                <li>
                  Username: <b>{user.name}</b>
                </li>
                <li>
                  Admin Status: <b>{String(user.admin)}</b>
                </li>
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Profile;
