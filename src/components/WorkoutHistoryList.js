import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import WorkoutTable from './WorkoutTable.js';
import Pagination from './Pagination.js';

export default class WorkoutHistoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workoutsFromDatabase: this.props.workouts,
            workoutsSearched: [],
            currentWorkout: null, 
            loading: false,
            workoutSearchValue: ""
        }
    }

    componentDidMount = async () => {
        this.setState({ loading: true });
        this.setState({ currentWorkout: this.state.workoutsFromDatabase[0].text, loading: false })
    }

    handleCallback = () =>{
        console.log("callback");
    }

    render() {
        return (
            <div>
                
                <div id="workout-table">
                    {(this.state.loading) ? "... loading ..." : this.state.workoutsFromDatabase.length > 0 ?
                        <WorkoutTable
                            key={this.state.workoutFromDatabase}
                            workouts={this.state.workoutsFromDatabase}
                            callback={this.handleCallback}
                        />
                        : "Cannot find this workout."}
                </div>
            </div >
        )
    }
}