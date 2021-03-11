import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { searchNutritionDatabase } from '../firebase.js';
import NutritionTable from './NutritionTable.js';
import Pagination from './Pagination.js';

export default class NutritionHistoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nutritionFromDatabase: this.props.nutrition,
            nutritionDisplayed: [],
            nutritionSearched: [],
            currentNutritionPlan: null,
            loading: false,
            nutritionSearchValue: ""
        }
    }

    componentDidMount = async () => {
        this.setState({ loading: true });
        this.setState({ currenNutritionPlan: this.state.nutritionFromDatabase[0].text, loading: false })
        console.log(this.state.nutritionFromDatabase);
    }

    render() {
        return (
            <div>

                <div id="nutrition-table">
                    {(this.state.loading) ? "... loading ..." : this.state.nutritionFromDatabase.length > 0 ?
                        <NutritionTable
                            key={this.state.nutritionFromDatabase}
                            nutrition={this.state.nutritionFromDatabase}
                        />
                        : "Cannot find this plan."}
                </div>
            </div >
        )
    }
}