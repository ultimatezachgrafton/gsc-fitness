import React, { useState, useEffect } from 'react';
import { Form, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

export default function AdminUserProfile() {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    useEffect(() => {
        // if currentUser matches the url, render
    });

    async function getClient() {
        this.setState({ loading: true });
        let pathname = this.props.location.pathname.substr(1);
        console.log(pathname);
        let userName = pathname.split("/");
        if (userName !== null) {
            this.setState({ client: userName[1], loading: false });
        } else {
            handleLogout();
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
            {this.state.client.lastName}, {this.state.client.firstName}
            <strong>Email: </strong> email <br />
            <strong>Phone: </strong> phone <br />
            <strong>Birthdate: </strong> birthdate <br />
            <strong>Joined: </strong> joinDate <br />

            <Link to="/update-profile" className="btn btn-primary w-30 mt-3">
                <strong>Update {this.state.client}'s Profile</strong>
            </Link>

            <strong>Current weight: </strong> currentWeight <br />
            <strong>Notes: </strong> notes <br />

            <strong>Current Workout Plan: </strong> currentWorkoutPlan <br />
                Update Workout Button

            <Link to="/workout-history" className="btn btn-primary w-30 mt-3">
                <strong> {this.state.client}'s Workout History</strong>
            </Link>

            <strong>Current Nutrition Plan: </strong> currentNutritionPlan <br />
                Update Nutrition Button

            <Link to="/nutrition-plan" className="btn btn-primary w-30 mt-3">
                <strong> {this.state.client}'s Nutrition History</strong>
            </Link>

                Graph

            <Link to="/email-ben" className="btn btn-primary w-100 mt-3">
                <strong>Email Ben</strong>
            </Link>
            <Button className="p-0" variant="link" onClick={handleLogout}>Log Out</Button>
        </div>
    )
}