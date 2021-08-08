import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Shop from "./Shop.js";
import {withRouter} from "react-router-dom";
import {
    loadProducts,
    loadProductsByTypes,
    setProducts
} from "../../redux/shop-reducer";

class ShopContainer extends React.Component {
    render() {
        return (
            <Shop {...this.props}/>
        );
    }
}

const mapStateToProps = state => ({
    pathnames: state.appReducer.pathnames,
    products: state.shopReducer.products,
    categories: state.mainPage.categories
});

export default compose(
    connect(mapStateToProps, {loadProducts, loadProductsByTypes, setProducts}),
    withRouter
)(ShopContainer)
