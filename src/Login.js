import React, { useState } from 'react'
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import loginMiddleware from "../src/store/actions/authaction"
import { useHistory } from "react-router-dom"

export default function Login() {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    const dispatch = useDispatch();
    let error = useSelector((state) => state.error);
    let user = useSelector((state) => state.user);
    // const history = useHistory()
    // let loading = useSelector((state) => state.loading);

    const login = (e) => {
        console.log('Login function')
        if (e) {
            e.preventDefault()
            let user = { email: email, password: password };
            console.log("login user", user);
            dispatch(loginMiddleware(user));
        }
        
    };

    if (user.isAuthenticated === true) {
        return<Redirect to="/" />;
    }
    // if (user.isAuthenticated == true) {
    //     history.push("/") 
    // }


    return (
        <div>
            {error ? <Alert variant="danger">{error}</Alert> : <></>}

        <Container>
            <Form style={{ margin: "100px" }} onSubmit={(e) => login(e)}>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}

                    />
                    
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>


                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        
                        onChange={(e) => setPassword(e.target.value)}
                    />
                   
                </Form.Group>


                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                {/* {loading ? (
                    <div>loading...</div>
                ) : ( */}
                        <Button variant="light" type="submit" style={{width:"130px", height:"50px"} } onSubmit={(e) => login(e)}>
                            LOGIN
                        </Button>
                    {/* )} */}


            </Form>
            </Container>
        </div>
    )
}
