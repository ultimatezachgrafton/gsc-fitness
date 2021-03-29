import React, { useRef, useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { updateUserDataFromSignUp } from '../firebase.js';

export default function SignUp() {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const birthRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const notesRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match');
        };

        try {
            setError('');
            setLoading(true);

            // Check if email already exists.
            await signup(emailRef.current.value, passwordRef.current.value);

            await updateUserDataFromSignUp(firstNameRef.current.value, lastNameRef.current.value,
                phoneRef.current.value, emailRef.current.value, birthRef.current.value, notesRef.current.value);
            history.push('/');
        } catch {
            setError('Failed to create account. Please try again.');
        };
        setLoading(false);

    };

    return (
        <div>
            <body className="align">
                <div className="grid">
                    <div className="signup">
                        <h2 className="text-center mb-4">Sign Up</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="name">
                                <Form.Control type="name" ref={firstNameRef} placeholder="First Name" required />
                            </Form.Group>
                            <Form.Group id="name">
                                <Form.Control type="name" ref={lastNameRef} placeholder="Last Name" required />
                            </Form.Group>
                            <Form.Group id="phone">
                                <Form.Control type="phone" ref={phoneRef} placeholder="Phone" required />
                            </Form.Group>
                            <Form.Group id="email">
                                <Form.Control type="email" ref={emailRef} placeholder="Email" required />
                            </Form.Group>
                            <Form.Group id="phone">
                                <Form.Control type="text" ref={birthRef} placeholder="Birthdate" required />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Control type="password" ref={passwordRef} placeholder="Password" required />
                            </Form.Group>
                            <Form.Group id="passwordConfirm">
                                <Form.Control type="password" ref={passwordConfirmRef} placeholder="Confirm Pasword" required />
                            </Form.Group>

                            <p>Any notes relevant to your fitness journey? Dietary restrictions, injuries, etc.</p>
                            <Form.Group id="notes">
                                <Form.Control type="text" placeholder="Notes" ref={notesRef} />
                            </Form.Group>
                            <input type="submit" value="Register" />
                        </Form>
                        <div className="text-center mt-2"><Link to="/">Or Log In Here</Link></div>
                    </div>
                </div>
            </body>
        </div>
    )
}