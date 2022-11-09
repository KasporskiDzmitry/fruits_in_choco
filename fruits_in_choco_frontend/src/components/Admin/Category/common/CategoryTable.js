import React from 'react';
import CategoryTableActions from "./CategoryTableActions";
import MaterialTable from "material-table";

const columns = [
    { title: 'id', field: 'id'},
    { title: 'name', field: 'name'},
    { title: 'actions', render: row =>  <CategoryTableActions row={row}/> }
];

const CategoryTable = (props) => {
    return (
        <MaterialTable columns={columns} data={props.data} title="Categories" options={{search: true}}/>
    );
}

export default CategoryTable;