import React from 'react'
import {Card, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import style from './ProductCard.module.css';

export const ProductCard = ({card}) => {
    return <Card className={style.card} style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
            <Card.Title>{card.name}</Card.Title>
            <Card.Text>{card.description}</Card.Text>
            <Link to={`/product/${card.id}`}>
                <Button variant="primary">Go somewhere</Button>
            </Link>
        </Card.Body>
        <Card.Footer>
            <Card.Text>{card.price}</Card.Text>
        </Card.Footer>
    </Card>
}

export default ProductCard