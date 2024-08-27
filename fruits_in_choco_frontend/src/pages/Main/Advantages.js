import React from 'react';
import appStyle from '../../App.module.scss';
import style from './Main.module.scss';
import cakeIcon from '../../assets/images/cake.png';
import deliveryIcon from '../../assets/images/delivery.png';
import differentCakes from '../../assets/images/differentCakes.png';

export const Advantages = () => {
    return (
        <div id={'advantages'} className={`${appStyle.sectionOuter} ${style.advantagesSection}`}>
            <div className={`${appStyle.sectionInner} ${style.advantagesSectionWrapper}`}>
                <div className={style.advantagesItem}>
                    <div className={style.advantagesItemImageWrapper}>
                        <img src={cakeIcon} alt="Торт" />
                    </div>
                    <div className={style.advantagesItemText}>Индивидуальный дизайн</div>
                </div>
                <div className={style.advantagesItem}>
                    <div className={style.advantagesItemImageWrapper}>
                        <img src={deliveryIcon} alt="Доставка" />
                    </div>
                    <div className={style.advantagesItemText}>
                        Бесплатная доставка по Дзержинску
                    </div>
                </div>
                <div className={style.advantagesItem}>
                    <div className={style.advantagesItemImageWrapper}>
                        <img src={differentCakes} alt="Что-то еще" />
                    </div>
                    <div className={style.advantagesItemText}>Разнообразние вариантов</div>
                </div>
            </div>
        </div>
    );
};
