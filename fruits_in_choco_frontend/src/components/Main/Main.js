import React, {useEffect} from 'react';
import style from './Main.module.scss';
import SliderContainer from "./Slider/SliderContainer";
import CategoryCard from "./CategoryCard/CategoryCard";

const Main = (props) => {
    return <div className={style.main}>
        <SliderContainer/>
        <div className={`sectionOuter ${style.ourProductsSection}`}>
            <div className="sectionInner">
                <div className={style.heading}>
                    <h1>Что мы делаем</h1>
                </div>
                <div className={style.categoriesContainer}>
                    {props.categoryCards.map(card => <CategoryCard key={card.id} card={card} history={props.history}
                                                                   setFilteredTypes={props.setFilteredTypes}/>)}
                </div>
            </div>
        </div>
        <div className={` sectionOuter ${style.aboutSection}`}>
            <div className="sectionInner">
                <div className={style.heading}>
                    <h1>Кто мы</h1>
                </div>
                <div className={style.aboutSectionWrapper}>
                    <div className={style.aboutSectionImageWrapper}>
                        <img src="https://www.povarenok.ru/data/cache/2021feb/17/12/2833978_74029.jpg" alt="Наше фото"/>
                    </div>
                    <div className={style.aboutSectionDescription}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras arcu quam, tristique non
                            commodo vitae, dignissim eu dolor. Vestibulum ante ipsum primis in faucibus orci luctus et
                            ultrices posuere cubilia curae; Aliquam finibus ultricies ex, sed tristique nisi laoreet eu.
                            Suspendisse volutpat massa ex, non sagittis tortor imperdiet non. Pellentesque arcu tortor,
                            laoreet et nunc quis, egestas scelerisque dolor. Nulla tempor lacus molestie augue porta,
                            sed consectetur enim laoreet. Duis eu tellus sit amet nisi pulvinar hendrerit. Nullam nec
                            luctus mauris. Nullam nec posuere leo, et hendrerit diam. Integer mollis dolor quis nibh
                            molestie, in rhoncus arcu pharetra. In a sodales nisi, pharetra cursus urna. In hac
                            habitasse platea dictumst. Nam justo nisl, iaculis ac mi sollicitudin, dignissim interdum
                            nulla.
                        </p>
                        <p>
                            Duis quis luctus felis, quis efficitur mauris. Sed eu lorem id diam tempus volutpat vel sit
                            amet ipsum. Morbi aliquam fermentum mauris, commodo mollis mauris convallis nec. Vestibulum
                            viverra tellus nec felis commodo fringilla. Morbi sed lectus nisl. Morbi at mattis nibh, sit
                            amet convallis erat. Vivamus ex eros, aliquam ornare eleifend a, feugiat eget enim. Sed
                            finibus imperdiet ultricies. Sed sapien leo, feugiat ultrices porttitor efficitur, rutrum
                            non augue. Donec non ante tellus. Phasellus pulvinar turpis eget malesuada molestie.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
};

export default Main;