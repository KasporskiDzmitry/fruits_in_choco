import React from 'react';
import appStyle from '../../App.module.scss';
import style from '../Main/Main.module.scss';
import arrowBackward from '../../assets/images/Arrows/ArrowBackward.png';
import arrowForward from '../../assets/images/Arrows/ArrowForward.png';
import productStyle from './ProductType.module.scss';
import cakes from '../../assets/images/Catalog/cakes.png';
import cupCakes from '../../assets/images/Catalog/cupCakes.png';
import cakePopses from '../../assets/images/Catalog/cakePopses.png';
import bento from '../../assets/images/Catalog/bento.png';
import { BiscuitAndFillingCard } from './BiscuitAndFillingCard';

export const BiscuitAndFilling = ({ setOfBisquitAndFilling }) => {
    console.log(setOfBisquitAndFilling);

    return (
        <div className={`${appStyle.sectionInner}`}>
            <div className={style.heading}>
                <img src={arrowBackward} alt="Arrow" />
                <h1>Бисквит и начинка</h1>
                <img src={arrowForward} alt="Arrow" />
            </div>
            <div className={productStyle.bisquitTypes}>
                {setOfBisquitAndFilling.map((elem) => (
                    <BiscuitAndFillingCard key={elem.id} bisquitAndFilling={elem} />
                ))}
            </div>
        </div>
    );
};
