import React from "react";
import style from './ProductCard.module.scss'
import {Button, Card} from "react-bootstrap";
import {addProductToCart} from "../../utils/localStorageFunctions";

const ProductCard = ({product, addToCart, history}) => {
    const saveProductToCart = (product) => {
        const cartProduct = {
            ...product,
            quantity: 1
        };
        addToCart(cartProduct);
        addProductToCart(cartProduct);
    };

    const selectProduct = (e, id) => {
        e.preventDefault();
        history.push({pathname: `/product/${id}`})
    };

    return <Card className={style.cardWrapper}>
        <div className={style.cardImageWrapper}>
            <Card.Img variant="top" src={product.imageURL} onClick={(e) => saveProductToCart(product)}/>
        </div>
        <Card.Body>
            <Card.Title className={style.cardTitle}>{product.name}</Card.Title>
        </Card.Body>
        <Card.Footer className={style.cardFooter}>
            <Button onClick={(e) => selectProduct(e, product.id)}>Подробнее</Button>
            <Button onClick={(e) => saveProductToCart(product)}>В корзину</Button>
        </Card.Footer>
    </Card>
}

export default ProductCard;