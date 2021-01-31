import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { updateUserDataFromProfile } from '../firebase.js'

export default function UpdateProfile() {
    const phoneRef = useRef();
    const currentUser = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();

        const promises = [];
        setLoading(true);
        setError('');
        if (phoneRef.current.value) {
            promises.push(updateUserDataFromProfile(phoneRef.current.value));
        };

        Promise.all(promises).then(() => {
            history.push('/');
        }).catch(() => {
            setError('Failed to update profile')
        }).finally(() =>
            setLoading(false)
        )
    };

    // profile contains phone number, password change option, photo, TBD

    return (
        <div>
            <Card>
                <Card.Body>
                    <h2>Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="phone" ref={phoneRef}>
                            </Form.Control>
                        </Form.Group>
                        <Button disabled={loading} type="submit">Update</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="text-center mt-2"><Link to="./ChangePassword">Change Password</Link></div>
            <div className="text-center mt-2"><Link to="./Login">Cancel</Link></div>
        </div>
    )
}