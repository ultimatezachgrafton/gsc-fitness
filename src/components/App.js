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

// Implement profile functionality:
//      5. inbox
//      6. "object object" issue w createdString
//
// CSS
// Add header w/ ben info, social media
// max-height to tables w/o pagination, limit number shown
//
// Confirm authenticate process works on each page before it loads
// Confirm history operates correctly (user-profiles might be wonky)