import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ClientTable(props) {
    let tableRows = [];

    for (let i = 0; i < props.users.length; i++) {
        let user = props.users[i];
        tableRows.push(<tr key={user.email}>
            <td><Link to={{
                pathname: `/client/${user.email}`,
                state: { email: user.email }
            }} >
                {user.lastName}, {user.firstName}
            </Link> </td>
            < td > <a href={`/client/${user.email}`}>{user.email}</a></td >
            <td>{user.phone}</td>
        </tr >);
    }

    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </Table>
    )
}

export default ClientTable;