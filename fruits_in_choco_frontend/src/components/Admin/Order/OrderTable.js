import React, {Component} from 'react';
import PropTypes from 'prop-types';
import sematable, {Table} from 'sematable';
import OrderTableActions from "./OrderTableActions";

const columns = [
    { key: 'id', header: 'ID', sortable: true, searchable: true, primaryKey: true },
    { key: 'name', header: 'Название', sortable: true, searchable: true },
    { key: 'price', header: 'Цена', sortable: true, searchable: true },
    { key: 'date', header: 'Дата', sortable: true, searchable: true },
    { key: 'status', header: 'Статус', sortable: true, searchable: true },
    { key: 'actions', header: 'Actions', Component: OrderTableActions }
];

const propTypes = {
    headers: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    primaryKey: PropTypes.string.isRequired,
};

const OrderTable = (props) => {
        return (
            <Table
                {...props}
                selectable
                columns={columns}
            />
        );
}

OrderTable.propTypes = propTypes;
export default sematable('orderTable', OrderTable, columns);