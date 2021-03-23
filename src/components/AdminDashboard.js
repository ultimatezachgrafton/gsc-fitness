import React, { useState, useEffect } from 'react';
import { Form, Alert, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import ClientList from './ClientList';
import Inbox from './Inbox';
import "../css/Dashboard.css";

export default function AdminDashboard() {

    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    async function handleLogout() {
        setError('');
        try {
            console.log("handling logout")
            await logout();
            history.push("/");
        } catch {
            setError('Failed to log out');
        }
    }

    return (
        <div>
            <Inbox />
            <Form id="dashboard-form" className="mt-5">
                <h2 className="mb-4">Welcome, {currentUser.firstName} {currentUser.lastName}!</h2>
                {error && <Alert variant="danger">{error}</Alert>}
            </Form>



            <div> <ClientList /> </div>
            <Button className="p-0" variant="link" onClick={handleLogout}>Log Out</Button>
        </div>
    )
}