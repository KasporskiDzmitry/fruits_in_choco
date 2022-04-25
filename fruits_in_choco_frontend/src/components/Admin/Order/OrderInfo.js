import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import {useDispatch} from "react-redux";

export const OrderInfo = ({order, updateOrder}) => {
    const dispatch = useDispatch();

    const acceptOrder = () => {
        order.status = 'CONFIRMED';
        updateOrder(order);
    }

    const declineOrder = () => {
        order.status = 'DECLINED';
        updateOrder(order);
    }

    return !order.id ?
        <Preloader /> :
        <div>
            {
                order.status === 'NOT_CONFIRMED' &&
                    <div>
                        <div onClick={acceptOrder}>Принять</div>
                        <div onClick={declineOrder}>Отклонить</div>
                    </div>
            }
            <div>{order.id}</div>
            <div>{order.price}</div>
            <div>{order.date}</div>
        </div>
}