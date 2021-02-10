import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { checkAdminStatus } from '../firebase.js'

export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth();

    // const checkForRedirect = async () => {
        // if(!checkAdminStatus) {
        //     // redirect
        //     console.log("checked admin");
        // }
    // }

    return (
        <div>
            <Route {...rest}
                render={props => {
                    return currentUser ? <Component {...props} /> : <Redirect to="/login"/>
                }}>
            </Route>

        </div>
    )
}
