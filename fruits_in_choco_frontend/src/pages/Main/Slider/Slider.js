import React from 'react';
import { Button, Carousel } from 'react-bootstrap';
import style from './Slider.module.scss';
import appStyle from '../../../App.module.scss';

import arrowForward from '../../../assets/images/Arrows/ArrowForward.png';
import arrowBackward from '../../../assets/images/Arrows/ArrowBackward.png';

const Slider = ({ slides }) => {
    // const controlForward = <img src={arrowForward} alt="arrowForward" />;
    // const controlBackward = <img src={arrowBackward} alt="controlBackward" />;

    return (
        <div className={style.sliderWrapper}>
            <Carousel
                fade
                interval={8000}
                controls={true}
                // prevIcon={controlBackward}
                // nextIcon={controlForward}
            >
                {slides.map((slide) => {
                    return (
                        <Carousel.Item key={slide.id}>
                            <img
                                className={style.sliderImage}
                                src={slide.imageURL}
                                alt="First slide"
                            />
                            <Carousel.Caption className={style.slideInfo}>
                                <div className={appStyle.sectionInner}>
                                    {/*<div className={style.slideInfo__title}>*/}
                                    {/*    <h1>{slide.title}</h1>*/}
                                    {/*</div>*/}
                                    {/*<div className={style.slideInfo__subtitle}>*/}
                                    {/*    <h2>{slide.text}</h2>*/}
                                    {/*</div>*/}
                                    {/*<div*/}
                                    {/*    className={*/}
                                    {/*        style.slideInfo__primaryBtnWrapper*/}
                                    {/*    }*/}
                                    {/*>*/}
                                    {/*    <Button*/}
                                    {/*        variant="primary"*/}
                                    {/*        className={style.btn}*/}
                                    {/*    >*/}
                                    {/*        Подробнее*/}
                                    {/*    </Button>*/}
                                    {/*</div>*/}
                                </div>
                            </Carousel.Caption>
                        </Carousel.Item>
                    );
                })}
            </Carousel>
        </div>
    );
};

export default Slider;
