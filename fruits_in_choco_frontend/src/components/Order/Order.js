import React from "react";
import style from './Order.module.scss';
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../utils/validators/validators";
import {Button} from "react-bootstrap";

const OrderForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={'First Name'} type="text" name={'firstname'} component={Input} validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Last Name'} type="text" name={'lastname'} component={Input} validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Email'} type="email" name={'email'} component={Input} validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Phone'} type="tel" name={'phone'} component={Input} validate={[required]}/>
            </div>
            <div>
                <label htmlFor="agree">Agree to sending messages</label>
                <Field id="agree" placeholder={'Agree to sending messages'} name={'isAgreeToSendingMessages'} component={Input} type="checkbox" validate={[required]}/>
            </div>
            {error && <div className={style.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <Button type="submit">Order</Button>
            </div>
        </form>
    )
};

const OrderReduxForm = reduxForm({form: 'order'})(OrderForm);


export const Order = (props) => {
    const onSubmit = formData => {
        let productIds = new Map();

        for (let i = 0; i < props.cart.length; i++) {
            const p = props.cart[i];
            productIds.set(p.id, p.quantity)
        }

        const order = {
            ...formData,
            price: props.cart.reduce((a, b) => a + b.price * b.quantity, 0),
            productIds: Object.fromEntries(productIds)
        }

        console.log(order)

        props.makeOrder(order);
    }

    return <>
        {
            props.cart.length > 0 ?
                <div>
                    <div>
                        <OrderReduxForm onSubmit={onSubmit}/>
                    </div>
                    <div>
                        Товары в заказе:
                    </div>
                    <div>
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
                                props.cart.map(i => <tr key={i.id}>
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
                                        <div className={style.count}>{i.quantity}</div>
                                    </td>
                                    <td className={style.cellTotalPrice}>
                                        <div className={style.price}>{i.price * i.quantity}</div>
                                    </td>
                                </tr>)
                            }
                            </tbody>
                        </table>
                    </div>
                </div> :
                <div>
                    Ваша корзина пуста
                </div>
        }

    </>
};