import React, {useEffect} from "react";
import style from './ProductPage.module.scss';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import {Button} from "react-bootstrap";
import Preloader from "../../common/Preloader/Preloader";
import ReviewItem from "./Review/ReviewItem";
import ReviewForm from "./Review/ReviewForm";
import {isProductInCart} from "../../utils/localStorageFunctions";
import appStyle from '../../../App.module.scss';
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loadProductById} from "../../../redux/thunks/product_thunks";
import {saveProductToCart} from "../../../redux/thunks/cart_thunks";

const ProductPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const product = useSelector(state => state.productReducer.product);
    const isReviewAdding = useSelector(state => state.productReducer.isReviewAdding);

    useEffect(() => {
        dispatch(loadProductById(location.pathname.split('/').pop()));
    }, [])

    const isInCart = isProductInCart(product?.id);


    return <div className={`${appStyle.sectionOuter} ${style.productPageWrapper}`}>
        <div className={`${appStyle.sectionInner}`}>
            {!product ?
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
                                <Rating name="starsRating" value={parseInt(product.avgRating)} readOnly/>
                                <Typography className={style.reviews} component="legend">Reviews</Typography>
                            </div>
                            <h2>{product.price}</h2>
                            <div className={style.addToCartWrapper}>
                                <Button className={style.addToCartButton} disabled={isProductInCart(product.id)} variant="outline-primary"
                                        onClick={() => dispatch(saveProductToCart(product))}>{isInCart ? "Товар уже в корзине" : "В корзину"}</Button>
                            </div>
                        </div>
                    </div>
                    <div className={style.reviewsWrapper}>
                        <div>
                            {product.ratings && product.ratings.map(i => <ReviewItem {...i}/>)}
                        </div>
                        {
                            localStorage.name ?
                                <ReviewForm productId={product.id} isReviewAdding={isReviewAdding}/> :
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