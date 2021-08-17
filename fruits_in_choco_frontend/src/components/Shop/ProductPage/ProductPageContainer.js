import React from "react";
import {connect} from "react-redux";
import ProductPage from "./ProductPage";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {addReview, loadProductById} from "../../../redux/shop-reducer";

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
    reviews: state.shopReducer.currentProductReviews,
    isFetching: state.shopReducer.isFetching,
    isAuth: state.authReducer.isAuth,
    profile: state.profileReducer.profile
});

export default compose(
    connect(mapStateToProps, {loadProductById, addReview}),
    withRouter
)(ProductPageContainer)
