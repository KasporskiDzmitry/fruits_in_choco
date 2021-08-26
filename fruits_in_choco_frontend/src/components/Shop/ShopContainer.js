import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Shop from "./Shop.js";
import {withRouter} from "react-router-dom";
import {
    loadProducts,
    loadProductsByTypes, setFilteredTypes,
    setProducts
} from "../../redux/shop-reducer";
import {selectCategory} from "../../redux/main-reducer";

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
    pathnames: state.appReducer.pathnames,
    products: state.shopReducer.products,
    categories: state.mainPage.categories,
    isFetching: state.shopReducer.isFetching,
    selectedCategory: state.mainPage.selectedCategory,
    filteredTypes: state.shopReducer.filteredTypes
});

export default compose(
    connect(mapStateToProps, {loadProducts, loadProductsByTypes, setProducts, selectCategory, setFilteredTypes}),
    withRouter
)(ShopContainer)
