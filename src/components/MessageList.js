import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { searchMessageDatabase } from '../firebase.js';
import MessageTable from './MessageTable.js';
import Pagination from './Pagination.js';

export default class ClientList extends Component {
    constructor() {
        super();
        this.state = {
            messagesFromDatabase: [],
            messagesDisplayed: [],
            messagesSearched: [],
            loading: false,
            messageSearchValue: "",
            maxPerPage: 5
        }
        this.handleChange = this.handleChange.bind(this);
        this.getInitialData = this.getInitialData.bind(this);
        this.searchMessages = this.searchMessages.bind(this);
        this.loadPages = this.loadPages.bind(this);
    }

    componentDidMount = async () => {
        await this.getInitialData();
    }

    async getInitialData() {
        this.setState({ loading: true });
        const data = await searchMessageDatabase().catch(error => "error");
        this.setState({ messagesFromDatabase: data, loading: false });
        this.loadPages(1);
    }

    async loadPages(pageNumber) {
        this.setState({ loading: true });
        let currentPage = [];

        const initialElement = (pageNumber - 1) * this.state.maxPerPage;
        const finalPageElement = this.state.messagesFromDatabase.length - (this.state.messagesFromDatabase.length % this.state.maxPerPage);
        const remainder = (this.state.messagesFromDatabase.length % this.state.maxPerPage);

        if (initialElement === finalPageElement) {
            for (let i = ((pageNumber - 1) * this.state.maxPerPage); i < initialElement + remainder; i++) {
                currentPage.push(this.state.messagesFromDatabase[i]);
                this.setState({ messagesDisplayed: currentPage, loading: false });
            }
        } else {
            for (let i = ((pageNumber - 1) * this.state.maxPerPage); i < initialElement + this.state.maxPerPage; i++) {
                currentPage.push(this.state.messagesFromDatabase[i]);
                this.setState({ messagesDisplayed: currentPage, loading: false });
            };
            ;
        };
    }

    async handleChange(event) {
        await this.setState({ messageSearchValue: event.target.value });

        this.searchMessages(event);

        // Reset table once input values cleared from search bar
        if (this.state.messageSearchValue === "") {
            this.setState({ messagesDisplayed: [] });
            this.loadPages(1);
        }
    };

    searchMessages = async (event) => {
        event.preventDefault();
        this.setState({ messagesDisplayed: [], loading: true });
        let messagesSearched = [];
        let maxSearchResults = this.state.maxPerPage;

        // Searches for email, then last name, then first name
        for (let i = 0; i < this.state.messagesFromDatabase.length && i < maxSearchResults; i++) {

            if (this.state.messagesFromDatabase[i].email.toLowerCase().includes(this.state.messageSearchValue.toLowerCase())) {
                this.setState({ messagesDisplayed: [this.state.messagesFromDatabase[i]], loading: false });
                return;

            } else if (this.state.messagesFromDatabase[i].lastName.toLowerCase().includes(this.state.messageSearchValue.toLowerCase())) {
                messagesSearched.push(this.state.messagesFromDatabase[i]);

            } if (this.state.messagesFromDatabase[i].firstName.toLowerCase().includes(this.state.messageSearchValue.toLowerCase())) {
                messagesSearched.push(this.state.messagesFromDatabase[i]);
            }

            this.setState({ messagesDisplayed: messagesSearched });
        }
        this.setState({ loading: false });
    }

    render() {
        return (
            <div>
                <Form inline>
                    <Form.Control type="text" className="w-25" defaultValue={this.state.messageSearchValue}
                        onChange={this.handleChange} placeholder="Enter user's name or email" />
                    <Button type="submit" onClick={this.searchMessages} className="mb-2">
                        <strong>Find User</strong>
                    </Button>
                </Form>
                <div id="message-table">
                    {(this.state.loading) ? "... loading ..." : this.state.messagesDisplayed.length > 0 ?
                        <MessageTable
                            key={this.state.messagesDisplayed}
                            messages={this.state.messagesDisplayed}
                        />
                        : "Cannot find this user."}
                </div>

                <Pagination loadPages={this.loadPages} items={this.state.messagesFromDatabase} 
                    maxPerPage={this.state.maxPerPage} />
            </div >
        )
    }
}
