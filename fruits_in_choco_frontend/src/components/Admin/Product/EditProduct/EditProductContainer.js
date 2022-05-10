import React from "react";
import EditProduct from "./EditProduct";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {
    approveReview,
    loadProductByIdAdmin,
    deleteReview,
    updateProductThunk
} from "../../../../redux/thunks/admin_thunks";

class EditProductContainer extends React.Component {

    componentDidMount() {
        this.props.loadProductByIdAdmin(this.props.history.location.pathname.split('/').pop());
    }

    render() {
        return <EditProduct {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    product: state.adminReducer.product,
    categories: state.categoryReducer.categories,
    isProductFetching: state.adminReducer.isProductFetching
});

export default compose(
    connect(mapStateToProps, {loadProductByIdAdmin, approveReview, deleteReview, updateProductThunk}),
    withRouter
)(EditProductContainer)