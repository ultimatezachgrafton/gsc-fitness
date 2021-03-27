import React, { useRef, useState, useEffect } from 'react';
import { Form, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import {
    getUserData, addClientWorkoutData, addNutritionPlanData,
    searchWorkoutDatabase, searchNutritionDatabase
} from '../firebase.js';
import HistoryList from './HistoryList';
import "../css/Dashboard.css";

export default function AdminClientProfile(props) {
    const workoutRef = useRef();
    const nutritionRef = useRef();
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState("");
    const [workoutsFromDatabase, setWorkoutsFromDatabase] = useState(null);
    const [nutritionFromDatabase, setNutritionFromDatabase] = useState(null);
    const [currentWorkout, setCurrentWorkout] = useState();
    const [currentNutritionPlan, setCurrentNutritionPlan] = useState();
    const [clientEmail, setClientEmail] = useState(null);
    const [clientPhone, setClientPhone] = useState();
    const [clientBirthDate, setClientBirthdate] = useState();
    const [clientJoinDate, setClientJoinDate] = useState();
    const [clientDisplayName, setClientDisplayName] = useState();
    const [clientNotes, setClientNotes] = useState();
    const [workoutValue, setWorkoutValue] = useState();
    const [nutritionValue, setNutritionValue] = useState();
    const [workoutsVisible, setWorkoutsVisible] = useState(false);
    const [nutritionVisible, setNutritionVisible] = useState(false);
    const [isWorkoutsEmpty, setIsWorkoutsEmpty] = useState(true);
    const [isNutritionEmpty, setIsNutritionEmpty] = useState(true);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {

        const getClientDataFromDatabase = async () => {
            if (clientEmail === null && !loading) {
                setLoading(true);
                if (props.location.state.email !== null) {
                    const data = await getUserData(props.location.state.email);

                    setClientEmail(data.email);
                    setClientBirthdate(data.birthDate);
                    setClientDisplayName(data.joinDate);
                    setClientPhone(data.phone);
                }
                setLoading(false);
            }
        };

        const getInitialWorkoutData = async () => {
            if (clientEmail !== null && workoutsFromDatabase === null && !loading) {
                setLoading(true);
                searchWorkouts();
                setLoading(false);
            }
        };

        const getInitialNutritionData = async () => {
            if (clientEmail !== null && nutritionFromDatabase === null && !loading) {
                setLoading(true);
                searchNutritionPlans();
                setLoading(false);
            }
        };

        const searchWorkouts = async () => {
            if (!isWorkoutsEmpty) {
                const data = await searchWorkoutDatabase(clientEmail).catch(error => "error");
                if (data.length > 0) {
                    setWorkoutsFromDatabase(data);
                    setCurrentWorkout(data[0].text);
                    setWorkoutValue(data[0].text);
                } else {
                    setIsWorkoutsEmpty(false);
                }
            }
        }

        const searchNutritionPlans = async () => {
            if (!isNutritionEmpty) {
                const data = await searchNutritionDatabase(clientEmail).catch(error => "error");
                if (data.length > 0) {
                    setNutritionFromDatabase(data);
                    setCurrentNutritionPlan(data[0].text);
                    setNutritionValue(data[0].text);
                } else {
                    setIsNutritionEmpty(false);
                }
            }
        }

        getClientDataFromDatabase();
        getInitialWorkoutData();
        getInitialNutritionData();
    }, [props, clientEmail, workoutsFromDatabase, nutritionFromDatabase, currentWorkout,
        currentNutritionPlan, workoutValue, nutritionValue, isNutritionEmpty, isWorkoutsEmpty, loading]);

    async function addWorkout(e) {
        e.preventDefault();
        if (workoutRef.current.value !== '') {
            setLoading(true);
            await addClientWorkoutData(props.location.state.email, workoutRef.current.value);
            if (isWorkoutsEmpty) {
                setIsWorkoutsEmpty(false);
            }
            setLoading(false);
        }
    }

    async function addNutritionPlan(e) {
        e.preventDefault();
        if (nutritionRef.current.value !== '') {
            setLoading(true);
            await addNutritionPlanData(props.location.state.email, nutritionRef.current.value);
            if (isNutritionEmpty) {
                setIsNutritionEmpty(false);
            }
            setLoading(false);
        }
    };

    async function deleteWorkoutValue(e) {
        e.preventDefault();
        setWorkoutValue('');
    }

    async function deleteNutritionValue(e) {
        e.preventDefault();
        setNutritionValue('');
    }

    const handleChangeWorkout = (e) => {
        setWorkoutValue(e.target.value);
    };

    const handleChangeNutrition = (e) => {
        setNutritionValue(e.target.value);
    };

    const handleCallback = (callbackData) => {
        setWorkoutValue(callbackData);
    }

    const handleLogout = async () => {
        setError('');
        try {
            await logout();
            history.push("/");
        } catch {
            setError('Failed to log out');
        }
    }

    return (
        <div>
            <form>
                {clientDisplayName}

                <strong>Email: </strong> {clientEmail} <br />
                <strong>Phone: </strong> {clientPhone} <br />
                <strong>Birthdate: </strong> {clientBirthDate} <br />
                <strong>Joined: </strong> {clientJoinDate} <br />

                <strong>Notes: </strong> {clientNotes} <br />

                <div className="form-group">
                    <label>Workout details</label>
                    <textarea className="form-control" id="edit-workout-text" onChange={handleChangeWorkout}
                        ref={workoutRef} value={workoutValue} rows="3">
                    </textarea>
                    <button onClick={deleteWorkoutValue} className="btn btn-primary">New Workout</button>
                    <button onClick={addWorkout} className="btn btn-primary">Submit</button>
                    {!isWorkoutsEmpty ?
                        <Button className="btn btn-primary w-30 mt-3" onClick={() => setWorkoutsVisible(true)}>
                            <strong> Show Workout History</strong>
                        </Button> : null
                    }
                </div> <br />

                {workoutsVisible && workoutsFromDatabase !== null ?
                    <div className="div-wlist">
                        {loading ? "...loading..." : workoutsFromDatabase.length > 0 ?
                            <HistoryList items={workoutsFromDatabase} callback={handleCallback} />
                            : "No workout history yet!"}
                    </div> : null
                }

                <div className="form-group">
                    <label>Nutrition plan details</label>
                    <textarea className="form-control" id="edit-workout-text" onChange={handleChangeNutrition}
                        ref={nutritionRef} value={nutritionValue} rows="3">
                    </textarea>
                    <button onClick={deleteNutritionValue} className="btn btn-primary">New Plan</button>
                    <button onClick={addNutritionPlan} className="btn btn-primary">Submit</button>
                    {!isNutritionEmpty ?
                        <Button className="btn btn-primary w-30 mt-3" onClick={() => setNutritionVisible(true)}>
                            <strong> Show Nutrition History</strong>
                        </Button> : null}
                </div> <br />

                {nutritionVisible && nutritionFromDatabase !== null ?
                    <div className="div-nlist">
                        {loading ? "...loading..." : nutritionFromDatabase.length > 0 ?
                            <HistoryList items={nutritionFromDatabase} />
                            : "No nutrition plans yet!"}
                    </div> : null
                }

                <Button className="p-0" variant="link" onClick={handleLogout}>Log Out</Button>
            </form>
        </div>
    )
}