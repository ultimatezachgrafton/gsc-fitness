import React, { useState, useEffect } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { getUserData, checkAdminStatus, searchUserDatabase } from '../firebase.js'
// import AdminUserList from '/'

export default function Dashboard() {

    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const userArray = [];

        const renderUserList = async () => {
            await searchUserDatabase().then(user => userArray.push(user))
                .then(await setUserList(userArray))
                .then(console.log(userArray))
                .catch(error => "error");
        }

        renderUserList();
        console.log(userArray);
    }, []);

    const trackUserList = () => {

    }

    const renderAdminSearchButton = () => {
        const userData = getUserData(currentUser.email);
        if (checkAdminStatus(currentUser.email)) {
            return <button variant="link" onClick={searchUserDatabase}>Find user</button>
        } else {
            return;
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
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Name: </strong>{currentUser.displayName}<br />
                    <strong>Email: </strong>{currentUser.email}<br />

                    <strong>Workout History</strong><br />

                    <Link to="/email-ben" className="btn btn-primary w-100 mt-3">
                        Email Ben
                    </Link>

                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                        Update Profile
                    </Link>

                    <div className="text-center mt-2">
                        {renderAdminSearchButton()}
                        <Button variant="link" onClick={handleLogout}>Log Out</Button>
                    </div>

                    <div>User List:
                        {Object.keys(userList).map((key) => {
                        return (
                            <div key={key}>{key}
                                {userList[key].map((user) => {
                                    return (
                                        <div key={user.id}>{user.id}</div>
                                    )
                                })}
                            </div>
                        )
                    })}
                    </div>


                </Card.Body>
            </Card>
        </div >
    )
}
