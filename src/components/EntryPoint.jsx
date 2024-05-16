import { getAllUsers, createUser } from "../services/UserService";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../utils/MyContext";
import { Button } from "react-bootstrap";
const EntryPoint = () => {
    const { cookies, setCookies } = useContext(MyContext);
    const [pageBool, setPageBool] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (cookies.name) {
            navigate('/logged-in')
        }
    }, [cookies.name]
    )
    
    return (
        <>
            {pageBool ?
                <SignUpForm />
                :
                <LoginForm />
            }
            <Button className="mt-2" variant="outline-info" size="sm" onClick={() => setPageBool(!pageBool)} >
                {pageBool ? "Already Have an Account." : "Create an Account?"}
            </Button>
        </>
    )
}

export default EntryPoint;