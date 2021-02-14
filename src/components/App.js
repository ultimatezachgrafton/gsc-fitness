import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import UserDashboard from'./UserDashboard';
import AdminDashboard from './AdminDashboard';
import AdminUserProfile from './AdminUserProfile';
import SignUp from './SignUp';
import Login from './Login';
import ChangePassword from './ChangePassword';
import UpdateProfile from './UpdateProfile';

class App extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Router>
                        <AuthProvider>
                            <Switch>
                                <Route exact path="/" component={Login} />
                                <Route path="/sign-up" component={SignUp} />
                                <Route path="/change-password" component={ChangePassword} />
                                <PrivateRoute path="/admin" component={AdminDashboard} />
                                <PrivateRoute path="/update-profile" component={UpdateProfile} />
                                <PrivateRoute path="/:handle" component={AdminUserProfile} />
                                <PrivateRoute path="/:handle" component={UserDashboard} />
                            </Switch>
                        </AuthProvider>
                    </Router>
                </Container>
            </div>
        );
    }
}

export default App;

// Next step:
// issue: add authenticate process to each page before it loads

// tomorrow:
// Implement profile functionality:
//      1. fb fill out info on dashboard/profile
//      2. fb accept new updates from ben
//      3. messaging between ben/user
//      4. graph if reasonable
// CSS
// Add header w/ ben info, social media

// QUESTIONS:
// how do I better implement the login + auth system so it sends to the correct urls (not "/login"), 
//      and doesn't mess up if back button hit twice quickly