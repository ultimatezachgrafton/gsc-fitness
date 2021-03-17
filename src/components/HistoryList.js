import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import WorkoutNutritionTable from './WorkoutNutritionTable.js';
import Pagination from './Pagination.js';

export default class HistoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsFromDatabase: this.props.items,
            itemsDisplayed: [],
            itemsSearched: [],
            currentItem: null,
            loading: false,
            itemSearchValue: "",
            textFieldValue: "",
            maxPerPage: 10
        };
        this.handleChange = this.handleChange.bind(this);
        this.searchItems = this.searchItems.bind(this);
        this.loadPages = this.loadPages.bind(this);
    };

    componentDidMount = async () => {
        this.setState({ loading: true });
        this.setState({ currentItem: this.state.itemsFromDatabase[0].text, loading: false }, this.checkItems);
    };

    checkItems = () => {
        if (this.state.currentItem.length > 0) {
            this.loadPages(1);
        }
    };
    
    async loadPages(pageNumber) {
        this.setState({ loading: true });
        let currentPage = [];
        
        const initialElement = (pageNumber - 1) * this.state.maxPerPage;
        const finalPageElement = this.state.itemsFromDatabase.length - (this.state.itemsFromDatabase.length % this.state.maxPerPage);
        const remainder = (this.state.itemsFromDatabase.length % this.state.maxPerPage);
        
        // If there is only one page worth of items
        if (initialElement === finalPageElement) {
            for (let i = ((pageNumber - 1) * this.state.maxPerPage); i < initialElement + remainder; i++) {
                currentPage.push(this.state.itemsFromDatabase[i]);
                this.setState({ itemsDisplayed: currentPage, loading: false });
            }
        } else { // If there are multiple pages worth of items
            for (let i = ((pageNumber - 1) * this.state.maxPerPage); i < initialElement + this.state.maxPerPage; i++) {
                currentPage.push(this.state.itemsFromDatabase[i]);
                this.setState({ itemsDisplayed: currentPage, loading: false });
                console.log(currentPage)
            };
        };
    };
    
    async handleChange(event) {
        await this.setState({ itemSearchValue: event.target.value });

        this.searchItems(event);

        // Reset table once input values cleared from search bar
        if (this.state.itemSearchValue === "") {
            this.setState({ itemsDisplayed: [] });
            this.loadPages(1);
        }
    };

    searchItems = async (event) => {
        
        event.preventDefault();
        this.setState({ itemsDisplayed: [], loading: true });
        let itemsSearched = [];
        let maxSearchResults = 20;

        // Searches for email, then last name, then first name
        for (let i = 0; i < this.state.itemsFromDatabase.length && i < maxSearchResults; i++) {

            if (this.state.itemsFromDatabase[i].email.toLowerCase().includes(this.state.itemSearchValue.toLowerCase())) {
                this.setState({ itemsDisplayed: [this.state.itemsFromDatabase[i]], loading: false });
                return;

            } else if (this.state.itemsFromDatabase[i].lastName.toLowerCase().includes(this.state.itemSearchValue.toLowerCase())) {
                itemsSearched.push(this.state.itemsFromDatabase[i]);

            } if (this.state.itemsFromDatabase[i].firstName.toLowerCase().includes(this.state.itemSearchValue.toLowerCase())) {
                itemsSearched.push(this.state.itemsFromDatabase[i]);
            }

            this.setState({ itemsDisplayed: itemsSearched });
            this.setState({ loading: false });
            console.log(this.state.itemsDisplayed)
        }
    };

    handleCallback = (callbackData) => {
        this.props.callback(callbackData);
    };

    render() {
        return (
            <div>

                <div id="item-table">
                    {(this.state.loading) ? "... loading ..." : this.state.itemsFromDatabase.length > 0 ?
                        <WorkoutNutritionTable
                            key={this.state.itemsFromDatabase}
                            items={this.state.itemsDisplayed}
                            callback={this.handleCallback}
                        />
                        : "Cannot find this workout."}
                </div>
                <Pagination loadPages={this.loadPages} items={this.state.itemsFromDatabase}
                    maxPerPage={this.state.maxPerPage} />
            </div >
        )
    }
}