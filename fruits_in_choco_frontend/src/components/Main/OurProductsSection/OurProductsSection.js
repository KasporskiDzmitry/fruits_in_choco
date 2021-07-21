import React from 'react';
import style from './OurProductsSection.module.css';
import ProductContainer from "./Product/ProductContainer";

const OurProductsSection = (props) => {
    return <div className={style.ourProductsSection}>
        <div className={style.heading}>
            <h1>Что мы делаем</h1>
        </div>
        <div>
            <ProductContainer />
            <ProductContainer />
            <ProductContainer />
            <ProductContainer />
            <ProductContainer />
            <ProductContainer />
        </div>
    </div>
};

export default OurProductsSection;