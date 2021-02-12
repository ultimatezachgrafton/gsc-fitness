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
                                <PrivateRoute exact path="/" component={AdminDashboard} />
                                <Route path="/sign-up" component={SignUp} />
                                <Route path="/login" component={Login} />
                                <Route path="/change-password" component={ChangePassword} />
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
// issue: logout makes it so next input does not work; takes two tries to login
//      if left logged in, going to login lets you go to anyone's profile once you enter the input
//      login screen needs to be inaccessile if user is logged in
//      
// memory leak, learn cleanup

// tomorrow:
// Implement profile functionality:
//      1. fb fill out info on dashboard/profile
//      2. fb accept new updates from ben
//      3. messaging between ben/user
//      4. graph if reasonable
// CSS
// Add header w/ ben info, social media