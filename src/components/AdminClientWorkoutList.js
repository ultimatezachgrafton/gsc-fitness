import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { searchWorkoutDatabase } from '../firebase.js';
import AdminWorkoutTable from './AdminWorkoutTable.js';
import Pagination from './Pagination.js';
import '../css/AdminWorkoutList.css';

export default class AdminWorkoutList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workoutsFromDatabase: [],
            workoutsDisplayed: [],
            workoutsSearched: [],
            loading: false,
            workoutSearchValue: "",
            maxPerPage: 10
        }
        this.handleChange = this.handleChange.bind(this);
        this.getInitialWorkoutData = this.getInitialWorkoutData.bind(this);
        this.searchWorkout = this.searchWorkout.bind(this);
        this.loadWorkoutPages = this.loadWorkoutPages.bind(this);
    }

    componentDidMount = async () => {
        await this.getInitialWorkoutData();
    }

    async getInitialWorkoutData() {
        this.setState({ loading: true });
        const data = await searchWorkoutDatabase().catch(error => "error");
        this.setState({ workoutsFromDatabase: data, loading: false });
        this.loadWorkoutPages(1);
    }

    async loadWorkoutPages(pageNumber) {
        this.setState({ loading: true });
        let currentPage = [];

        const initialElement = (pageNumber - 1) * this.state.maxPerPage;
        const finalPageElement = this.state.workoutsFromDatabase.length - (this.state.workoutsFromDatabase.length % this.state.maxPerPage);
        const remainder = (this.state.workoutsFromDatabase.length % this.state.maxPerPage);

        if (initialElement === finalPageElement) {
            for (let i = ((pageNumber - 1) * this.state.maxPerPage); i < initialElement + remainder; i++) {
                currentPage.push(this.state.workoutsFromDatabase[i]);
                this.setState({ workoutsDisplayed: currentPage, loading: false });
            }
        } else {
            for (let i = ((pageNumber - 1) * this.state.maxPerPage); i < initialElement + this.state.maxPerPage; i++) {
                currentPage.push(this.state.workoutsFromDatabase[i]);
                this.setState({ workoutsDisplayed: currentPage, loading: false });
            };
        };
    }

    async handleChange(event) {
        await this.setState({ workoutSearchValue: event.target.value });

        this.searchWorkout(event);

        // Reset table once input values cleared from search bar
        if (this.state.workoutSearchValue === "") {
            this.setState({ workoutsDisplayed: [] });
            this.loadWorkoutPages(1);
        }
    };

    searchWorkout = async (event) => {
        event.preventDefault();
        this.setState({ workoutsDisplayed: [], loading: true });
        let workoutsSearched = [];
        let maxSearchResults = 10;

        // Searches for email, then last name, then first name
        for (let i = 0; i < this.state.workoutsFromDatabase.length && i < maxSearchResults; i++) {

            if (this.state.workoutsFromDatabase[i].email.toLowerCase().includes(this.state.workoutSearchValue.toLowerCase())) {
                this.setState({ workoutsDisplayed: [this.state.workoutsFromDatabase[i]], loading: false });
                return;

            } else if (this.state.workoutsFromDatabase[i].lastName.toLowerCase().includes(this.state.workoutSearchValue.toLowerCase())) {
                workoutsSearched.push(this.state.workoutsFromDatabase[i]);

            } if (this.state.workoutsFromDatabase[i].firstName.toLowerCase().includes(this.state.workoutSearchValue.toLowerCase())) {
                workoutsSearched.push(this.state.workoutsFromDatabase[i]);
            }

            this.setState({ workoutsDisplayed: workoutsSearched });
        }
        this.setState({ loading: false });
    }

    render() {
        return (
            <div>

                <Form inline>
                    <Form.Control type="text" className="w-25" defaultValue={this.state.workoutSearchValue}
                        onChange={this.handleChange} placeholder="Enter workout name" />
                    <Button type="submit" onClick={this.searchWorkout} className="mb-2">
                        <strong>Find Workout</strong>
                    </Button>
                </Form>
                <div id="workout-table">
                    {(this.state.loading) ? "... loading ..." : this.state.workoutsDisplayed.length > 0 ?
                        <AdminWorkoutTable
                            key={this.state.workoutsDisplayed}
                            workouts={this.state.workoutsDisplayed}
                        />
                        : "Cannot find this workout."}
                </div>

                <Pagination loadWorkoutPages={this.loadWorkoutPages} workouts={this.state.workoutsFromDatabase} 
                    maxPerPage={this.state.maxPerPage} />
            </div >
        )
    }
}
