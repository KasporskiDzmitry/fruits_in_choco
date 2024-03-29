import React, {useEffect, useState} from "react";
import style from './ProductCard.module.scss'
import {Button, Card} from "react-bootstrap";
import {faCartPlus, faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {isProductInCart} from "../../utils/localStorageFunctions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {saveProductToCart} from "../../../redux/thunks/cart_thunks";
import Rating from "@material-ui/lab/Rating";

const ProductCard = ({product}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectProduct = (e) => {
        e.preventDefault();
        navigate(`/products/${product.id}`)
    };

    const cartButtonClickHandler = (e) => {
        dispatch(saveProductToCart(product));
    }

    const toCartButtonClassName = isProductInCart(product.id) ? `${style.toCartButton} ${style.checked}` : style.toCartButton


    return <Card className={style.cardWrapper}>
        <Card.Body>
            <div className={style.cardImageWrapper} onClick={selectProduct}>
                <Card.Img variant="top" src={product.imageURL}/>
            </div>
            <Card.Title className={style.cardTitle}>{product.name}</Card.Title>
        </Card.Body>
        <Card.Footer className={style.cardFooter}>
            <div className={style.cardPrice}>{product.price} руб.</div>
            <Rating name="starsRating" value={parseInt(product.avgRating)} readOnly/>
            <Button className={toCartButtonClassName} disabled={isProductInCart(product.id)}
                    onClick={cartButtonClickHandler}>
                {
                    isProductInCart(product.id) ?
                        <FontAwesomeIcon icon={faCheckCircle}/> :
                        <FontAwesomeIcon icon={faCartPlus}/>
                }
            </Button>
        </Card.Footer>
    </Card>
}

export default ProductCard;