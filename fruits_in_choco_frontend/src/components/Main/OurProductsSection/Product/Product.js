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
        <div className="productTitle">
            <h2>{product.title}</h2>
        </div>
        <div className="productDescription">
            <p>{product.description}</p>
        </div>
    </div>
};

export default Product;