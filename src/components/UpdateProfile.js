import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function UpdateProfile() {
    const passwordOldRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updatePassword } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match');
        };

        if (passwordOldRef.current.value !== currentUser.email) {
            console.log(currentUser.email);
            return setError('This is not the current password we have on file');
        };

        const promises = [];
        setLoading(true);
        setError('');
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value));
        };

        Promise.all(promises).then(() => {
            history.push('/');
        }).catch(() => {
            setError('Failed to update profile')
        }).finally(() => 
            setLoading(false)
        )
    };

    return (
        <div>
            <Card>
                <Card.Body>
                    <h2>Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                    <Form.Group id="passwordOld">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group id="passwordConfirm">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef}>
                            </Form.Control>
                        </Form.Group>
                        <Button disabled={loading} type="submit">Update</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="text-center mt-2"><Link to="./Login">Cancel</Link></div>
        </div>
    )
}