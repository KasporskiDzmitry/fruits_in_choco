import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import {ORDER_STATUS_CONFIRMED, ORDER_STATUS_DECLINED, ORDER_STATUS_NOT_CONFIRMED} from "../../utils/constants";

export const OrderInfo = ({order, updateOrder}) => {
    const changeOrderStatus = (isConfirmed) => {
        order.status = isConfirmed ? ORDER_STATUS_CONFIRMED : ORDER_STATUS_DECLINED;
        updateOrder(order);
    }

    return !order.id ?
        <Preloader /> :
        <div>
            {
                order.status === ORDER_STATUS_NOT_CONFIRMED &&
                    <div>
                        <div onClick={() => changeOrderStatus(true)}>Принять</div>
                        <div onClick={() => changeOrderStatus(false)}>Отклонить</div>
                    </div>
            }
            <div>{order.id}</div>
            <div>{order.price}</div>
            <div>{order.date}</div>
        </div>
}