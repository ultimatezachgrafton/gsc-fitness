import React, { useState, useEffect } from 'react';
import { Form, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { getUserData } from '../firebase.js'
import "../css/Dashboard.css";

export default function AdminClientProfile(props) {

    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        // if currentUser matches the url
        const pathname = window.location.pathname;
        const userName = pathname.split("/");
        console.log(currentUser.uid);
        if (currentUser.email !== null) {
            getClientDataFromDatabase();
        }
        // console.log(props.client)
        // setClient(props.client);
    });

    // utilize getUserData and populate profile with said data
    async function getClientDataFromDatabase() {
        setLoading(true);
        let pathname = props.location.pathname.substr(1);
        console.log(pathname);
        let userName = pathname.split("/");
        if (userName !== null) {
            setClient(userName[1]);
            setLoading(false);
        } else {
            console.log("logout")
            this.handleLogout();
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        console.log("submit")

        try {
            setError('');
        } catch {
            setError('Failed to log in');
        };
        setLoading(false);
    };

    async function handleLogout() {
        // setError('');
        try {
            await logout();
            history.push("/");
        } catch {
            setError('Failed to log out');
        }
    }

    return (
        <div>
            {/* {this.state.client.lastName}, {this.state.client.firstName} */}
            <strong>Email: </strong> email <br />
            <strong>Phone: </strong> phone <br />
            <strong>Birthdate: </strong> birthdate <br />
            <strong>Joined: </strong> joinDate <br />

            <Link to="/update-profile" className="btn btn-primary w-30 mt-3">
                <strong>Update {client}'s Profile</strong>
            </Link>

            <strong>Current weight: </strong> currentWeight <br />
            <strong>Notes: </strong> notes <br />

            <strong>Current Workout Plan: </strong> currentWorkoutPlan <br />
                Update Workout Button

            <strong>Current Nutrition Plan: </strong> currentNutritionPlan <br />
                Update Nutrition Button

            <Link to="/admin/client-history" className="btn btn-primary w-30 mt-3">
                <strong> {client}'sHistory</strong>
            </Link>

            <Button className="btn btn-primary w-30 mt-3" type="submit" onClick={handleSubmit}>History</Button>

                Graph

            <Button className="p-0" variant="link" onClick={handleLogout}>Log Out</Button>
        </div>
    )
}

