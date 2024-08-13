import React from 'react';
import appStyle from '../../App.module.scss';
import style from './Main.module.scss';
import arrowBackward from '../../assets/images/Arrows/ArrowBackward.png';
import arrowForward from '../../assets/images/Arrows/ArrowForward.png';
import chooseTaste from '../../assets/images/HowToOrder/chooseTaste.png';
import chooseDecor from '../../assets/images/HowToOrder/chooseDecor.png';
import writeToInstagram from '../../assets/images/HowToOrder/writeToInstagram.png';

export const HowToOrder = () => {
    return (
        <div
            id={'howToOrder'}
            className={`${appStyle.sectionOuter} ${style.aboutSection}`}
        >
            <div className={`${appStyle.sectionInner}`}>
                <div className={style.heading}>
                    <img src={arrowBackward} alt="Arrow" />
                    <h1>Как заказать</h1>
                    <img src={arrowForward} alt="Arrow" />
                </div>
                <div className={style.howToOrder}>
                    <div className={style.orderItem}>
                        <img src={chooseTaste} alt="chooseTaste" />
                        <p>Выбери бисквит и начинку</p>
                    </div>
                    <div className={style.orderItem}>
                        <img src={chooseDecor} alt="chooseTaste" />
                        <p>Определись с декором</p>
                    </div>
                    <div className={style.orderItem}>
                        <img src={writeToInstagram} alt="chooseTaste" />
                        <p>Напиши мне в директ</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
