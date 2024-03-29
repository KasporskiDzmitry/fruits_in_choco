import React, {useEffect, useState} from "react";
import {Carousel} from "react-bootstrap";
import {Button} from 'react-bootstrap';
import style from "./Slider.module.scss";
import appStyle from "../../../App.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {loadSlides} from "../../../redux/thunks/slide_thunks";

// test
import banner from "../../../assets/images/banner.png"
//test

const Slider = (props) => {
    const slides = useSelector(state => state.slideReducer.slides);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadSlides());
    }, [])

    return <Carousel fade interval={8000} controls={false}>
        {slides.map(slide => {
            return <Carousel.Item key={slide.id}>
                <img
                    className={style.sliderImage}
                    src={banner}
                    alt="First slide"
                />
                <Carousel.Caption className={style.slideInfo}>
                    <div className={appStyle.sectionInner}>
                        <div className={style.slideInfo__title}>
                            <h1>{slide.title}</h1>
                        </div>
                        <div className={style.slideInfo__subtitle}>
                            <h2>{slide.text}</h2>
                        </div>
                        <div className={style.slideInfo__primaryBtnWrapper}>
                            <Button variant="primary" className={style.btn}>Подробнее</Button>
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
        })}
    </Carousel>
};

export default Slider;