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
        this.setState({ loading: true })
        let pathname = this.props.location.pathname.substr(1);
        console.log(pathname);
        let userName = pathname.split("/");
        this.setState({ client: userName[1], loading: false })
    }

    render() {
        return (
            <div>
                {this.state.client}
                <strong>Email: </strong> email <br />
                <strong>Phone: </strong> phone <br />

                Here is your Workout Profile
                Here is your Nutrition Profile

                <Link to="/workout-history" className="btn btn-primary w-100 mt-3">
                    <strong> Workout History</strong>
                </Link>

                <Link to="/nutrition-plan" className="btn btn-primary w-100 mt-3">
                    <strong> Nutrition History</strong>
                </Link>

                <Link to="/email-ben" className="btn btn-primary w-100 mt-3">
                    <strong>Email Ben</strong>
                </Link>

                <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                    <strong>Update Profile</strong>
                </Link>
            </div>
        )
    }
}
