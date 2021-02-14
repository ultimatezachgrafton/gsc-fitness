import React, { useState, useEffect } from 'react';
import { Form, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import AdminUserList from './AdminUserList';
import "../css/Dashboard.css";

export default function AdminUserProfile(props) {

    const [ error, setError ] = useState("");
    const { currentUser, logout } = useAuth();
    const [ client, setClient ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const history = useHistory();

    useEffect(() => {
        // if currentUser matches the url
        getClient();
    });

    async function getClient() {
        setLoading(true);
        let pathname = props.location.pathname.substr(1);
        console.log(pathname);
        let userName = pathname.split("/");
        if (userName !== null) {
            setClient(userName[1]);
            setLoading(false);
        } else {
            this.handleLogout();
            console.log("logout")
        }
    }

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

            <Link to="/workout-history" className="btn btn-primary w-30 mt-3">
                <strong> {client}'s Workout History</strong>
            </Link>

            <strong>Current Nutrition Plan: </strong> currentNutritionPlan <br />
                Update Nutrition Button

            <Link to="/nutrition-plan" className="btn btn-primary w-30 mt-3">
                <strong> {client}'s Nutrition History</strong>
            </Link>

                Graph

            <Button className="p-0" variant="link" onClick={handleLogout}>Log Out</Button>
        </div>
    )
}

