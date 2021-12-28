import React from "react";
import {CartItem} from "../CartLayout/CartLayout";
import style from './Cart.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

const Cart = (props) => {
    return <div className={style.container}>
        <div className={style.itemsWrapper}>
            {
                props.cart.length > 0 ?
                    props.cart.map(i => <div className={style.item}>
                        <div className={style.imageWrapper}>
                            <img
                                src="https://i2.wp.com/completelydelicious.com/wp-content/uploads/2020/05/chocolate-oreo-parfait-8-500x500.jpg"
                                alt=""/>
                        </div>
                        <div className={style.infoWrapper}>
                            <div className={style.info}>
                                <h3>{i.name}</h3>
                                <h4>https://i2.wp.com/completelydelicious.com/wp-content/uploads/2020/05/chocolate-oreo-parfait-8-500x500.jpghttps://i2.wp.com/completelydelicious.com/wp-content/uploads/2020/05/chocolate-oreo-parfait-8-500x500.jpg</h4>
                            </div>
                            <div className={style.totalPriceWrapper}>
                                <div className={style.totalPrice}>{i.price}</div>
                                <div className={style.controls}>
                                    <div className={style.controlBtn}>-</div>
                                    <div className={style.count}>3</div>
                                    <div className={style.controlBtn}>+</div>
                                </div>
                            </div>
                        </div>
                        <div onClick={props.removeItem} className={style.remove}>
                            <FontAwesomeIcon icon={faTrash}/>
                        </div>
                    </div>) :
                    <div>Ваша корзина пуста</div>
            }
        </div>
        <div className={style.controls}>
            Оформить заказ
        </div>
    </div>
}

export default Cart;