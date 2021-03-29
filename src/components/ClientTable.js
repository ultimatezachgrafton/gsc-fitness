import React from 'react';
import { Table } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import '../css/Table.css';

function ClientTable(props) {
    let tableRows = [];
    const history = useHistory();

    const fetchData = (user) => {
        console.log("click");
        const url = "/client/profile/" + user.uuid;
        history.push({
            pathname: url,
            state: { email: user.email }
          })
    }

    for (let i = 0; i < props.users.length; i++) {
        let user = props.users[i];
        tableRows.push(<tr key={user.email} onClick={() => fetchData(user)}>
            <td>
                {user.lastName}, {user.firstName}
            </td>
            <td>
                {user.email}
            </td>
            <td>
                {user.phone}
            </td>
        </tr >);
    }

    return (
        <Table striped bordered hover variant="dark" className="th-sm">
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