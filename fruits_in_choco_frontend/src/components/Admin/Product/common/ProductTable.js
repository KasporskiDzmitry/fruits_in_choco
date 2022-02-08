import React, { Component} from 'react';
import PropTypes from 'prop-types';
import sematable, {makeSelectors, Table} from 'sematable';
import ProductTableActions from "./ProductTableActions";
import Reviews from "./Reviews";

const columns = [
    { key: 'id', header: 'ID', sortable: true, searchable: true, primaryKey: true },
    { key: 'name', header: 'Название', sortable: true, searchable: true },
    { key: 'price', header: 'Цена', sortable: true },
    { key: 'type', header: 'Тип', sortable: true },
    { key: 'category', header: 'Категория', sortable: true },
    { key: 'reviews', header: 'Отзывы', Component: Reviews },
    { key: 'actions', header: 'Actions', Component: ProductTableActions }
];

const propTypes = {
    headers: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    primaryKey: PropTypes.string.isRequired,
};

class ProductTable extends Component {
    render() {
        return (
            <Table
                {...this.props}
                selectable
                columns={columns}
            />
        );
    }
}

ProductTable.propTypes = propTypes;
export default sematable('productTable', ProductTable, columns);