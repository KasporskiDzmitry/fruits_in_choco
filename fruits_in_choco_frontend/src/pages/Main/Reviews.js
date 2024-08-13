import React from 'react';
import appStyle from '../../App.module.scss';
import style from './Main.module.scss';
import arrowBackward from '../../assets/images/Arrows/ArrowBackward.png';
import arrowForward from '../../assets/images/Arrows/ArrowForward.png';
import Slider from './Slider/Slider';
import { useSelector } from 'react-redux';

export const Reviews = () => {
    const reviewsSlides = useSelector(
        (state) => state.reviewsSlideReducer.reviewsSlides
    );

    return (
        <div
            id={'reviews'}
            className={`${appStyle.sectionOuter} ${style.reviews}`}
        >
            <div className={`${appStyle.sectionInner}`}>
                <div className={style.heading}>
                    <img src={arrowBackward} alt="Arrow" />
                    <h1>Отзывы</h1>
                    <img src={arrowForward} alt="Arrow" />
                </div>
                <Slider slides={reviewsSlides} />
            </div>
        </div>
    );
};
