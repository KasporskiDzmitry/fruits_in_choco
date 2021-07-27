import React from 'react';
import style from './Main.module.css';
import AboutSectionContainer from "./AboutSection/AboutSectionContainer";
import OurProductsSectionContainer from "./OurProductsSection/OurProductsSectionContainer";
import SliderContainer from "./Slider/SliderContainer";
import ProductContainer from "./OurProductsSection/CategoryCard/CategoryCardContainer";
import CategoryCard from "./OurProductsSection/CategoryCard/CategoryCard";

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
                        return <CategoryCard history={props.history} card={card} setFilteredTypes={props.setFilteredTypes} products={props.products} selectCategory={props.selectCategory} />
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