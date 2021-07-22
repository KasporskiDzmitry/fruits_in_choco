import React from "react";
import style from "./Slider.module.css";
import {Button, Carousel} from "react-bootstrap";

const Slider = (props) => {
    return <Carousel fade interval={8000} controls={false}>
        {props.slides.map(slide => {
            return <Carousel.Item>
                <img
                    className={style.sliderImage}
                    src={slide.url}
                    alt="First slide"
                />
                <Carousel.Caption className={style.slideInfo}>
                    <div className='sectionInner'>
                        <div className={style.slideInfo__title}>
                            <h1>{slide.title}</h1>
                        </div>
                        <div className={style.slideInfo__subtitle}>
                            <h2>{slide.subtitle}</h2>
                        </div>
                        <div className={style.slideInfo__primaryBtnWrapper}>
                            <button className='primaryBtn'>Подробнее</button>
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
        })}
    </Carousel>
};

export default Slider;