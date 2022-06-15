import React, { Component} from 'react';
import PropTypes from 'prop-types';
import sematable, { Table } from 'sematable';
import UsersTableActions from "./UsersTableActions";

const columns = [
    { key: 'id', header: 'ID', sortable: true, searchable: true, primaryKey: true },
    { key: 'firstName', header: 'Имя', sortable: true, searchable: true },
    { key: 'lastName', header: 'Фамилия', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'role', header: 'Роль', sortable: true },
    { key: 'status', header: 'Статус', sortable: true },
    { key: 'actions', header: 'Actions', Component: UsersTableActions }
];

const propTypes = {
    headers: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    primaryKey: PropTypes.string.isRequired,
};

class UsersTable extends Component {
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

UsersTable.propTypes = propTypes;
export default sematable('userTable', UsersTable, columns);