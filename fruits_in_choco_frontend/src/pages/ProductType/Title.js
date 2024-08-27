import React from 'react';
import appStyle from '../../App.module.scss';
import style from '../Main/Main.module.scss';
import productStyle from './ProductType.module.scss';
import arrowBackward from '../../assets/images/Arrows/ArrowBackward.png';
import arrowForward from '../../assets/images/Arrows/ArrowForward.png';
import Cake from '../../assets/images/CakeInProductTypes.png';

export const Title = ({ title, titleImage, description }) => {
    return (
        <div className={`${appStyle.sectionInner}`}>
            <div className={style.heading}>
                <img src={arrowBackward} alt="Arrow" />
                <h1>{title}</h1>
                <img src={arrowForward} alt="Arrow" />
            </div>
            <div className={productStyle.title}>
                <div className={productStyle.text}>{description} </div>
                <div className={productStyle.image}>
                    <img src={titleImage} alt="Cake" />
                </div>
            </div>
        </div>
    );
};
