import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function WorkoutNutritionTable(props) {
    let tableRows = [];
    
    const fetchData = (item) => {
        props.callback(item.text);
    }

    for (let i = 0; i < props.items.length; i++) {
        let item = props.items[i];
        tableRows.push(<tr key={item.created} onClick={() => fetchData(item)}>
            <td> {item.createdString} </td>
            <td>{item.text}</td>
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

export default WorkoutNutritionTable;