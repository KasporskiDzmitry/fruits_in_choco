import React from "react";
import {connect} from "react-redux";
import AdminProduct from "./AdminProduct";
import {makeSelectors} from "sematable";
import {loadProductsAdmin} from "../../../redux/thunks/admin_thunks";

class AdminProductContainer extends React.Component {

    componentDidMount() {
        this.props.loadProductsAdmin();
    }

    render() {
        return <AdminProduct {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    products: state.shopReducer.products,
    categories: state.mainPage.categories
})

export default connect(mapStateToProps, {loadProductsAdmin})(AdminProductContainer);
