import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

export default function ChangePassword() {
    const emailRef = useRef();
    const { currentUser, resetPassword, logout } = useAuth();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setMessage("");
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Check your inbox for further instructions");
        } catch {
            console.log(emailRef.current.value);
            setError("Failed to reset password");
        }

        setLoading(false);
    }

    return (
        <div>
            <body className="align">
                <div className="grid">
                    <div className="pass">
                        <h2 className="text-center mb-4">Reset Password</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {message && <Alert variant="success">{message}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <div className="form_field">
                                <Form.Group id="email">
                                    <Form.Control type="email" ref={emailRef} placeholder="Email" required />
                                </Form.Group>
                            </div>
                            <input type="submit" value="Submit" />
                        </Form>
                    </div>
                    <div className="text-center mt-2"><Link to="/">Back to Log In</Link></div>
                </div >
            </body>
        </div>
    )
}