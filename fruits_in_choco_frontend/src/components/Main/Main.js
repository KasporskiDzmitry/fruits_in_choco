import React from 'react';
import style from './Main.module.css';
import CategoriesListContainer from "../CategoriesList/CategoriesListContainer";
import AboutSectionContainer from "./AboutSection/AboutSectionContainer";

const Main = (props) => {
    return <div>
        <div className={style.sectionBanner}>
            <div className={style.sectionBanner__title}>Фрукты в шоколаде</div>
            <div className={style.sectionBanner__primaryBtnWrapper}>
                <div>Карусель</div>
                <button className='primaryBtn'>Подробнее</button>
            </div>
        </div>
        <AboutSectionContainer />
    </div>
};

export default Main;