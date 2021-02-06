import React from "react";

function UserTable(props) {
    let tableRows = [];

    for (let i = 0; i < props.users.length; i++) {
        let user = props.users[i];
        tableRows.push(<tr key={user[0]}>
            <td>{user[1]}</td>
            <td>{user[0]}</td>
            <td>{user[2]}</td>
        </tr>);
    }

    return (
        <table className="table table-dark">
            <thead className="thead-light">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    )
}

export default UserTable;