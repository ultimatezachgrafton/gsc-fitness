import React, { useState, useEffect } from 'react'
import { Form, Alert, Button } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { getUserData, checkAdminStatus } from '../firebase.js'
import AdminUserList from './AdminUserList'
import "../css/Dashboard.css"

export default function Dashboard() {

    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    const renderAdminUserList = () => {
        if (checkAdminStatus(currentUser.email)) {
            return <div> <AdminUserList /> </div>
        }
    }

    const renderUserProfile = () => {
        if (!checkAdminStatus(currentUser.email)) {
            return <div>

                <strong>Email: </strong>{currentUser.email}<br />
                <strong>Phone: </strong>{currentUser.phone}<br />

                <Link to="/workouts" className="btn btn-primary w-100 mt-3">
                    <strong> Workouts </strong>
                </Link>

                <Link to="/workout-history" className="btn btn-primary w-100 mt-3">
                    <strong> Workout History</strong>
                </Link>

                <Link to="/nutrition-plan" className="btn btn-primary w-100 mt-3">
                    <strong> Nutrition Plan</strong>
                </Link>

                <Link to="/email-ben" className="btn btn-primary w-100 mt-3">
                    <strong>Email Ben</strong>
                </Link>

                <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                    <strong>Update Profile</strong>
                </Link>
            </div>
        }
    }

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
                <h2 className="mb-4">Welcome, {currentUser.displayName}!</h2>
                {error && <Alert variant="danger">{error}</Alert>}

                {renderUserProfile()}
               
            </Form>

            <div>{renderAdminUserList()} </div>
            <Button className="p-0" variant="link" onClick={handleLogout}>Log Out</Button>

        </div>
    )
}
