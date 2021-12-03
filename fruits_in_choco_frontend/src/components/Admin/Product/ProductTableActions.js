import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {NavLink} from "react-router-dom";

const propTypes = {
    row: PropTypes.object.isRequired,
};

class ProductTableActions extends Component {
    handleDelete(e, id) {
        e.preventDefault();
        console.log(id)
    }

    render() {
        const row = this.props.row;
        return (
            <div>
                <NavLink to={`/profile/admin/product/${row.id}`}>Edit</NavLink>
                <div onClick={(e) => this.handleDelete(e, row.id)}>
                    Delete
                </div>
            </div>
        );
    }
}

ProductTableActions.propTypes = propTypes;
export default ProductTableActions;