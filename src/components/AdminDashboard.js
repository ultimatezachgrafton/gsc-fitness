import React, { useState } from 'react';
import { Form, Alert, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useHistory, Link } from 'react-router-dom';
import ClientList from './ClientList';
import "../css/AdminDashboard.css";

export default function AdminDashboard() {

    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();

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
                <h2>Welcome back, Ben.</h2>
                {error && <Alert variant="danger">{error}</Alert>}
            </Form>

            <div> <ClientList /> </div>
            <div className="ml-2 mt-2"><Link to="/sign-up">Sign Up A Client.</Link></div>
            <Button id="btn-logout" className="mt-3" variant="link" onClick={handleLogout}>Log Out.</Button>
        </div>
    )
}