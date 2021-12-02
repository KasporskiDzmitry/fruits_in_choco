import React from "react";
import {connect} from "react-redux";
import AdminProduct from "./AdminProduct";
import {loadProducts} from "../../../redux/thunks/shop_thunks";
import {setCurrentPage, setData} from "../../../redux/actions/table_actions";

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
    data: state.tableReducer.data
})

export default connect(mapStateToProps, {loadProducts, setData, setCurrentPage})(AdminProductContainer);
