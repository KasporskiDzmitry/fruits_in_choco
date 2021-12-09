import React from 'react';
import style from './CartLayout.module.scss'
import {removeProductFromCart} from "../utils/localStorageFunctions";

const CartLayout = (props) => {
    const layoutClassName = props.isCartShow ? `${style.cartLayoutContainer} ${style.show}` : style.cartLayoutContainer;

    return <div className={layoutClassName}>
        <div className={style.closeWrapper}>
            <div className={style.close} onClick={props.toggleIsCartShow}>x</div>
        </div>
        <div className={style.itemsList}>
            {
                props.products.map(i => <CartItem key={i.id + "cart"} {...i} {...props}/>)
            }
        </div>
    </div>
}

const CartItem = ({id, name, description, price, removeFromCart}) => {

    const removeItem = () => {
        removeFromCart(id);
        removeProductFromCart(id);
    }

    return <div className={style.item}>
        <div className={style.imageWrapper}>
            <img src="" alt=""/>
        </div>
        <div className={style.info}>
            <h3>{name}</h3>
        </div>
        <div className={style.controls}>
            <div className={style.controlBtn}>-</div>
            <div className={style.count}>3</div>
            <div className={style.controlBtn}>+</div>
        </div>
        <div onClick={removeItem}>
            delete
        </div>
        <div className={style.totalPrice}>100</div>
    </div>
}

export default CartLayout;