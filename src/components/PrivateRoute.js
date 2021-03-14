import React, { useState, useEffect } from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState("");
    const history = useHistory();

    useEffect(() => {
        const checkIfLoggedIn = async () => {
            if (currentUser === null) {
                handleLogout();
            };
        }
        checkIfLoggedIn();
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
            <Route {...rest}
                render={props => {
                    return currentUser ? <Component {...props} /> : <Redirect to="/login" />
                }}>
            </Route>

        </div>
    )
}