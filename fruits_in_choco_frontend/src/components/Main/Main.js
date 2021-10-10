import React from 'react';
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
                <div className={style.productsContainer}>
                    {props.categoryCards.map(card => {
                        return <CategoryCard card={card} history={props.history} setFilteredTypes={props.setFilteredTypes}/>
                    })}
                </div>
            </div>
        </div>
        <div className={` sectionOuter ${style.aboutSection}`}>
            <div className="sectionInner">
                <div className={style.heading}>
                    <h1>Кто мы</h1>
                </div>
                <div>
                    <div>
                        <img src="" alt="Наше фото"/>
                    </div>
                    <div>
                        Текст о нас
                    </div>
                </div>
            </div>
        </div>
    </div>
};

export default Main;