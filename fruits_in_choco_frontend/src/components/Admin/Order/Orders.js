import React from "react";
import OrderTable from "./OrderTable";
import {useSelector} from "react-redux";

const Orders = (props) => {
    const orders = useSelector(state => state.orderReducer.orders);

    return <div>
        <OrderTable data={orders}/>
    </div>
}

export default Orders;