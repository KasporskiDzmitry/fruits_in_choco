import React from "react";
import {connect} from "react-redux";
import Orders from "./Orders";
import {loadAllOrders} from "../../../redux/thunks/order_thunks";

class OrdersContainer extends React.Component {
    render() {
        return <Orders {...this.props} />
    }
}

// useSelector
const mapStateToProps = (state) => ({
    orders: state.orderReducer.orders || []
})

export default connect(mapStateToProps, {loadAllOrders})(OrdersContainer);
