import React from 'react';
import { Table } from 'react-bootstrap';
import '../css/Table.css'

function WorkoutNutritionTable(props) {
    let tableRows = [];
    
    const fetchData = (item) => {
        props.callback(item.text);
        console.log(item)
    }

    for (let i = 0; i < props.items.length; i++) {
        let item = props.items[i];
        tableRows.push(<tr key={item.created} onClick={() => fetchData(item)}>
            <td onClick={() => fetchData(item)}> {item.createdString} </td>
            <td onClick={() => fetchData(item)}>{item.text}</td>
        </tr >);
    }

    return (
        <Table striped bordered hover variant="dark">
            <tbody>
                {tableRows}
            </tbody>
        </Table>
    )
}

export default WorkoutNutritionTable;