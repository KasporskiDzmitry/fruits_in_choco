import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {NavLink} from "react-router-dom";

const propTypes = {
    row: PropTypes.object.isRequired,
};

class UsersTableActions extends Component {
    render() {
        const row = this.props.row;
        return (
            <div>
                <NavLink to={`/profile/admin/users/${row.id}`}>More</NavLink>
            </div>
        );
    }
}

UsersTableActions.propTypes = propTypes;

export default UsersTableActions