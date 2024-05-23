import React, { useState, useContext } from 'react';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { getAllUsers } from '../../services/UserService';
import MyContext from '../../FireBase/MyContext';
import signInFireBase from '../../FireBase/signInFireBase';

function LoginForm() {
    const { cookies, setCookies } = useContext(MyContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const handleLogin = async (e) => {
        e.preventDefault();
        // Here you can implement the logic to handle the login process, such as calling an API endpoint
        console.log('Logging in...');
        console.log('Email:', email);
        console.log('Password:', password);
        //TODO: Add logic to check if email attached to username + password entered matches a user on firebase
        //Currently logged in time is only 10 seconds, can set to an hour and refresh cookies anytime user does anything
        //with setCookies
        const fireBaseUser = await signInFireBase(email, password);
        if (fireBaseUser) {
            setCookies('name', fireBaseUser.displayName, { maxAge: 3600 });
            // console.log(cookies);
        }


        // Reset the form fields after submission
        // setEmail('');
        // setPassword('');
    };

    return (
        <>
            <Container fluid className="mb-3"
                style={{
                    border: "solid white 1px",
                    width: "360.5px"
                }}
            >
                <h1>Account Login</h1>
            </Container>
            <Container fluid style={{width: "350px"}}>
                <Row className="user mb-3">
                    <Col>
                        <FloatingLabel controlId="floatingInputUser" label="Email">
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                onPaste={(e) => setEmail(e.clipboardData.getData("text"))}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="pass mb-3">
                    <Col>
                        <FloatingLabel controlId="floatingInputPass" label="Password">
                            <Form.Control
                                type="password"
                                placeholder="Ex. 123bb11aa2"
                                onChange={(e) => setPassword(e.target.value)}
                                onPaste={(e) => setPassword(e.clipboardData.getData("text"))}
                                onKeyDown={event => {
                                    // console.log(event.key)
                                    if (event.key === "Enter") {
                                      handleLogin(event);
                                    }
                                  }}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>


                <Button variant="outline-success px-5" size="lg" onClick={handleLogin}>
                    Login
                </Button>
            </Container>
        </>
    );
}

export default LoginForm;