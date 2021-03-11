import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NutritionTable(props) {
    let tableRows = [];

    for (let i = 0; i < props.nutrition.length; i++) {
        let nutrition = props.nutrition[i];
            console.log(nutrition);
        tableRows.push(<tr key={nutrition.created}>
            <td><Link to={{
                pathname: `/client/${nutrition.created}`,
                state: { text: nutrition.text }
            }} >
                {nutrition.createdString}
            </Link> </td>
            <td>{nutrition.text}</td>
        </tr >);
    }

    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Created</th>
                    <th>Text</th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </Table>
    )
}

export default NutritionTable;