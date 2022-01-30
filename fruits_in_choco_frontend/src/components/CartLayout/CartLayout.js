import React from 'react';
import style from './CartLayout.module.scss'
import {removeProductFromCart} from "../utils/localStorageFunctions";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const CartLayout = (props) => {

    return <div className={props.isCartShow ? `${style.container} ${style.active}` : style.container}>
        <div className={style.bg} onClick={props.toggleIsCartShow}></div>
        <div className={style.cartLayoutContainer}>
            <div className={style.closeWrapper}>
                <div className={style.close} onClick={props.toggleIsCartShow}>x</div>
            </div>
            <div className={style.itemsList}>
                {
                    props.products.map(i => <CartItem key={i.id + "cart"} {...i} {...props}/>)
                }
            </div>
            <div>
                <NavLink to={"/cart"} onClick={props.toggleIsCartShow}>
                    <Button>Оформить заказ</Button>
                </NavLink>
            </div>
        </div>
    </div>
}

const CartItem = ({id, name, description, price, removeFromCart, styles, quantity}) => {
    const removeItem = () => {
        removeProductFromCart(id);
        removeFromCart(id);
    }

    return <div className={style.item}>
        <div className={style.imageWrapper}>
            <img
                src="https://i2.wp.com/completelydelicious.com/wp-content/uploads/2020/05/chocolate-oreo-parfait-8-500x500.jpg"
                alt=""/>
        </div>
        <div>
            <div className={style.info}>
                <h3>{name}</h3>
                <h4>https://i2.wp.com/completelydelicious.com/wp-content/uploads/2020/05/chocolate-oreo-parfait-8-500x500.jpghttps://i2.wp.com/completelydelicious.com/wp-content/uploads/2020/05/chocolate-oreo-parfait-8-500x500.jpg</h4>
            </div>
            <div className={style.totalPriceWrapper}>
                <div className={style.totalPrice}>{price}</div>
                <div className={style.controls}>
                    <div className={style.controlBtn}>-</div>
                    <div className={style.count}>{quantity}</div>
                    <div className={style.controlBtn}>+</div>
                </div>
            </div>
        </div>
        <div onClick={removeItem} className={style.remove}>
            <FontAwesomeIcon icon={faTrash}/>
        </div>
    </div>
}

export default CartLayout;