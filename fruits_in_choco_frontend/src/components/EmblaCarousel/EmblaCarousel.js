import React from 'react';
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from './EmblaCarouselArrowButtons';
import useEmblaCarousel from 'embla-carousel-react';
import style from '../EmblaCarousel/Embla.module.scss';

const OPTIONS = { loop: true };

const EmblaCarousel = ({ slides }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi);

    return (
        <section className={style.embla}>
            <div className={style.embla__controls}>
                <div className={style.embla__buttons}>
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>
            </div>
            <div className={style.embla__viewport} ref={emblaRef}>
                {/*minimum 5 slides required to create an infinite loop*/}
                <div className={style.embla__container}>
                    {slides.map((slide) => (
                        <div className={style.embla__slide} key={slide.id}>
                             <img src={slide.imageURL} alt="slide" className={style.embla__slide__number}/>
                        </div>
                    ))}
                </div>

            </div>

        </section>
    );
};

export default EmblaCarousel;
