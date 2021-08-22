import React, {useState} from "react";
import style from './ProductPage.module.css';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import {Button} from "react-bootstrap";
import Preloader from "../../common/Preloader/Preloader";
import ReviewItem from "./ReviewItem";
import ReviewForm from "./ReviewForm";

const ProductPage = ({product, isAuth, isFetching, addReview, profile, reviews, editReview, updateReview}) => {
    const [stars, setStars] = useState(0);
    const [reviewText, setReviewText] = useState('');

    const handleChange = (e) => {
        setReviewText(e.target.value);
    }

    const handleSubmit = (e) => {
        addReview({
            reviewer: localStorage.getItem('name'),
            reviewerId: localStorage.getItem('userId'),
            text: reviewText,
            stars: stars,
            datetime: new Date(),
            productId: product.id
        })
    }


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
                                <div>
                                    {reviews.map(i => <ReviewItem review={i} profile={profile} updateReview={updateReview} />)}
                                </div>
                                {
                                    localStorage.getItem('isLoggedIn') ?
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
                        </div>
                    </>
            }
        </div>
    </div>
};

export default ProductPage;