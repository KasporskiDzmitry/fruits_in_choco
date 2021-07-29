import React from 'react';
import style from './CategoryCard.module.css';
import {useHistory} from 'react-router-dom';
import {NavLink} from "react-router-dom";

const CategoryCard = ({card, selectCategory, setFilteredTypes, products}) => {
    const hs = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        // selectCategory(card.id);
        // setFilteredTypes(products.filter(i => i.category.id === card.id).map(p => p.productType.id));
        hs.push(`shop?categoryId=${card.id}`);
    }

    return <div className={style.cardWrapper}>
        <div className={style.cardImageWrapper} onClick={handleClick}>
            <img src={card.imageURL} alt={card.name}/>
        </div>
        <div className={style.cardTitle}>
            <h2>{card.name}</h2>
        </div>
        <div className={style.cardDescription}>
            <p>{card.description}</p>
            <button onClick={handleClick}>Подробнее</button>
        </div>
    </div>
};

export default CategoryCard;