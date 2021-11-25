import React from "react";
import style from "./Main.module.scss";
import {Button, Card} from "react-bootstrap";

const CategoryCard = ({category, selectCategory}) => {
    return <Card className={style.cardWrapper}>
        <div className={style.cardImageWrapper}>
            <Card.Img variant="top" src={category.imageURL} onClick={(e) => selectCategory(e, category)}/>
        </div>
        <Card.Body>
            <Card.Title className={style.cardTitle}>{category.name}</Card.Title>
            <Card.Text className={style.cardDescription}>Lorem Ipsum is simply dummy text of
                the printing and typesetting
                indusindustry\'s standard dummy text ever since the 1500s, when an unknown s
                standard dummy text ever since the 1500s, when an unknowns standard dummy
                text ever since the 1500s, when an unknowns standard dummy text ever since
                the 1500s, when an unknowns standard dummy text ever since the 1500s, when
                an unknowns standard dummy text ever try. Lorem Ipsum has been
                the</Card.Text>
        </Card.Body>
        <Card.Footer className={style.cardFooter}>
            <Button onClick={(e) => selectCategory(e, category)}>Подробнее</Button>
        </Card.Footer>
    </Card>
}

export default CategoryCard;