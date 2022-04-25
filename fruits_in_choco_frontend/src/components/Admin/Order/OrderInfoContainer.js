import React from "react";
import {connect} from "react-redux";
import {loadOrderById, updateOrder} from "../../../redux/thunks/order_thunks";
import {OrderInfo} from "./OrderInfo";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

class OrderInfoContainer extends React.Component {
    componentDidMount() {
        this.props.loadOrderById(this.props.history.location.pathname.split('/').pop());
    }

    render() {
        return <OrderInfo {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    order: state.orderReducer.orderInfo
})

export default compose(
    connect(mapStateToProps, {loadOrderById, updateOrder}),
    withRouter
)(OrderInfoContainer)
