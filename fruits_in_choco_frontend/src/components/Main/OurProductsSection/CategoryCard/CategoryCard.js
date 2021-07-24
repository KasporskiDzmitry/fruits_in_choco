import React from 'react';
import style from './CategoryCard.module.css';
import {NavLink} from "react-router-dom";

const CategoryCard = ({card, history, selectCategory}) => {

    const onClick = (e) => {
        e.preventDefault();
        selectCategory(card.categoryId);
        history.push(`/shop/${card.categoryType}`);
    }

    return <div className={style.cardWrapper}>
        <div className={style.cardImageWrapper} onClick={(e) => onClick(e)}>
            <img src={card.imageUrl} alt={card.title}/>
        </div>
        <div className={style.cardTitle}>
            <h2>{card.title}</h2>
        </div>
        <div className={style.cardDescription}>
            <p>{card.description}</p>
            <button onClick={(e) => onClick(e)}>Подробнее</button>
        </div>
    </div>
};

export default CategoryCard;