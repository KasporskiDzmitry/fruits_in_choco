import React, {useState} from "react";
import style from './ProductPage.module.css';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Button} from "react-bootstrap";
import Preloader from "../../common/Preloader/Preloader";
import ReviewItem from "./ReviewItem";
import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

const ProductPage = ({product, isAuth, isFetching, addReview, profile, reviews}) => {
    const [stars, setStars] = useState(0);
    const [reviewText, setReviewText] = useState('');


    const print = (e) => {
        setReviewText(e.target.value);
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
                                    {reviews.map(i => <ReviewItem review={i} profile={profile}/>)}
                                </div>
                                {
                                    localStorage.getItem('isLoggedIn') ?
                                        <div>
                                            <Rating name="rating" value={stars} onChange={(event, newValue) => {
                                                setStars(newValue);
                                            }}/>
                                            <textarea name="review" id="review" cols="30" rows="10"
                                                      onChange={print}></textarea>
                                            <button onClick={() => addReview({
                                                reviewer: localStorage.getItem('name'),
                                                reviewerId: localStorage.getItem('userId'),
                                                text: reviewText,
                                                stars: stars,
                                                datetime: new Date(),
                                                productId: product.id
                                            })}>Отправить
                                            </button>
                                            {/*<ReviewReduxForm onSubmit={onSubmit}/>*/}
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
}

const maxLength100 = maxLengthCreator(100);

const ReviewForm = ({handleSubmit, error}) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                Оставьте отзыв о товаре
                <div>
                    <Field component={Textarea} validate={[required, maxLength100]} name={'text'}
                           placeholder={'Enter your message'}/>
                </div>
                <div>
                    <button>Send</button>
                </div>
            </form>
        </div>

    )
}

const ReviewReduxForm = reduxForm({form: 'reviewForm'})(ReviewForm);


export default ProductPage;