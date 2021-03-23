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
                                <PrivateRoute path="/users" component={UserDashboard} />

                                <PrivateRoute path="/client" component={AdminClientProfile} />
                                <PrivateRoute path="/update-profile" component={UpdateProfile} />
                            </Switch>
                        </AuthProvider>
                    </Router>
                </Container>
            </div>
        );
    }
}

export default App;

// Testing:
// Delete all DB data, add new data legitimately:
// Register users
// Add workouts for admin
// Add workouts for clients
// Add nuts for admin
// Add nuts for clients
// Send messages to client
// Send messages to admin from client
// Click through all links
// ChangePassword
// ChangeProfile number
// Confirm authenticate process works on each page before it loads
// Confirm history operates correctly (user-profiles might be wonky)

// CSS
// Add header w/ ben info, social media, inbox