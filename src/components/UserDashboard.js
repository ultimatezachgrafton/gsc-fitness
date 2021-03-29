import React, { useState, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { getUserData, searchWorkoutDatabase, searchNutritionDatabase, addClientWeightData } from '../firebase.js';
import HistoryList from './HistoryList';
import '../css/UserDashboard.css';

export default function AdminUserProfile() {
    const weightRef = useRef();
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState("");
    const [workoutsFromDatabase, setWorkoutsFromDatabase] = useState(null);
    const [nutritionFromDatabase, setNutritionFromDatabase] = useState(null);
    const [currentWorkout, setCurrentWorkout] = useState();
    const [currentNutritionPlan, setCurrentNutritionPlan] = useState();
    const [clientEmail, setClientEmail] = useState(null);
    const [clientFirstName, setClientFirstName] = useState();
    const [isWorkoutsVisible, setIsWorkoutsVisible] = useState(false);
    const [isNutritionVisible, setIsNutritionVisible] = useState(false);
    const [isWorkoutsEmpty, setIsWorkoutsEmpty] = useState(true);
    const [isNutritionEmpty, setIsNutritionEmpty] = useState(true);
    const [dateString, setDateString] = useState(null);

    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {

        const getClientDataFromDatabase = async () => {
            setLoading(true);
            if (currentUser.email !== null) {
                const data = await getUserData(currentUser.email);
                setClientEmail(data.email);
                setClientFirstName(data.firstName);
            }
            setLoading(false);
        };

        const getInitialWorkoutData = async () => {
            setLoading(true);
            searchWorkouts();
            setLoading(false);
        };

        const getInitialNutritionData = async () => {
            setLoading(true);
            searchNutritionPlans();
            setLoading(false);
        };

        const searchWorkouts = async () => {
            if (isWorkoutsEmpty) {
                const data = await searchWorkoutDatabase(clientEmail).catch(error => "error");
                if (data.length > 0) {
                    setWorkoutsFromDatabase(data);
                    setCurrentWorkout(data[0].text);
                    setIsWorkoutsEmpty(false);
                }
            }
        }

        const searchNutritionPlans = async () => {
            if (isNutritionEmpty) {
                const data = await searchNutritionDatabase(clientEmail).catch(error => "error");
                if (data.length > 0) {
                    setNutritionFromDatabase(data);
                    setCurrentNutritionPlan(data[0].text);
                    setIsNutritionEmpty(false);
                }
            }
        }

        const createDateString = async () => {
            if (dateString === null) {
                let today = new Date();
                const dd = String(today.getDate()).padStart(2, '0');
                const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                const yyyy = today.getFullYear();
                today = mm + '/' + dd + '/' + yyyy;
                setDateString(today);
            }
        }

        if (clientEmail === null && !loading) {
            getClientDataFromDatabase();
        };

        if (clientEmail !== null && workoutsFromDatabase === null && !loading) {
            getInitialWorkoutData();
        }

        if (clientEmail !== null && nutritionFromDatabase === null && isNutritionEmpty && !loading) {
            getInitialNutritionData();
        }

        if (dateString === null) {
            createDateString();
        };
    }, [currentUser.email, clientEmail, workoutsFromDatabase, nutritionFromDatabase, currentWorkout,
        currentNutritionPlan, isWorkoutsEmpty, isNutritionEmpty, dateString, loading, history, logout]);

    const handleLogout = async () => {
        setError('');
        try {
            await logout();
            history.push("/");
        } catch {
            setError('Failed to log out');
        }
    };

    const handleWorkoutCallback = (callbackData) => {
        setCurrentWorkout(callbackData);
    };

    const handleNutritionCallback = (callbackData) => {
        setCurrentNutritionPlan(callbackData);
    };

    const toggleWorkoutHistory = () => {
        if (isNutritionVisible) {
            setIsNutritionVisible(false);
        }

        if (isWorkoutsVisible) {
            setIsWorkoutsVisible(false);
        } else {
            setIsWorkoutsVisible(true);
        }
    }

    const toggleNutritionHistory = () => {
        if (isWorkoutsVisible) {
            setIsWorkoutsVisible(false);
        }

        if (isNutritionVisible) {
            setIsNutritionVisible(false);
        } else {
            setIsNutritionVisible(true);
        }
    }

    const submitWeight = () => {
        console.log(weightRef.current.value)
        addClientWeightData(clientEmail, weightRef.current.value);
    }

    return (
        <div className="wrapper-user">
            <h3>Hi, {clientFirstName}!</h3>
            <h5 className="dateString">{dateString}</h5>

            <div className="form_field">
                <Form.Group id="weight">
                    <div className="inline">
                        <h5>Today's weight: </h5><Form.Control type="text" ref={weightRef} maxLength="3" required />
                        <Button id="btn-weight" className="p-0" variant="link" onClick={submitWeight}>
                            Send.</Button>
                    </div>
                </Form.Group>
            </div>

            <div className="form-group">
                {!isWorkoutsEmpty ?
                    <div className="workout-data">
                        <h4>Your Current Workout:</h4>
                        <div className="text-area">
                            <h5>{currentWorkout}</h5>
                        </div>
                    </div> : <h5>Your first workout plan will be ready soon!</h5>}
            </div>

            <div className="form-group">
                {!isNutritionEmpty ?
                    <div className="workout-data">
                        <h4>Your Current Nutrition Plan:</h4>
                        <div className="text-area">
                            <h5>{currentNutritionPlan}</h5>
                        </div>
                    </div> : <h5>Your first nutrition plan is on its way!</h5>}
            </div>

            <div className="history">
                <span className="data">
                    {!isWorkoutsEmpty ?
                        <Button className="btn btn-primary w-30 mt-3" onClick={toggleWorkoutHistory}>
                            Workout History
                                </Button> : null}
                </span>
                <span className="data">
                    {!isNutritionEmpty ?
                        <Button className="btn btn-primary w-30 mt-3" onClick={toggleNutritionHistory}>
                            Nutrition History
                        </Button> : null}
                </span>
            </div>

            <div className="list">
                <span className="data">

                    {isWorkoutsVisible && workoutsFromDatabase !== null ?
                        <div>
                            {loading ? "...loading..." : workoutsFromDatabase.length > 0 ?
                                <HistoryList items={workoutsFromDatabase} callback={handleWorkoutCallback} />
                                : "No workout history yet!"}
                        </div> : null
                    }
                </span>

                <span className="data">

                    {isNutritionVisible && nutritionFromDatabase !== null ?
                        <div>
                            {loading ? "...loading..." : nutritionFromDatabase.length > 0 ?
                                <HistoryList items={nutritionFromDatabase} callback={handleNutritionCallback} />
                                : "No nutrition plans yet!"}
                        </div> : null
                    }
                </span>
            </div>
            <Button id="btn-logout" className="p-0" variant="link" onClick={handleLogout}>Log Out.</Button>
        </div >
    )
}