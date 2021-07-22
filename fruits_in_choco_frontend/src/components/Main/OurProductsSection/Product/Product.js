import React from 'react';
import style from './Product.module.css';
import {NavLink} from "react-bootstrap";

const Product = ({product}) => {

    return <div className={style.productWrapper}>
        <div className={style.productImageWrapper}>
            <NavLink to={'#'}>
                <img src={product.imageUrl} alt={product.title} />
            </NavLink>
        </div>
        <div className={style.productTitle}>
            <h2>{product.title}</h2>
        </div>
        <div className={style.productDescription}>
            <p>{product.description}</p>
            <NavLink to={'#'}>Подробнее</NavLink>
        </div>
    </div>
};

export default Product;