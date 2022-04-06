import React, {Component} from 'react';
import PropTypes from 'prop-types';
import sematable, {Table} from 'sematable';
import {getActionsByTableName} from "./ConstructorTableActions";
import {createCell} from "./TableCell";

const columns = [
    { key: 'id', header: 'ID', sortable: true, searchable: true, primaryKey: true },
    { key: 'name', header: 'Название', sortable: true, searchable: true, Component:  createCell("name") },
    { key: 'price', header: 'Цена', sortable: true, searchable: true, Component:  createCell("price")},
    { key: 'actions', header: 'Actions', Component: getActionsByTableName("biscuits") }
];

const propTypes = {
    headers: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    primaryKey: PropTypes.string.isRequired,
};

class BiscuitsTable extends Component {
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

BiscuitsTable.propTypes = propTypes;
export default sematable('biscuitsTable', BiscuitsTable, columns);