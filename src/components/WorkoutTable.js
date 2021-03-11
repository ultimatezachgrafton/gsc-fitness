import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function WorkoutTable(props) {
    let tableRows = [];
    
    const handleClick = (event) => {
        event.preventDefault();
        props.callback("callback");
        console.log("callback")
    }

    for (let i = 0; i < props.workouts.length; i++) {
        let workout = props.workouts[i];
            console.log(workout)
        tableRows.push(<tr key={workout.created}>
            <td><Link to={{
                pathname: `/client/${workout.created}`,
                state: { text: workout.text }
            }} >
                {workout.createdString}
            </Link> </td>
            <td onClick={handleClick}>{workout.text}</td>
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