import React from "react";
import {connect} from "react-redux";
import ProductPage from "./ProductPage";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {addReview, loadProductById, saveProductToCart} from "../../../redux/thunks/shop_thunks";

class ProductPageContainer extends React.Component {
    componentDidMount() {
        this.props.loadProductById(this.props.history.location.pathname.split('/').pop());
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <ProductPage {...this.props}/>
        );
    }
}

const mapStateToProps = state => ({
    product: state.shopReducer.currentProduct,
    ratings: state.shopReducer.currentProductReviews,
    isFetching: state.shopReducer.isProductFetching,
    isAuth: state.authReducer.isAuth,
    profile: state.profileReducer.profile
});

export default compose(
    connect(mapStateToProps, {loadProductById, addReview, saveProductToCart}),
    withRouter
)(ProductPageContainer)
