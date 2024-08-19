import React from 'react';
import style from './Main.module.scss';
import {Link} from "react-router-dom";
import cakes from "../../assets/images/Catalog/cakes.png";


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
