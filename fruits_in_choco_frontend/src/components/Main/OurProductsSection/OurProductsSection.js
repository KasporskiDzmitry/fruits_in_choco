import React from 'react';
import style from './OurProductsSection.module.css';
import CategoryCardContainer from "./CategoryCard/CategoryCardContainer";

const OurProductsSection = (props) => {
    return <div className={style.ourProductsSection}>
        <div className={style.heading}>
            <h1>Что мы делаем</h1>
        </div>
        <div>
            <CategoryCardContainer />
            <CategoryCardContainer />
            <CategoryCardContainer />
        </div>
    </div>
};

export default OurProductsSection;