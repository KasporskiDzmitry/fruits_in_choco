import React from "react";
import {connect} from "react-redux";
import AdminProduct from "./AdminProduct";

class AdminProductContainer extends React.Component {
    render() {
        return <AdminProduct {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    products: state.shopReducer.products
})

export default connect(mapStateToProps, {})(AdminProductContainer);
