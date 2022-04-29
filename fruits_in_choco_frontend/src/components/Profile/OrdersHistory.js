import React from 'react';

export const OrdersHistory = ({orders}) => {
    return <div>
        {
            orders.reverse().map(o => <div>
                <div>{o.date}</div>
                {
                    o.orderItems.map(i => <div>
                        <div>Количество:</div>
                        <div>{i.quantity}</div>
                        <div>Продукт:</div>
                        <div>{i.product.name}</div>
                        <div>{i.product.price}</div>
                        <br />
                    </div>)
                }
            </div>)
        }
    </div>
};