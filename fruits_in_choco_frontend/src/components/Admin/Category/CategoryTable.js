import React, { Component} from 'react';
import PropTypes from 'prop-types';
import sematable, { Table } from 'sematable';

const columns = [
    { key: 'id', header: 'ID', sortable: true, searchable: true, primaryKey: true },
    { key: 'name', header: 'Название', sortable: true, searchable: true },
];

const propTypes = {
    headers: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    primaryKey: PropTypes.string.isRequired,
};

class CategoryTable extends Component {
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

CategoryTable.propTypes = propTypes;
export default sematable('categoryTable', CategoryTable, columns);