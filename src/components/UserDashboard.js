import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { getUserData, searchWorkoutDatabase, searchNutritionDatabase } from '../firebase.js';
import HistoryList from './HistoryList';
import Inbox from './Inbox'

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
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {

        const getClientDataFromDatabase = async () => {
            if (clientEmail === null && !loading) {
                setLoading(true);
                if (currentUser.email !== null) {
                    const data = await getUserData(currentUser.email);
                    console.log(data);

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
                const data = await searchWorkoutDatabase(clientEmail).catch(error => "error");
                if (data.length > 0) {
                    console.log(data);
                    setWorkoutsFromDatabase(data);
                    setCurrentWorkout(data[0].text);
                    setWorkoutValue(data[0].text);
                }
                setLoading(false);
            }
        };

        const getInitialNutritionData = async () => {
            if (clientEmail !== null && nutritionFromDatabase === null && !loading) {
                setLoading(true);
                const data = await searchNutritionDatabase(clientEmail).catch(error => "error");
                if (data.length > 0) {
                    console.log(data);
                    setNutritionFromDatabase(data);
                    setCurrentNutritionPlan(data[0].text);
                    setNutritionValue(data[0].text);
                }
                setLoading(false);
            }
        };

        getClientDataFromDatabase();
        getInitialWorkoutData();
        getInitialNutritionData();
    }, [currentUser.email, clientEmail, workoutsFromDatabase, nutritionFromDatabase, currentWorkout,
        currentNutritionPlan, workoutValue, nutritionValue, loading, history, logout]);

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

    return (
        <div>
            <Inbox />
            {/* {this.state.client.lastName}, {this.state.client.firstName} */}
            <strong>Email: </strong> email <br />
            <strong>Phone: </strong> phone <br />
            <strong>Birthdate: </strong> birthdate <br />
            <strong>Joined: </strong> joinDate <br />

            <Link to="/update-profile" className="btn btn-primary w-30 mt-3">
                <strong>Update Profile</strong>
            </Link>

            <strong>Current weight: </strong> currentWeight <br />
            <strong>Notes: </strong> notes <br />

            <div className="form-group">
                <label>Workout details</label>
                <textarea className="form-control" id="edit-workout-text" onChange={handleChangeWorkout}
                    ref={workoutRef} value={workoutValue} rows="3">
                </textarea>
                <Button className="btn btn-primary w-30 mt-3" onClick={() => setWorkoutsVisible(true)}>
                    <strong> Show Workout History</strong>
                </Button>
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
                <Button className="btn btn-primary w-30 mt-3" onClick={() => setNutritionVisible(true)}>
                    <strong> Show Nutrition History</strong>
                </Button>
            </div> <br />

            {nutritionVisible && nutritionFromDatabase !== null ?
                <div className="div-nlist">
                    {loading ? "...loading..." : nutritionFromDatabase.length > 0 ?
                        <HistoryList items={nutritionFromDatabase} />
                        : "No nutrition plans yet!"}
                </div> : null
            }

            {/* <Button className="p-0" variant="link" onClick={messageBen}>Message Ben</Button> */}
            <Button className="p-0" variant="link" onClick={handleLogout}>Log Out</Button>
        </div>
    )
}