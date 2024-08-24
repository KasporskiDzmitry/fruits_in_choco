import React from 'react';
import {Link} from "react-router-dom";

const Enum = {
    cakes: 'Торты',
    cupcakes: 'Капкейки',
    cakepopses: 'Кейк-попсы',
    bentoes: 'Бенто-торты',
};

const CategoryCard = ({category}) => {
    const routeName = Object.entries(Enum).find((item) => item[1] === category.title)[0];

    return (
        <div>
            <Link to={`/products/${routeName}`}>
                <img src={category.mainImageURL} alt={category.title}/>
            </Link>
            <p>{category.title}</p>
        </div>
    );
};

export default CategoryCard;
