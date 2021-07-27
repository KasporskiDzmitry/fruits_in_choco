import React from 'react'
import {Card, Button} from "react-bootstrap";

export const ProductCard = ({card}) => {
    return <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
            <Card.Title>{card.name}</Card.Title>
            <Card.Text>{card.description}</Card.Text>
            <Button variant="primary">Go somewhere</Button>
        </Card.Body>
        <Card.Footer>
            <Card.Text>{card.price}</Card.Text>
        </Card.Footer>
    </Card>
}

export default ProductCard