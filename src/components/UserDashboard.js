import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AdminUserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            client: '',
            loading: false
        }
        this.getClient = this.getClient.bind(this);
    }

    componentDidMount = async () => {
        await this.getClient();
    }

    async getClient() {
        this.setState({ loading: true });
        let pathname = this.props.location.pathname.substr(1);
        console.log(pathname);
        let userName = pathname.split("/");
        this.setState({ client: userName[1], loading: false });
    }

    render() {
        return (
            <div>
                {this.state.client.lastName}, {this.state.client.firstName}
                <strong>Email: </strong> email <br />
                <strong>Phone: </strong> phone <br />
                <strong>Birthdate: </strong> birthdate <br />
                <strong>Joined: </strong> joinDate <br />

                <Link to="/update-profile" className="btn btn-primary w-30 mt-3">
                    <strong>Update {this.state.client}'s Profile</strong>
                </Link>

                <strong>Current weight: </strong> currentWeight <br />
                <strong>Notes: </strong> notes <br />

                <strong>Current Workout Plan: </strong> currentWorkoutPlan <br />
                Update Workout Button

                <Link to="/workout-history" className="btn btn-primary w-30 mt-3">
                    <strong> {this.state.client}'s Workout History</strong>
                </Link>

                <strong>Current Nutrition Plan: </strong> currentNutritionPlan <br />
                Update Nutrition Button

                <Link to="/nutrition-plan" className="btn btn-primary w-30 mt-3">
                    <strong> {this.state.client}'s Nutrition History</strong>
                </Link>

                Graph

                <Link to="/email-ben" className="btn btn-primary w-100 mt-3">
                    <strong>Email Ben</strong>
                </Link>
            </div>
        )
    }
}