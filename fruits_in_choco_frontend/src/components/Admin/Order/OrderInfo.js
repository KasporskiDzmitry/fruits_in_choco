import React, {useEffect} from "react";
import Preloader from "../../common/Preloader/Preloader";
import {ORDER_STATUS_CONFIRMED, ORDER_STATUS_DECLINED, ORDER_STATUS_NOT_CONFIRMED} from "../../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {loadOrderById, updateOrderThunk} from "../../../redux/thunks/order_thunks";

const OrderInfo = (props) => {
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    const order = useSelector(state => state.orderReducer.order);

    useEffect(() => {
        dispatch(loadOrderById(pathname.split('/').pop()));
    }, [])


    const changeOrderStatus = (isConfirmed) => {
        order.status = isConfirmed ? ORDER_STATUS_CONFIRMED : ORDER_STATUS_DECLINED;
        dispatch(updateOrderThunk(order));
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

export default OrderInfo;