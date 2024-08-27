import productStyle from './ProductType.module.scss';
import React from 'react';

export const BiscuitAndFillingCard = ({ bisquitAndFilling }) => {
    return (
        <div className={productStyle.flipCard}>
            <p>{bisquitAndFilling.title}</p>
            <div className={productStyle.flipCardInner}>
                <div className={productStyle.flipCardFront}>
                    <img src={bisquitAndFilling.imageURL} alt="cakes" />
                </div>
                <div className={productStyle.flipCardBack}>
                    <h1>{bisquitAndFilling.text}</h1>
                </div>
            </div>
        </div>
    );
};
