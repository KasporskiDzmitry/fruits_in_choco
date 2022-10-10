import React from "react";
import style from './Cart.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {Button} from "react-bootstrap";
import {decreaseQuantity, increaseQuantity, removeProductFromCart} from "../utils/localStorageFunctions";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import appStyle from '../../App.module.scss';
import {removeFromCart, updateProductInCart} from "../../redux/actions/cart_actions";


const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cartReducer.cart);

    const totalSum = cart.reduce((a, b) => a + b.price * b.quantity, 0);

    const removeItem = (product) => {
        removeProductFromCart(product.id);
        dispatch(removeFromCart(product.id));
    }

    const incrProduct = (product) => {
        increaseQuantity(product.id);
        dispatch(updateProductInCart({...product, quantity: product.quantity + 1}));
    }

    const decrProduct = (product) => {
        if (product.quantity > 1) {
            decreaseQuantity(product.id);
            dispatch(updateProductInCart({...product, quantity: product.quantity - 1}));
        }
    }

    return <div className={`${appStyle.sectionOuter} ${style.cartSection}`}>
        <div className={`${appStyle.sectionInner}`}>
            <div className={style.heading}>
                <h1>Корзина</h1>
            </div>
            {
                cart.length > 0 ?
                    <div className={style.tableWrapper}>
                        <table>
                            <thead>
                            <tr>
                                <th colSpan={2}>Наименование товара</th>
                                <th>Цена за ед.</th>
                                <th>Количество</th>
                                <th colSpan={2}>Итоговая сумма</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                cart.map(i => <tr key={i.id}>
                                    <td className={style.cellImage}>
                                        <div>
                                            <img
                                                src="https://i2.wp.com/completelydelicious.com/wp-content/uploads/2020/05/chocolate-oreo-parfait-8-500x500.jpg"
                                                alt=""/>
                                        </div>
                                    </td>
                                    <td className={style.cellInfo}>
                                        <div>
                                            <h3>{i.name}</h3>
                                            <h4>https://i2.wp.com/completelydelicious.com/wp-content/uploads/2020/05/chocolate-oreo-parfait-8-500x500.jpghttps://i2.wp.com/completelydelicious.com/wp-content/uploads/2020/05/chocolate-oreo-parfait-8-500x500.jpg</h4>
                                        </div>
                                    </td>
                                    <td className={style.cellPrice}>
                                        <div className={style.price}>{i.price}</div>
                                    </td>
                                    <td className={style.cellControls}>
                                        <div className={style.controls}>
                                            <div className={style.controlBtn} onClick={() => decrProduct(i)}>-</div>
                                            <div className={style.count}>{i.quantity}</div>
                                            <div className={style.controlBtn} onClick={() => incrProduct(i)}>+</div>
                                        </div>
                                    </td>
                                    <td className={style.cellTotalPrice}>
                                        <div className={style.price}>{i.price * i.quantity}</div>
                                    </td>
                                    <td className={style.cellRemove}>
                                        <div onClick={() => removeItem(i)}>
                                            <FontAwesomeIcon icon={faTrash}/>
                                        </div>
                                    </td>
                                </tr>)
                            }
                            </tbody>
                        </table>
                        <div className={style.cartResult}>
                            <div>
                                <span>Итого:</span>
                                <span>{totalSum}</span>
                            </div>
                        </div>
                        <div className={style.submitWrapper}>
                            <NavLink to={'/order'}>
                                <Button>Оформить заказ</Button>
                            </NavLink>
                        </div>
                    </div> :
                    <div>Ваша корзина пуста</div>
            }
        </div>
    </div>
}

export default Cart;