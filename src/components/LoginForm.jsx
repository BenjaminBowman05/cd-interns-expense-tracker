import React, { useState,useContext } from 'react';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { getAllUsers } from '../services/UserService';
import MyContext from '../utils/MyContext';

function LoginForm({ setCurrentUser }) {
    const { cookies,setCookies } = useContext(MyContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Here you can implement the logic to handle the login process, such as calling an API endpoint
        console.log('Logging in...');
        console.log('Username:', username);
        console.log('Password:', password);
        //TODO: Add logic to check if email attached to username + password entered matches a user on firebase
        //Currently logged in time is only 10 seconds, can set to an hour and refresh cookies anytime user does anything
        //with setCookies
        setCookies('name', username, { maxAge: 3600 });
        console.log(cookies);
        
        // Reset the form fields after submission
        setUsername('');
        setPassword('');
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
                        <FloatingLabel controlId="floatingInputUser" label="User Name">
                            <Form.Control
                                type="name"
                                placeholder="User"
                                onChange={(e) => setUsername(e.target.value)}
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