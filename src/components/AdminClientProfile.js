import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import {
    getUserData, addClientWorkoutData, addNutritionPlanData,
    searchWorkoutDatabase, searchNutritionDatabase, getClientWeightData
} from '../firebase.js';
import HistoryList from './HistoryList';
import "../css/AdminDashboard.css";

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
    const [clientFirstName, setClientFirstName] = useState();
    const [clientLastName, setClientLastName] = useState();
    const [clientWeight, setClientWeight] = useState(null);
    const [clientNotes, setClientNotes] = useState();
    const [workoutValue, setWorkoutValue] = useState();
    const [nutritionValue, setNutritionValue] = useState();
    const [isWorkoutsVisible, setIsWorkoutsVisible] = useState(false);
    const [isNutritionVisible, setIsNutritionVisible] = useState(false);
    const [isWorkoutsEmpty, setIsWorkoutsEmpty] = useState(true);
    const [isNutritionEmpty, setIsNutritionEmpty] = useState(true);
    const [workoutsUpdated, setWorkoutsUpdated] = useState(false);
    const [nutritionUpdated, setNutritionUpdated] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {

        const getClientDataFromDatabase = async () => {
            setLoading(true);
            if (props.location.state.email !== null) {
                const data = await getUserData(props.location.state.email);

                setClientFirstName(data.firstName);
                setClientLastName(data.lastName);
                setClientEmail(data.email);
                setClientBirthdate(data.birthdate);
                setClientJoinDate(data.joindate);
                setClientPhone(data.phone);
                setClientWeight(data.weight);
                setClientNotes(data.notes);
            }
            setLoading(false);

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
            const data = await searchWorkoutDatabase(clientEmail).catch(error => "error");
            if (data.length > 0) {
                setWorkoutsFromDatabase(data);
                setCurrentWorkout(data[0].text);
                setWorkoutValue(data[0].text);
                setIsWorkoutsEmpty(false);
            }
        }

        const searchNutritionPlans = async () => {
            const data = await searchNutritionDatabase(clientEmail).catch(error => "error");
            if (data.length > 0) {
                setNutritionFromDatabase(data);
                setCurrentNutritionPlan(data[0].text);
                setNutritionValue(data[0].text);
                setIsNutritionEmpty(false);
            }
        }

        if (!loading) {
            if (clientEmail === null) {
                getClientDataFromDatabase();
            }

            if (clientEmail !== null) {
                if (isWorkoutsEmpty) {
                    getInitialWorkoutData();
                }

                if (isNutritionEmpty) {
                    getInitialNutritionData();
                }

                if (workoutsUpdated) {
                    setWorkoutsUpdated(false);
                    searchWorkouts();
                }

                if (nutritionUpdated) {
                    setNutritionUpdated(false);
                    searchNutritionPlans();
                }
            }
        }
    }, [props, clientEmail, workoutsFromDatabase, nutritionFromDatabase, currentWorkout, workoutsUpdated, nutritionUpdated,
        currentNutritionPlan, clientWeight, workoutValue, nutritionValue, isNutritionEmpty, isWorkoutsEmpty, loading]);

    async function addWorkout(e) {
        e.preventDefault();
        if (workoutRef.current.value !== '') {
            setLoading(true);
            await addClientWorkoutData(props.location.state.email, workoutRef.current.value);
            if (isWorkoutsEmpty) {
                setIsWorkoutsEmpty(false);
            }
            setLoading(false);
            setWorkoutsUpdated(true);
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
            setNutritionUpdated(true);
        }
    };

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
            <div className="wrapper">
                <h2>{clientFirstName} {clientLastName}</h2>
                <h5>{clientEmail}</h5>
                <div className="info">

                    <div className="data">
                        <h4>Phone</h4>
                        <h5>{clientPhone}</h5>
                    </div>

                    <div className="data">
                        <h4>Weight</h4>
                        <h5>{clientWeight}</h5>
                    </div>

                    <div className="data">
                        <h4>Birthdate</h4>
                        <h5>{clientBirthDate}</h5>
                    </div>

                    <div className="data">
                        <h4>Joined</h4>
                        <h5>{clientJoinDate}</h5>
                    </div>
                </div>

                <div className="notes">
                    <h3>Notes: </h3>
                    <div className="notes-text">
                        <h5>{clientNotes}</h5>
                    </div>
                </div>

                <div className="form_field">

                    <div className="form-group">
                        <h4>New Workout</h4>
                        <textarea className="form-control" id="edit-workout-text" onChange={handleChangeWorkout}
                            ref={workoutRef} value={workoutValue} rows="3">
                        </textarea>
                        <button onClick={addWorkout} className="btn btn-primary">Submit Workout</button>

                        {!isWorkoutsEmpty && workoutsFromDatabase !== null ?
                            <button className="btn btn-primary"
                                onClick={() => !isWorkoutsVisible ? setIsWorkoutsVisible(true) : setIsWorkoutsVisible(false)}>
                                Workout History
                        </button> : null
                        }
                    </div>

                    {!loading && isWorkoutsVisible && workoutsFromDatabase !== null ?
                        <div>
                            {loading ? "...loading..." : workoutsFromDatabase.length > 0 ?
                                <HistoryList items={workoutsFromDatabase} callback={handleCallback} />
                                : "No workout history yet!"}
                        </div> : null
                    }<br />

                    <div className="form-group">
                        <h4>New Nutrition Plan</h4>
                        <textarea className="form-control" id="edit-workout-text" onChange={handleChangeNutrition}
                            ref={nutritionRef} value={nutritionValue} rows="3">
                        </textarea>
                        <button onClick={addNutritionPlan} className="btn btn-primary">Submit Nutrition Plan</button>

                        {!isNutritionEmpty && nutritionFromDatabase !== null ?
                            <button className="btn btn-primary"
                                onClick={() => !isNutritionVisible ? setIsNutritionVisible(true) : setIsNutritionVisible(false)}>
                                Nutrition History
                        </button> : null}
                    </div>

                    {!loading && isNutritionVisible && nutritionFromDatabase.length !== null ?
                        <div className="div-nlist">
                            {loading ? "...loading..." : nutritionFromDatabase.length > 0 ?
                                <HistoryList items={nutritionFromDatabase} />
                                : "No nutrition plans yet!"}
                        </div> : null
                    }
                    <Button id="btn-logout" className="p-0" variant="link" onClick={handleLogout}>Log Out.</Button>
                </div>
            </div>
        </div >
    )
}