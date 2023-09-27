import React from "react";
import style from "./Main.module.scss";
import {Button, Card} from "react-bootstrap";

const CategoryCard = ({category, selectCategory}) => {
    return <div className={style.cardWrapper}>
        <div className={style.cardImageWrapper} onClick={(e) => selectCategory(e, category)}>
            <img src={category.imageURL}/>
        </div>
        <div className={style.cardFooter}>
            <Button onClick={(e) => selectCategory(e, category)}>{category.name}</Button>
        </div>
    </div>
}

export default CategoryCard;