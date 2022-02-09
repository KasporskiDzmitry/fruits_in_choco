import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {deleteCategoryById} from "../../../../redux/thunks/admin_thunks";

const propTypes = {
    row: PropTypes.object.isRequired,
};

class CategoryTableActions extends Component {
    handleDelete(e, id) {
        if (window.confirm('Удлаить?')) {
            this.props.deleteCategoryById(id);
        }
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

export default connect(() => ({}), {deleteCategoryById})(CategoryTableActions);
