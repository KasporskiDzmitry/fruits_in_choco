import React from "react";
import style from './ProductPage.module.css';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Button} from "react-bootstrap";
import Preloader from "../../common/Preloader/Preloader";
import ReviewItem from "./ReviewItem";

const ProductPage = ({product, isAuth, isFetching}) => {
    const [value, setValue] = React.useState(product.rating = 0);

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
                                    <Rating name="starsRating" value={value} readOnly/>
                                    <Typography className={style.reviews} component="legend">Reviews</Typography>
                                </div>
                                <h2>{product.price}</h2>
                                <div className={style.addToCartWrapper}>
                                    <Button className={style.addToCartButton} variant="outline-primary">В
                                        корзину</Button>
                                </div>
                                {
                                    isAuth ?
<div>
                                        <div>
                                            {product.reviews.map(i => <ReviewItem review={i} />)}
                                        </div>

                                        <form action="">
                                            <div>
                                                Оставьте отзыв о товаре
                                                <Rating
                                                    name="simple-controlled"
                                                    value={value}
                                                    onChange={(event, newValue) => {
                                                        setValue(newValue);
                                                    }}
                                                />
                                                <textarea name="" id="" cols="30" rows="10"></textarea>
                                                <button>Оптравить</button>
                                            </div>
                                        </form> </div>:
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

export default ProductPage;