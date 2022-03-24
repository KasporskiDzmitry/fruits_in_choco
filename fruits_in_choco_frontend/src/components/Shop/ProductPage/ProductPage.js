import React, {useEffect} from "react";
import style from './ProductPage.module.scss';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import {Button} from "react-bootstrap";
import Preloader from "../../common/Preloader/Preloader";
import ReviewItem from "./Review/ReviewItem";
import ReviewForm from "./Review/ReviewForm";
import {isProductInCart} from "../../utils/localStorageFunctions";
import SockJS from "sockjs-client";
import {API_BASE_URL} from "../../utils/constants/url";
import {over} from "stompjs";

let stompClient = null;

const ProductPage = ({product, saveProductToCart, isFetching, addReview, profile, ratings}) => {

    useEffect(() => {
        let Sock = new SockJS(`${API_BASE_URL}/ws`);
        stompClient = over(Sock);
        stompClient.connect({}, () => {}, (err) => console.log(err));

        return () => stompClient && stompClient.disconnect();
    }, [])

    const isInCart = isProductInCart(product.id);

    return <div className={`sectionOuter ${style.productPageWrapper}`}>
        <div className="sectionInner">
            {isFetching ?
                <Preloader/> :
                <>
                    <div className={style.heading}>
                        <h1>{product.name}</h1>
                    </div>
                    <div className={style.infoWrapper}>
                        <div className={style.infoImageWrapper}>
                            <img
                                src="https://juegoscocinarpasteleria.org/wp-content/uploads/2020/01/Fresas-cubiertas-de-chocolate-Cocina-con-clase.jpg"
                                alt={product.name}/>
                        </div>
                        <div className={style.infoTextWrapper}>
                            <h3>{product.name}</h3>
                            <div className={style.ratingWrapper}>
                                <Rating name="starsRating" value={2} readOnly/>
                                <Typography className={style.reviews} component="legend">Reviews</Typography>
                            </div>
                            <h2>{product.price}</h2>
                            <div className={style.addToCartWrapper}>
                                <Button className={style.addToCartButton} disabled={isInCart} variant="outline-primary" onClick={() => saveProductToCart(product)}>{isInCart ? "Товар уже в корзине" : "В корзину"}</Button>
                            </div>
                        </div>
                    </div>
                    <div className={style.reviewsWrapper}>
                        <div>
                            {ratings.map(i => <ReviewItem {...i}/>)}
                        </div>
                        {
                            localStorage.name ?
                                <ReviewForm handleSubmit={addReview} productId={product.id} stompClient={stompClient}/> :
                                <div>
                                    Войдите или зарегистрируйтесь, чтобы оставить отзыв о товаре
                                </div>
                        }
                    </div>
                </>
            }
        </div>
    </div>
};

export default ProductPage;