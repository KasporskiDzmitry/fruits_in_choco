import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {NavLink} from "react-router-dom";

const propTypes = {
    row: PropTypes.object.isRequired,
};

class CategoryTableActions extends Component {
    handleDelete(e, id) {
        e.preventDefault();
        console.log(id)
    }

    render() {
        const row = this.props.row;
        return (
            <div>
                <NavLink to={`/profile/admin/categories/${row.id}`}>Edit</NavLink>
                <div onClick={(e) => this.handleDelete(e, row.id)}>
                    Delete
                </div>
            </div>
        );
    }
}

CategoryTableActions.propTypes = propTypes;
export default CategoryTableActions;