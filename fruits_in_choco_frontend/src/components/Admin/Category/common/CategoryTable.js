import React, { Component} from 'react';
import PropTypes from 'prop-types';
import sematable, { Table } from 'sematable';
import CategoryTableActions from "./CategoryTableActions";

const columns = [
    { key: 'id', header: 'ID', sortable: true, searchable: true, primaryKey: true },
    { key: 'name', header: 'Название', sortable: true, searchable: true },
    { key: 'actions', header: 'Actions', Component: CategoryTableActions }
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