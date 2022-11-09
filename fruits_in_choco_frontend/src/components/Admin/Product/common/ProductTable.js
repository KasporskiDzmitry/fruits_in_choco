import React from 'react';
import ProductTableActions from "./ProductTableActions";
import Reviews from "./Reviews";
import MaterialTable from "material-table";

const columns = [
    { title: 'id', field: 'id'},
    { title: 'name', field: 'name'},
    { title: 'price', field: 'price'},
    { title: 'category', field: 'category'},
    { title: 'reviews', render: row => <Reviews row={row} /> },
    { title: 'status', field: 'status'},
    { title: 'actions', render: row => <ProductTableActions row={row}/> }
];

const ProductTable = (props) => {
    return (
        <MaterialTable columns={columns} data={props.data} title="Products" options={{search: true}}/>
    );
}

export default ProductTable