import React, { useState, useEffect } from 'react';
import { Form, Alert, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import AdminUserList from './AdminUserList';
import "../css/Dashboard.css";

export default function AdminDashboard() {

    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    useEffect(() => {
        // if currentUser matches the url
        getClient();
    });

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
        <div>
            <Form id="dashboard-form" className="mt-5">
                <h2 className="mb-4">Welcome, {currentUser.firstName} {currentUser.lastName}!</h2>
                {error && <Alert variant="danger">{error}</Alert>}
               
            </Form>

            <div> <AdminUserList /> </div>
            <Button className="p-0" variant="link" onClick={handleLogout}>Log Out</Button>

        </div>
    )
}
