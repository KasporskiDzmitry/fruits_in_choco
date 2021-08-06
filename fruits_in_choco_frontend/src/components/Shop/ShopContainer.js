import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Shop from "./Shop.js";
import {withRouter} from "react-router-dom";
import {
    loadProducts,
    loadProductsByTypes,
    setFilteredTypes,
    setIsAscSort,
    setProducts,
    setSortBy
} from "../../redux/shop-reducer";

class ShopContainer extends React.Component {
    componentDidMount() {
        if (this.props.filteredTypes) {
            this.props.loadProductsByTypes(this.props.filteredTypes)
        } else {
            this.props.loadProducts();
        }

    }

    componentWillUnmount() {
        this.props.setFilteredTypes(this.props.categories[0].types.map(i => i.id));
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
    filteredTypes: state.shopReducer.filteredTypes,
    sortBy: state.shopReducer.sortBy,
    isAscSort: state.shopReducer.isAscSort
});

export default compose(
    connect(mapStateToProps, {setFilteredTypes, loadProducts, loadProductsByTypes, setProducts, setSortBy, setIsAscSort}),
    withRouter
)(ShopContainer)
