import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function MessageTable(props) {
    let tableRows = [];

    for (let i = 0; i < props.messages.length; i++) {
        const message = props.message[i].text;
        const user = props.messages[i].user;
        tableRows.push(<tr key={user.email}>
            <td><Link to={{
                pathname: `/client/profile`,
                state: { email: user.email }
            }} >
                {user.lastName}, {user.firstName}
            </Link> </td>
            < td > <a href={`/client/profile`}>{message}</a></td >
        </tr >);
    }

    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Sender</th>
                    <th>Message</th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </Table>
    )
}

export default MessageTable;