import React from 'react';
import style from './CategoryCard.module.css';
import {NavLink} from "react-router-dom";

const CategoryCard = ({card, history, selectCategory, setFilteredTypes, products}) => {

    const onClick = (e) => {
        e.preventDefault();
        selectCategory(card.id);
        setFilteredTypes(products.filter(i => i.category.id === card.id).map(p => p.productType.id));
        history.push({
            pathname: card.url,
            search: `?categoryId=${card.id}`,
            state: {categoryId: card.id}
        });
    }

    return <div className={style.cardWrapper}>
        <div className={style.cardImageWrapper} onClick={(e) => onClick(e)}>
            <img src={card.imageURL} alt={card.name}/>
        </div>
        <div className={style.cardTitle}>
            <h2>{card.name}</h2>
        </div>
        <div className={style.cardDescription}>
            <p>{card.description}</p>
            <button onClick={(e) => onClick(e)}>Подробнее</button>
        </div>
    </div>
};

export default CategoryCard;