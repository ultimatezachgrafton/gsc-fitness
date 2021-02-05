import React, { Component } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { searchUserDatabase, searchUserDatabaseForUsername } from '../firebase.js'
import "../css/AdminUserList.css"

export default class AdminUserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: false,
            userSearch: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.searchUser = this.searchUser.bind(this);
        this.loadUsers = this.loadUsers.bind(this);
    }

    componentDidMount = async () => {
        this.setState({ loading: true });
        const data = await searchUserDatabase().catch(error => "error");
        this.setState({ users: data, loading: false });
    }

    async handleChange(event) {
        event.preventDefault();
        await this.setState({ loading: true });
        const { value } = event.target;
        await this.setState({ userSearch: value });
        // console.log("change" + this.state.userSearch);

        this.searchUser(event);
    };


    // TODO OK!!! "users" is taking every array element as a user; needs to be an array of arrays
    async searchUser(event) {
        event.preventDefault();
        // console.log("search" + this.state.userSearch);
        console.log("length1" + this.state.users.length);
        console.log("users: " + this.state.users);
        // this is only taking the first letter typed
        // changing to 1 because the 
        const numberOfUsers = this.state.users.length;
        for (let i = 0; i < numberOfUsers; i++) {
            if (this.state.users[i].indexOf(this.state.userSearch) > -1) {
                console.log("length2" + this.state.users.length);
                console.log(this.state.userSearch + " found inside your_string " + this.state.users[i]);
                await this.setState({ users: this.state.userSearch });
                
            };
            // TODO: if bar clear, show all users again
            // when empty, erroneously displays twice
        }
        console.log(this.state.users + "search: " + this.state.userSearch);
        this.setState({ loading: false });
    };

    async loadUsers(pageNumber) {
        let response = await fetch(`https://swapi.dev/api/people/?page=${pageNumber}`);
        let data = await response.json();
        this.setState({ characters: data.results });
    };

    render() {
        return (
            <div>
                <Form>
                    <Form inline>
                        <Form.Control type="text" className="w-25" defaultValue={this.state.userSearch} searchUser={this.searchUser}
                            onChange={this.handleChange} placeholder="Enter user's name or email" />
                        <Button type="submit" onClick={this.searchUser} className="mb-2">
                            <strong>Find User</strong>
                        </Button>
                    </Form>
                    <div id="user-list">
                        {this.state.loading ? "Loading" : this.state.users }
                            {/* // this.state.users.length > 0 ? this.state.users.map((user) =>
                            //     <Card>
                            //         <Card.Link href={`/${user[0]}`} className="user-card" key={user[0]}>
                            //             {user}
                            //         </Card.Link></Card>) :
                                // "Error loading users, try refreshing. If problem persists, contact admin." } */}
                    </div>
                </Form>
            </div>
        )
    }
}

// Make search bar onChange load and reflect users as input is entered
// Paginate results
// Make cards display dynamically and link properly
// Design user cards using react bootstrap Card
// Design profiles