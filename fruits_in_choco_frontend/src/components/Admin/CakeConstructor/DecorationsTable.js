import React, {Component} from 'react';
import PropTypes from 'prop-types';
import sematable, {Table} from 'sematable';
import {getActionsByTableName} from "./ConstructorTableActions";

const columns = [
    { key: 'id', header: 'ID', sortable: true, searchable: true, primaryKey: true },
    { key: 'name', header: 'Название', sortable: true, searchable: true },
    { key: 'price', header: 'Цена', sortable: true, searchable: true },
    { key: 'actions', header: 'Actions', Component: getActionsByTableName("decorations") }
];

const propTypes = {
    headers: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    primaryKey: PropTypes.string.isRequired,
};

class DecorationsTable extends Component {
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

DecorationsTable.propTypes = propTypes;
export default sematable('decorationsTable', DecorationsTable, columns);