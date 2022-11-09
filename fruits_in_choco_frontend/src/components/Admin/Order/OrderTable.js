import React from 'react';
import MaterialTable from "material-table";
import {NavLink} from "react-router-dom";

const columns = [
    { title: 'id', field: 'id'},
    { title: 'name', field: 'name'},
    { title: 'price', field: 'price'},
    { title: 'date', field: 'date'},
    { title: 'status', field: 'status'},
    { title: 'actions', render: row => <OrderTableActions row={row} />}
];

const OrderTableActions = (props) => {
    const row = props.row;
    return (
        <div>
            <NavLink to={`/profile/admin/orders/${row.id}`}>Info</NavLink>
        </div>
    );
}

const OrderTable = (props) => {
        return (
            <MaterialTable columns={columns} data={props.data} title="Orders" options={{search: true}}/>
        );
}

export default OrderTable