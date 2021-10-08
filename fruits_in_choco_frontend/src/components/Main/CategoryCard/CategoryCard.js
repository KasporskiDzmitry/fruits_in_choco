import React from 'react';
import style from './CategoryCard.module.css';

const CategoryCard = ({card, setFilteredTypes, history}) => {
    const handleClick = (e) => {
        e.preventDefault();
        setFilteredTypes(card.types.map(i => i.id));
        history.push({pathname: `/shop`, state: {categoryId: card.id}})
    }

    return <div className={style.cardWrapper}>
        <div className={style.cardImageWrapper}>
            <img src={card.imageURL} alt={card.name} onClick={handleClick}/>
            {/*<Link to={{pathname: '/shop', state: {category: card.id}}}>*/}
            {/*</Link>*/}
        </div>
        <div className={style.cardTitle}>
            <h2>{card.name}</h2>
        </div>
        <div className={style.cardDescription}>
            <p>{card.description}</p>
            <button onClick={handleClick}>Подробнее</button>
            {/*<Link to={{pathname: '/shop', state: {category: card.id}}}>*/}
            {/*</Link>*/}
        </div>
    </div>
};

export default CategoryCard;