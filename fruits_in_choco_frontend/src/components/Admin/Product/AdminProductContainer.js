import React from "react";
import {connect} from "react-redux";
import AdminProduct from "./AdminProduct";
import {loadProducts} from "../../../redux/thunks/shop_thunks";

class AdminProductContainer extends React.Component {

    componentDidMount() {
        this.props.loadProducts();
    }

    render() {
        return <AdminProduct {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    products: state.shopReducer.products,
    categories: state.mainPage.categories,
})

export default connect(mapStateToProps, {loadProducts})(AdminProductContainer);
