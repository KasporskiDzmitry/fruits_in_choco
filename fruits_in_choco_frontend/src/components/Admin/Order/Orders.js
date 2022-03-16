import React, {useEffect} from "react";
import OrderTable from "./OrderTable";

const Orders = (props) => {
    return <div>
        <OrderTable data={props.orders}/>
    </div>
}

export default Orders;