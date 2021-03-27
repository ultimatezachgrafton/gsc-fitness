import React, { useRef, useState, useEffect } from "react";
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

      async function handleLogout() {
        setError('');
        try {
            await logout();
            history.push("/");
        } catch {
            setError('Failed to log out');
        }
    }

    return (
        <>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Password Reset</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                  <Form.Group id="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" ref={emailRef} required />
                  </Form.Group>
                  <Button disabled={loading} className="w-100" type="submit">
                      Reset Password
                  </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                  <Link to="/">Login</Link>
              </div>
            </Card.Body>
          </Card>
            <div className="w-100 text-center mt-2">
               Need an account? <Link to="/sign-up">Sign Up</Link>
            </div>
        </>
  )
}