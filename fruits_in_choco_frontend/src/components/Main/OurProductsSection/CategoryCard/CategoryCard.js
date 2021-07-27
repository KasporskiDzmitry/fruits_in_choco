import React from 'react';
import style from './CategoryCard.module.css';
import {NavLink} from "react-router-dom";

const CategoryCard = ({card, history, selectCategory}) => {

    const onClick = (e) => {
        e.preventDefault();
        selectCategory(card.id);
        history.push(card.url);
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