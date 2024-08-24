import React from 'react';
import {useSelector} from 'react-redux';

import style from './Main.module.scss';
import appStyle from '../../App.module.scss';
import CategoryCard from './CategoryCard';
import arrowBackward from "../../assets/images/Arrows/ArrowBackward.png";
import arrowForward from "../../assets/images/Arrows/ArrowForward.png";

export const Categories = () => {
    const categoryCards = useSelector(
        (state) => state.categoryReducer.categories
    );

    return (
        <div id={'production'} className={`${appStyle.sectionOuter} ${style.catalog}`}>
            <div className={appStyle.sectionInner}>
                <div className={style.heading}>
                    <img src={arrowBackward} alt="Arrow"/>
                    <h1>Каталог</h1>
                    <img src={arrowForward} alt="Arrow"/>
                </div>
                <div className={style.productTypes}>
                    {categoryCards.map((item) => (
                        <CategoryCard
                            key={item.id}
                            category={item}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
