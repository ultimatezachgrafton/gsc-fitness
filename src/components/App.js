import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Dashboard from './Dashboard';
import SignUp from './SignUp';
import Login from './Login';
import ChangePassword from './ChangePassword';
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
                                    <Route path="/change-password" component={ChangePassword}/>
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

// Next step:
// create admin find a user list for Ben to select which users' profile to view
// add to list the links for Ben to add Nutrition and Workout google docs to clients' dashboards
// create user dashboards list for users to view and select docs to view and update
// user profiles should include: isAdmin, birthdate, join date, weight, phone, name, email, dietary restrictions, other notes
// possibly graph for weight, calories