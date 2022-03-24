import React from "react";
import Preloader from "../../common/Preloader/Preloader";

export const OrderInfo = (props) => {
    return !props.order.id ?
        <Preloader /> :
        <div>
            <div>{props.order.id}</div>
            <div>{props.order.price}</div>
            <div>{props.order.date}</div>
        </div>
}