import React from "react";
import EditProduct from "./EditProduct";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {loadProductById} from "../../../../redux/thunks/shop_thunks";
import {approveReview, loadProductByIdAdmin, deleteReview} from "../../../../redux/thunks/admin_thunks";

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
    isFetching: state.adminReducer.isFetching
});

export default compose(
    connect(mapStateToProps, {loadProductByIdAdmin, approveReview, deleteReview}),
    withRouter
)(EditProductContainer)