import React, { Component } from 'react'
import { getUserData, checkAdminStatus, searchUserDatabase } from '../firebase.js'

export default class AdminUserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false
        }
    }

    componentDidMount() {
        let userArray = [];
        this.setState({ loading: true });
        searchUserDatabase().then(this.setState({ data: [userArray] }))
            .then(console.log(this.state.data, userArray))
            .then(this.setState({ loading: false }))
            .catch(error => "error");
    }

    render() {
        return (
            <div>
                {this.state.data.map(item => (
                    <li key={item}>{item}</li>
                ))}
            </div>
        )
    }
}
