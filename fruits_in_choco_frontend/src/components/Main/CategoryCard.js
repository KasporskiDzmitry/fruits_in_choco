import React from "react";
import style from "./Main.module.scss";
import {Button, Card} from "react-bootstrap";

const CategoryCard = ({category, selectCategory}) => {
    return <Card className={style.cardWrapper}>
        <div className={style.cardImageWrapper}>
            <Card.Img variant="top" src={category.imageURL} onClick={(e) => selectCategory(e, category)}/>
        </div>
        <div>
            <Card.Title className={style.cardTitle}>{category.name}</Card.Title>
            <Card.Text className={style.cardDescription}>{category.description}</Card.Text>
        </div>
        <Card.Footer className={style.cardFooter}>
            <Button onClick={(e) => selectCategory(e, category)}>Подробнее</Button>
        </Card.Footer>
    </Card>
}

export default CategoryCard;