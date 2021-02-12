import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { searchUserDatabase } from '../firebase.js';
import AdminUserTable from './AdminUserTable.js';
import Pagination from './Pagination.js';
import '../css/AdminUserList.css';

export default class AdminUserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersFromDatabase: [],
            usersDisplayed: [],
            usersSearched: [],
            loading: false,
            userSearchValue: "",
            maxPerPage: 10
        }
        this.handleChange = this.handleChange.bind(this);
        this.getInitialUserData = this.getInitialUserData.bind(this);
        this.searchUser = this.searchUser.bind(this);
        this.loadUserPages = this.loadUserPages.bind(this);
    }

    componentDidMount = async () => {
        await this.getInitialUserData();
    }

    async getInitialUserData() {
        this.setState({ loading: true });
        const data = await searchUserDatabase().catch(error => "error");
        this.setState({ usersFromDatabase: data, loading: false });
        this.loadUserPages(1);
    }

    async loadUserPages(pageNumber) {
        this.setState({ loading: true });
        let currentPage = [];

        const initialElement = (pageNumber - 1) * this.state.maxPerPage;
        const finalPageElement = this.state.usersFromDatabase.length - (this.state.usersFromDatabase.length % this.state.maxPerPage);
        const remainder = (this.state.usersFromDatabase.length % this.state.maxPerPage);

        if (initialElement === finalPageElement) {
            for (let i = ((pageNumber - 1) * this.state.maxPerPage); i < initialElement + remainder; i++) {
                currentPage.push(this.state.usersFromDatabase[i]);
                this.setState({ usersDisplayed: currentPage, loading: false });
            }
        } else {
            for (let i = ((pageNumber - 1) * this.state.maxPerPage); i < initialElement + this.state.maxPerPage; i++) {
                currentPage.push(this.state.usersFromDatabase[i]);
                this.setState({ usersDisplayed: currentPage, loading: false });
            };
            ;
        };
    }

    async handleChange(event) {
        await this.setState({ userSearchValue: event.target.value });

        this.searchUser(event);

        // Reset table once input values cleared from search bar
        if (this.state.userSearchValue === "") {
            this.setState({ usersDisplayed: [] });
            this.loadUserPages(1);
        }
    };

    searchUser = async (event) => {
        event.preventDefault();
        this.setState({ usersDisplayed: [], loading: true });
        let usersSearched = [];
        let maxSearchResults = 10;

        // Searches for email, then last name, then first name
        for (let i = 0; i < this.state.usersFromDatabase.length && i < maxSearchResults; i++) {

            if (this.state.usersFromDatabase[i].email.toLowerCase().includes(this.state.userSearchValue.toLowerCase())) {
                this.setState({ usersDisplayed: [this.state.usersFromDatabase[i]], loading: false });
                return;

            } else if (this.state.usersFromDatabase[i].lastName.toLowerCase().includes(this.state.userSearchValue.toLowerCase())) {
                usersSearched.push(this.state.usersFromDatabase[i]);

            } if (this.state.usersFromDatabase[i].firstName.toLowerCase().includes(this.state.userSearchValue.toLowerCase())) {
                usersSearched.push(this.state.usersFromDatabase[i]);
            }

            this.setState({ usersDisplayed: usersSearched });
        }
        this.setState({ loading: false });
    }

    render() {
        return (
            <div>

                <Form inline>
                    <Form.Control type="text" className="w-25" defaultValue={this.state.userSearchValue}
                        onChange={this.handleChange} placeholder="Enter user's name or email" />
                    <Button type="submit" onClick={this.searchUser} className="mb-2">
                        <strong>Find User</strong>
                    </Button>
                </Form>
                <div id="user-table">
                    {(this.state.loading) ? "... loading ..." : this.state.usersDisplayed.length > 0 ?
                        <AdminUserTable
                            key={this.state.usersDisplayed}
                            users={this.state.usersDisplayed}
                        />
                        : "Cannot find this user."}
                </div>

                <Pagination loadUserPages={this.loadUserPages} users={this.state.usersFromDatabase} maxPerPage={this.state.maxPerPage} />
            </div >
        )
    }
}
