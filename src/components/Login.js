import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { checkAdminStatus } from '../firebase';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, retrieveCurrentUser, currentUser } = useAuth();
    const [adminStatus, setAdminStatus] = useState();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {

        console.log("Render")

        const checkIfLoggedIn = async () => {
            if (currentUser !== null) {
                const s = await checkAdminStatus(currentUser.email);
                await setAdminStatus(s);
            }
        }

        const handleLogin = async () => {
            if ((currentUser !== null) && (adminStatus === true || adminStatus === false)) {
                console.log(currentUser.email)
                if (adminStatus === true) {
                    const url = "/admin/" + currentUser.email;
                    history.push(url);
                } else if (adminStatus === false) {
                    console.log(emailRef.current.value)
                    const url = "/users/" + currentUser.email;
                    history.push(url);
                }
            }
        }

        checkIfLoggedIn();
        handleLogin();
    }, [currentUser, adminStatus, login, history, retrieveCurrentUser]);

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
                            <Form.Control type="email" ref={emailRef} required>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required>
                            </Form.Control>
                        </Form.Group>
                        <Button disabled={loading} type="submit">Submit</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="text-center mt-2"><Link to="./SignUp">Or Sign Up Here</Link></div>
        </div>
    )
}