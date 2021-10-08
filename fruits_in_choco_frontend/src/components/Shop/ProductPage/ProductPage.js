import React, {useState} from "react";
import style from './ProductPage.module.css';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import {Button} from "react-bootstrap";
import Preloader from "../../common/Preloader/Preloader";
import ReviewItem from "./ReviewItem";
import ReviewForm from "./ReviewForm";

const ProductPage = ({product, isAuth, isFetching, addReview, profile, ratings, editReview, updateReview, deleteReview}) => {
    const [stars, setStars] = useState(0);
    const [reviewText, setReviewText] = useState('');

    const handleChange = (text) => {
        setReviewText(text);
    };

    const handleSubmit = (e) => {
        addReview({
            userId: parseInt(localStorage.getItem('userId')),
            author: localStorage.getItem('name'),
            message: reviewText,
            rating: stars,
            productId: product.id
        })
    };


    return <div className={`sectionOuter ${style.productPageWrapper}`}>
        <div className="sectionInner">
            {
                isFetching ?
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
                                    <Button className={style.addToCartButton} variant="outline-primary">В
                                        корзину</Button>
                                </div>
                            </div>
                        </div>
                        <div className={style.reviewsWrapper}>
                            <div>
                                {ratings.map(i => <ReviewItem isAuth={isAuth} review={i} profile={profile} updateReview={updateReview} deleteReview={deleteReview}/>)}
                            </div>
                            {
                                localStorage.getItem('isLoggedIn') === "true" ?
                                    <div>
                                        <Rating name="rating" value={stars} onChange={(event, newValue) => {
                                            setStars(newValue);
                                        }}/>
                                        <ReviewForm handleSubmit={handleSubmit} handleChange={handleChange} value={reviewText}/>
                                    </div> :
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