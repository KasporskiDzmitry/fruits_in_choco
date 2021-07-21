import React from 'react';
import style from './Main.module.css';
import AboutSectionContainer from "./AboutSection/AboutSectionContainer";
import OurProductsSectionContainer from "./OurProductsSection/OurProductsSectionContainer";
import SliderContainer from "./Slider/SliderContainer";

const Main = (props) => {
    return <div className={style.main}>
        <SliderContainer/>
        <OurProductsSectionContainer/>
        <AboutSectionContainer/>
    </div>
};

export default Main;