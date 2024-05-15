import React, { useState } from 'react';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { createUser } from '../services/UserService';
import signUpFireBase from '../utils/signUpFireBase';
function SignUpForm() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        console.log('Signing up...');
        console.log('Email:', email);
        console.log('Username:', username);
        console.log('Password:', password);
        const fireBaseUser = await signUpFireBase(email, password);
        //TODO:need to add check if username
        if (fireBaseUser) {
            createUser({ name: username, admin: false, uid: fireBaseUser.uid })
        }
        // Reset the form fields after submission
        setEmail('');
        setUsername('');
        setPassword('');

    };

    return (
        <>
            <Container fluid className="mb-3">
                <h1>Account Creation</h1>
            </Container>
            <Container fluid>
                <Row className="email mb-3">
                    <Col>
                        <FloatingLabel controlId="floatingInputEmail" label="Email">
                            <Form.Control
                                type="email"
                                placeholder="PlaceHolder@gmail.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row>
                    <Col className="user mb-3">
                        <FloatingLabel controlId="floatingInputUser" label="User Name">
                            <Form.Control
                                type="name"
                                placeholder="User"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row>
                    <Col className="pass mb-3">
                        <FloatingLabel controlId="floatingInputPass" label="Password">
                            <Form.Control
                                type="password"
                                placeholder="Ex. 123bb11aa2"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>


                <Button variant="outline-success px-5" size="lg" onClick={handleSignUp}>
                    Sign Up
                </Button>
            </Container>
        </>
    );
}

export default SignUpForm;