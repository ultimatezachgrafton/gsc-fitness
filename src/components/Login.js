import React, { useRef, useState, useEffect } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { checkAdminStatus } from '../firebase';
import Header from './Header';
import "../css/InputForms.css";

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
            <body className="align">
                <div className="grid">
                    <div className="login">
                        <Header />
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <div className="form_field">
                                <Form.Group id="email">
                                    <Form.Control type="email" ref={emailRef} placeholder="Email" required />
                                </Form.Group>
                            </div>
                            <div className="form_field">
                                <Form.Group id="password">
                                    <Form.Control type="password" ref={passwordRef} placeholder="Password" required />
                                </Form.Group>
                            </div>
                            <div className="form_field">
                                <input type="submit" value="Sign In" />
                            </div>
                        </Form>
                        <div className="w-100 text-center mt-3">
                            <Link to="/change-password">Forgot Password?</Link>
                        </div>
                        <div className="text-center mt-2"><Link to="/sign-up">Sign Up Here</Link></div>
                    </div>
                </div>
            </body>
        </div>
    )
}