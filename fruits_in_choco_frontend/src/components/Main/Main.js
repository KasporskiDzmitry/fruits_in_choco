import React from 'react';
import style from './Main.module.css';
import AboutSectionContainer from "./AboutSection/AboutSectionContainer";
import OurProductsSectionContainer from "./OurProductsSection/OurProductsSectionContainer";
import SliderContainer from "./Slider/SliderContainer";
import ProductContainer from "./OurProductsSection/Product/ProductContainer";
import Product from "./OurProductsSection/Product/Product";

const Main = (props) => {
    return <div className={style.main}>
        <SliderContainer/>
        <div className={`sectionOuter ${style.ourProductsSection}`}>
            <div className="sectionInner">
                <div className={style.heading}>
                    <h1>Что мы делаем</h1>
                </div>
                <div>
                    {props.products.map((product) => {
                        return <Product product={product} />
                    })}
                </div>
            </div>
        </div>
        <AboutSectionContainer/>
    </div>
};

export default Main;