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
                            </Switch>
                        </AuthProvider>
                    </Router>
                </Container>
            </div>
        );
    }
}

export default App;

// CSS
// Add header w/ ben info, social media
// Users should not have editable text areas
// Ben needs "sign up here" function in AdminDashboard