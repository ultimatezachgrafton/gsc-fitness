import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import UserDashboard from'./UserDashboard';
import AdminDashboard from './AdminDashboard';
import AdminClientProfile from './AdminClientProfile';
import SignUp from './SignUp';
import Login from './Login';
import ChangePassword from './ChangePassword';
import UpdateProfile from './UpdateProfile';
import AdminClientHistory from './AdminClientHistory';

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
                                <PrivateRoute path="/admin/:id" component={AdminDashboard} />
                                <PrivateRoute path="/user/:id" component={UserDashboard} />
                                <PrivateRoute path="/admin/client-history/:id" component={AdminClientHistory} />
                                <PrivateRoute path="/update-profile/:id" component={UpdateProfile} />
                                <PrivateRoute path="/:handle" component={AdminClientProfile} />
                            </Switch>
                        </AuthProvider>
                    </Router>
                </Container>
            </div>
        );
    }
}

export default App;

// Implement profile functionality:
//      1. fb fill out info on dashboard/profile
//      2. fb accept new updates from ben
//      3. messaging between ben/user
//      4. graph if reasonable
//
// CSS
// Add header w/ ben info, social media

// QUESTIONS:
//      can doublechecking currentUser be put in firebase, etc? 
//      I've coded it so two quick back-button presses logs out; is there a better way to handle?

// add workout to text area
// push to firestore
// retrieved by timestamp

// remember me checkbox
// Confirm authenticate process works on each page before it loads
// Confirm history operates correctly (user-profiles might be wonky)