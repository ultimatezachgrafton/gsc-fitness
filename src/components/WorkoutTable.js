import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function WorkoutTable(props) {
    let tableRows = [];
    
    const fetchData = (workout) => {
        props.callback(workout.text);
    }

    for (let i = 0; i < props.workouts.length; i++) {
        let workout = props.workouts[i];
        tableRows.push(<tr key={workout.created} onClick={() => fetchData(workout)}>
            <td> {workout.createdString} </td>
            <td>{workout.text}</td>
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

export default WorkoutTable;