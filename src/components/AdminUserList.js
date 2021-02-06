import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { searchUserDatabase } from '../firebase.js'
import UserTable from './UserTable.js'
import Pagination from './Pagination.js'
import '../css/AdminUserList.css'

export default class AdminUserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: false,
            userSearchValue: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.searchUser = this.searchUser.bind(this);
        this.loadUsers = this.loadUsers.bind(this);
    }

    componentDidMount = async () => {
        await this.loadUsers(1);
    }

    async loadUsers(pageNumber) {
        this.setState({ loading: true });
        const data = await searchUserDatabase().catch(error => "error");
        await this.setState({ users: data, loading: false });
        console.log(this.state.users);
    };

    async handleChange(event) {
        const { value } = event.target;
        await this.setState({ userSearchValue: value });
        console.log(this.state.userSearchValue);

        if (this.state.userSearchValue === "") {
            this.setState({ users: [] });
            this.loadUsers(1);          
        }
    };

    searchUser = async (event) => {
        event.preventDefault();
        this.setState({ loading: true });

        for (let i = 0; i < this.state.users.length; i++) {
            if (this.state.users[i][0] === this.state.userSearchValue) {
                await this.setState({ users: [this.state.users[i]], loading: false });
                console.log(this.state.users);
                return;
            }
        }
        this.setState({ loading: false });
    };

    render() {
        return (
            <div>
                <Form>
                    <Form inline>
                        <Form.Control type="text" className="w-25" defaultValue={this.state.userSearchValue} searchUser={this.searchUser}
                            onChange={this.handleChange} placeholder="Enter user's name or email" />
                        <Button type="submit" onClick={this.searchUser} className="mb-2">
                            <strong>Find User</strong>
                        </Button>
                    </Form>
                    <div id="user-table">
                        {(this.state.loading) ? "... loading ..." : this.state.users.length > 0 ?
                            <UserTable
                                key={this.state.users}
                                users={this.state.users}
                            />
                            : "Error loading users, try refreshing. If problem persists, contact admin."}
                    </div>
                </Form>
                {/* <Pagination loadUsers={this.loadUsers} /> */}
            </div >
        )
    }
}

// make search work for last name as well
// Paginate results
// Make rows link properly
// Design profiles
// new user registration emails ben a notification