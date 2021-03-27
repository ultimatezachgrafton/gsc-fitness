import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { checkAdminStatus } from '../firebase';
import Header from '/Header';
import "../css/Login.css";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, currentUser } = useAuth();
    const [adminStatus, setAdminStatus] = useState();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {

        const checkIfLoggedIn = async () => {
            if (currentUser !== null) {
                const s = await checkAdminStatus(currentUser.email);
                await setAdminStatus(s);
            }
        }

        const handleLogin = async () => {
            if ((currentUser !== null) && (adminStatus === true || adminStatus === false)) {
                if (adminStatus === true) {
                    const url = "/admin/" + currentUser.uid;
                    history.push(url);
                } else {
                    const url = "/users/" + currentUser.uid;
                    history.push(url);
                }
            }
        }

        checkIfLoggedIn();
        handleLogin();
    }, [currentUser, adminStatus, login, history]);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            setError('');
            const s = await checkAdminStatus(emailRef.current.value);
            await setAdminStatus(s);
            await login(emailRef.current.value, passwordRef.current.value);
        } catch {
            setError('Failed to log in');
        };
        setLoading(false);
    };

    return (
        <div>

            <Card>
                <Card.Body>
                    <h2>Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required/>
                        </Form.Group>
                        <Button disabled={loading} type="submit">Submit</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/change-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="text-center mt-2"><Link to="/sign-up">Or Sign Up Here</Link></div>
        </div>
    )
}