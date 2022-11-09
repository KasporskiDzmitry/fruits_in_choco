import React from 'react';
import MaterialTable from "material-table";
import {NavLink} from "react-router-dom";

const columns = [
    { title: 'id', field: 'id'},
    { title: 'firstName', field: 'firstName'},
    { title: 'lastName', field: 'lastName'},
    { title: 'email', field: 'email'},
    { title: 'role', field: 'role'},
    { title: 'status', field: 'status'},
    { title: 'actions', render: row => <UsersTableActions row={row}/> }
];

const UsersTableActions = (props) => {
    const row = props.row;
    return (
        <div>
            <NavLink to={`/profile/admin/users/${row.id}`}>More</NavLink>
        </div>
    );
}

const UsersTable = (props) => {
    return <MaterialTable columns={columns} data={props.data} title="Users" options={{search: true}}/>
}

export default UsersTable