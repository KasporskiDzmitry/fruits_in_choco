import React from 'react';
import style from './CartLayout.module.scss'
import {removeProductFromCart} from "../utils/localStorageFunctions";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {toggleCartLayout} from "../../redux/actions/app_actions";
import {decrProduct, deleteFromCart, incrProduct} from "../../redux/thunks/cart_thunks";

const CartLayout = (props) => {
    const dispatch = useDispatch();

    const closeCartLayout = () => {
        dispatch(toggleCartLayout());
    }

    return <div className={props.isCartShow ? `${style.container} ${style.active}` : style.container}>
        <div className={style.bg} onClick={closeCartLayout}></div>
        <div className={style.cartLayoutContainer}>
            <div className={style.closeWrapper}>
                <div className={style.close} onClick={closeCartLayout}>x</div>
            </div>
            <div className={style.itemsList}>
                {
                    props.products.map(i => <CartItem key={i.id + "cart"} {...i} {...props}/>)
                }
            </div>
            <div>
                <NavLink to={"/cart"} onClick={closeCartLayout}>
                    <Button>Оформить заказ</Button>
                </NavLink>
            </div>
        </div>
    </div>
}

const CartItem = (item) => {
    const dispatch = useDispatch();
    //
    // const removeItem = () => {
    //     dispatch(deleteFromCart(id));
    // }

    const decrementHandler = () => {
        dispatch(decrProduct(item));
    }

    const incrementHandler = () => {
        dispatch(incrProduct(item));
    }

    const deleteHandler = () => {
        dispatch(deleteFromCart(item.id))
    }

    return <div className={style.item}>
        <div className={style.imageWrapper}>
            <img
                src="https://i2.wp.com/completelydelicious.com/wp-content/uploads/2020/05/chocolate-oreo-parfait-8-500x500.jpg"
                alt=""/>
        </div>
        <div>
            <div className={style.info}>
                <h3>{item.name}</h3>
                <h4>https://i2.wp.com/completelydelicious.com/wp-content/uploads/2020/05/chocolate-oreo-parfait-8-500x500.jpghttps://i2.wp.com/completelydelicious.com/wp-content/uploads/2020/05/chocolate-oreo-parfait-8-500x500.jpg</h4>
            </div>
            <div className={style.totalPriceWrapper}>
                <div className={style.totalPrice}>{item.price}</div>
                <div className={style.controls}>
                    <div className={style.controlBtn} onClick={decrementHandler}>-</div>
                    <div className={style.count}>{item.quantity}</div>
                    <div className={style.controlBtn} onClick={incrementHandler}>+</div>
                </div>
            </div>
        </div>
        <div onClick={deleteHandler} className={style.remove}>
            <FontAwesomeIcon icon={faTrash}/>
        </div>
    </div>
}

export default CartLayout;