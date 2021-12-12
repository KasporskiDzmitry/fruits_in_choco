import React from 'react';
import style from './CartLayout.module.scss'
import {removeProductFromCart} from "../utils/localStorageFunctions";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
        removeProductFromCart(id);
        removeFromCart(id);
    }

    return <div className={style.item}>
        <div className={style.imageWrapper}>
            <img src="https://i2.wp.com/completelydelicious.com/wp-content/uploads/2020/05/chocolate-oreo-parfait-8-500x500.jpg" alt=""/>
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
                    <div className={style.count}>3</div>
                    <div className={style.controlBtn}>+</div>
                </div>
            </div>
        </div>
        <div onClick={removeItem} className={style.remove}>
            <FontAwesomeIcon icon={faTrash} />
        </div>
    </div>
}

export default CartLayout;