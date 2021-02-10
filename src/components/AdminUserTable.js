import React from 'react';
import { Table } from 'react-bootstrap';

function UserTable(props) {
    let tableRows = [];

    for (let i = 0; i < props.users.length; i++) {
        let user = props.users[i];
        tableRows.push(<tr key={user.email}>
            <td><a href={`user-profiles/${user.email}`}> {user.lastName}, {user.firstName}</a> </td>
            <td><a href={`user-profiles/${user.email}`}>{user.email}</a></td>
            <td>{user.phone}</td>
        </tr>);
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

export default UserTable;