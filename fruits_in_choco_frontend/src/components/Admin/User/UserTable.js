import React, { Component} from 'react';
import PropTypes from 'prop-types';
import sematable, { Table } from 'sematable';

const columns = [
    { key: 'id', header: 'ID', sortable: true, searchable: true, primaryKey: true },
    { key: 'firstName', header: 'Имя', sortable: true, searchable: true },
    { key: 'lastName', header: 'Фамилия', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'role', header: 'Роль', sortable: true },
    { key: 'status', header: 'Статус', sortable: true },
];

const propTypes = {
    headers: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    primaryKey: PropTypes.string.isRequired,
};

class UserTable extends Component {
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

UserTable.propTypes = propTypes;
export default sematable('userTable', UserTable, columns);