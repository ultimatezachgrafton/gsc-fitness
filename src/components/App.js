import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Dashboard from './Dashboard';
import SignUp from './SignUp';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';

class App extends Component {
    render() {
        return (
            <div>
                <Container className="d-flex align-items-center justify-content-center"
                    style={{ minHeight: "100vh" }}
                >
                    <div className="w-100" style={{ maxWidth: "400px" }}>
                        <Router>
                            <AuthProvider>
                                <Switch>
                                    <PrivateRoute exact path="/" component={Dashboard}/>
                                    <PrivateRoute exact path="/update-profile" component={UpdateProfile}/>
                                    <Route path="/signUp" component={SignUp}/>
                                    <Route path="/login" component={Login}/>
                                    <Route path="/forgot-password" component={ForgotPassword}/>
                                </Switch>
                            </AuthProvider>
                        </Router>
                    </div>
                </Container>
            </div>
        );
    }
}

export default App;