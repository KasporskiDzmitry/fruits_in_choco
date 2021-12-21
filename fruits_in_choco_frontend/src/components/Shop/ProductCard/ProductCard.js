import React from "react";
import style from './ProductCard.module.scss'
import {Button, Card} from "react-bootstrap";
import {faCartPlus, faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {addProductToCart, isProductInCart} from "../../utils/localStorageFunctions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ProductCard = ({product, saveProductToCart, history}) => {
    // const saveProductToCart = () => {
    //     if (!isProductInCart(product.id)) {
    //         const cartProduct = {
    //             ...product,
    //             quantity: 1
    //         };
    //         addToCart(cartProduct);
    //         addProductToCart(cartProduct);
    //     }
    // };

    const selectProduct = (e) => {
        e.preventDefault();
        history.push({pathname: `/products/${product.id}`})
    };

    const toCartButtonClassName = isProductInCart(product.id) ? `${style.toCartButton} ${style.checked}` : style.toCartButton

    return <Card className={style.cardWrapper}>
        <div className={style.cardImageWrapper} onClick={selectProduct}>
            <Card.Img  variant="top" src={'https://i2.wp.com/completelydelicious.com/wp-content/uploads/2020/05/chocolate-oreo-parfait-8-500x500.jpg'}/>
        </div>
        <Card.Body>
            <Card.Title className={style.cardTitle}>{product.name}</Card.Title>
            <Card.Text>{product.typeId}</Card.Text>
        </Card.Body>
        <Card.Footer className={style.cardFooter}>
            <div className={style.cardPrice}>{product.price}</div>
            <Button className={toCartButtonClassName} disabled={isProductInCart(product.id)} onClick={() => saveProductToCart(product)}>
                {
                    isProductInCart(product.id) ?
                        <FontAwesomeIcon icon={faCheckCircle} /> :
                        <FontAwesomeIcon icon={faCartPlus} />
                }
            </Button>
        </Card.Footer>
    </Card>
}

export default ProductCard;