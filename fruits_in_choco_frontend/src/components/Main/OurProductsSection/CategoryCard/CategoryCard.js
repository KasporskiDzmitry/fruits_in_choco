import React from 'react';
import style from './CategoryCard.module.css';
import {Link, useHistory} from 'react-router-dom';
import {NavLink} from "react-router-dom";

const CategoryCard = ({card, selectCategory, setFilteredTypes, products}) => {
    const hs = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        selectCategory(card.id);
        // setFilteredTypes(card.types.map(i => i.id));
        hs.push(`shop`);
    }

    return <div className={style.cardWrapper}>
        <div className={style.cardImageWrapper}>
            <Link to={{pathname: '/shop', state: {category: card.id}}}>
                <img src={card.imageURL} alt={card.name}/>
            </Link>
        </div>
        <div className={style.cardTitle}>
            <h2>{card.name}</h2>
        </div>
        <div className={style.cardDescription}>
            <p>{card.description}</p>
            <Link to={{pathname: '/shop', state: {category: card.id}}}>
                <button>Подробнее</button>
            </Link>
        </div>
    </div>
};

export default CategoryCard;