import React from "react";
import {connect} from "react-redux";
import Products from "./Products";
import {makeSelectors} from "sematable";
import {loadProductsAdmin} from "../../../redux/thunks/admin_thunks";

class ProductsContainer extends React.Component {

    componentDidMount() {
        // this.props.loadProductsAdmin();
    }

    render() {
        return <Products {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    products: state.shopReducer.products,
    categories: state.categoryReducer.categories
})

export default connect(mapStateToProps, {loadProductsAdmin})(ProductsContainer);
