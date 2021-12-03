import React from "react";
import AdminProductPage from "./AdminProductPage";
import {connect} from "react-redux";
import {addProduct} from "../../../redux/thunks/admin_thunks";
import {addReview, loadProductById} from "../../../redux/thunks/shop_thunks";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

class AdminProductPageContainer extends React.Component {

    componentDidMount() {
        this.props.loadProductById(this.props.history.location.pathname.split('/').pop());
    }

    render() {
        return <AdminProductPage {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    product: state.adminReducer.product,
    categories: state.mainPage.categories
});

export default compose(
    connect(mapStateToProps, {loadProductById}),
    withRouter
)(AdminProductPageContainer)