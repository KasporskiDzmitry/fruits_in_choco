import React from "react";
import {Order} from "./Order";
import {compose} from "redux";
import {connect} from "react-redux";
import {makeOrder} from "../../redux/thunks/order_thunks";

class OrderContainer extends React.Component {
    render() {
        return <Order {...this.props} />
    }
}

const mapStateToProps = state => ({
    cart: state.shopReducer.cart
})

export default compose(
    connect(mapStateToProps, {makeOrder})
)(OrderContainer);