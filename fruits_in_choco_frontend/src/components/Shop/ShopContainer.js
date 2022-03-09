import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Shop from "./Shop.js";
import {withRouter} from "react-router-dom";
import {loadProducts, loadProductsByCategories, saveProductToCart} from "../../redux/thunks/shop_thunks";
import {setFilteredCategories, setFilteredTypes, setProducts} from "../../redux/actions/shop_actions";
import {selectCategory} from "../../redux/actions/category_actions";

class ShopContainer extends React.Component {

    componentDidMount() {
        // if (this.props.filteredTypes.length === 0) {
        //     this.props.loadProducts();
        // } else {
        //     this.props.loadProductsByTypes(this.props.filteredTypes);
        // }
    }

    componentWillUnmount() {
        this.props.selectCategory(0);
    }

    render() {
        return (
            <Shop {...this.props}/>
        );
    }
}

const mapStateToProps = state => ({
    products: state.shopReducer.products,
    categories: state.categoryReducer.categories,
    selectedCategory: state.categoryReducer.selectedCategory,
    filteredCategories: state.shopReducer.filteredCategories,
    cart: state.shopReducer.cart,
    isProductsFetching: state.shopReducer.isProductsFetching
});

export default compose(
    connect(mapStateToProps, {loadProducts, loadProductsByCategories, setProducts, selectCategory, setFilteredCategories, saveProductToCart}),
    withRouter
)(ShopContainer)
