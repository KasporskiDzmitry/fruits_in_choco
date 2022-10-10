import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";
import {withSnackbar} from "notistack";
import {deleteProductById} from "../../../../redux/thunks/product_thunks";

const propTypes = {
    row: PropTypes.object.isRequired,
};

class ProductTableActions extends Component {
    handleDelete(e, id) {
        if (window.confirm('Удлаить?') && !this.props.isProductDeleting) {
            this.props.deleteProductById(id);
        }
    }

    render() {
        const row = this.props.row;
        return (
            <div>
                <NavLink to={`/profile/admin/products/${row.id}`}>Edit</NavLink>
                <div onClick={(e) => this.handleDelete(e, row.id)}>
                    Delete
                </div>
            </div>
        );
    }
}

ProductTableActions.propTypes = propTypes;

export default compose(
    connect(() => ({}), {deleteProductById}),
    withSnackbar
)(ProductTableActions)