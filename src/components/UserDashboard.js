import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { getUserData, searchWorkoutDatabase, searchNutritionDatabase } from '../firebase.js';
import HistoryList from './HistoryList';

export default function AdminUserProfile() {
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
    const [clientCurrentWeight, setClientCurrentWeight] = useState();
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
                if (currentUser.email !== null) {
                    const data = await getUserData(currentUser.email);

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
            if (clientEmail !== null && nutritionFromDatabase === null && isNutritionEmpty && !loading) {
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
    }, [currentUser.email, clientEmail, workoutsFromDatabase, nutritionFromDatabase, currentWorkout,
        currentNutritionPlan, workoutValue, nutritionValue, isWorkoutsEmpty, isNutritionEmpty,
        loading, history, logout]);

    const handleLogout = async () => {
        setError('');
        try {
            await logout();
            history.push("/");
        } catch {
            setError('Failed to log out');
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
    };

    const toggleWorkoutHistory = () => {
        if (workoutsVisible) {
            setWorkoutsVisible(false);
        } else {
            setWorkoutsVisible(true);
        }
    }

    const toggleNutritionHistory = () => {
        if (nutritionVisible) {
            setNutritionVisible(false);
        } else {
            setNutritionVisible(true);
        }
    }

    return (
        <div>
            <strong>Email: </strong> email <br />
            <strong>Phone: </strong> phone <br />
            <strong>Birthdate: </strong> birthdate <br />
            <strong>Joined: </strong> joinDate <br />

            <strong>Current weight: </strong> currentWeight <br />
            <strong>Notes: </strong> notes <br />

            <div className="form-group">
                <label>Workout details</label>
                <textarea className="form-control" id="edit-workout-text" onChange={handleChangeWorkout}
                    ref={workoutRef} value={workoutValue} rows="3">
                </textarea>
                { !isWorkoutsEmpty ? 
                <Button className="btn btn-primary w-30 mt-3" onClick={toggleWorkoutHistory}>
                    <strong> Show Workout History</strong>
                </Button> : null }
            </div> <br />

            { workoutsVisible && workoutsFromDatabase !== null ?
                <div>
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
                { !isNutritionEmpty ? 
                <Button className="btn btn-primary w-30 mt-3" onClick={toggleNutritionHistory}>
                    <strong> Show Nutrition History</strong>
                </Button> : null }
            </div> <br />

            { nutritionVisible && nutritionFromDatabase !== null ?
                <div>
                    {loading ? "...loading..." : nutritionFromDatabase.length > 0 ?
                        <HistoryList items={nutritionFromDatabase} />
                        : "No nutrition plans yet!"}
                </div> : null
            }

            <Link to="/change-password" className="btn btn-primary w-30 mt-3">
                <strong>Change Password</strong>
            </Link>
            <Button className="p-0" variant="link" onClick={handleLogout}>Log Out</Button>
        </div>
    )
}