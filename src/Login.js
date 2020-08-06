import React, { useState } from 'react'
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import loginMiddleware from './store/actions/authaction';


export default function Login() {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    const dispatch = useDispatch();
    let error = useSelector((state) => state.error);
    let user = useSelector((state) => state.user);
    // let loading = useSelector((state) => state.loading);

   


    const login = (e) => {
        e.preventDefaut()
        let user = { email: email, password: password };
        console.log("login user", user);
        dispatch(loginMiddleware(user));
    };

    if (user.isAuthenticated === true) {
        return <Redirect to="/jobs" />;
    }


    return (
        <div>
            {error ? <Alert variant="danger">{error}</Alert> : <></>}

        
            <Form style={{ margin: "100px" }} onSubmit={(e) => login(e)}>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
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
                        value ={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>


                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                {/* {loading ? (
                    <div>loading...</div>
                ) : ( */}
                        <Button variant="light" type="submit" style={{width:"130px", height:"50px"}}>
                            Submit
                        </Button>
                    {/* )} */}


            </Form>
        </div>
    )
}
