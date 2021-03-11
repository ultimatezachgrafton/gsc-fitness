import React, { Component } from 'react'

export class Pagination extends Component {
    render() {
        const buttons = [];
        let paginate = null;
        let numberOfPages = Math.ceil(this.props.items.length / this.props.maxPerPage);
        
        for (let i = 1; i <= numberOfPages; i++) {
            buttons.push(i);
        }
        if (buttons.length > 1) {
            paginate = buttons.map(btn => (
                <button
                    key={btn}
                    className="btn btn-outline-dark ml-2"
                    onClick={() => this.props.loadPages(btn)}
                >
                    {btn}
                </button>
            ));
        }

        return <div>{paginate}</div>;
    }
}

export default Pagination