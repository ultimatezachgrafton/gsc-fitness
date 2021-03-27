import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { updateUserDataFromSignUp } from '../firebase.js';

export default function SignUp() {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
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
                phoneRef.current.value, emailRef.current.value);
            history.push('/');
        } catch {
            setError('Failed to create account. Please try again.');
        };
        setLoading(false);
        
    };

    return (
        <div>
            <Card>
                <Card.Body>
                    <h2>Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="name">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="name" ref={firstNameRef} required>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group id="name">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="name" ref={lastNameRef} required>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group id="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="phone" ref={phoneRef} required>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group id="phone">
                            <Form.Label>Birthdate</Form.Label>
                            <Form.Control type="phone" ref={phoneRef} required>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group id="passwordConfirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required>
                            </Form.Control>
                        </Form.Group>
                        <Button disabled={loading} type="submit">Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="text-center mt-2"><Link to="/">Or Log In Here</Link></div>
        </div>
    )
}