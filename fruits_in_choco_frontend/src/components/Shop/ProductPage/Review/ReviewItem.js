import React from "react";
import Rating from "@material-ui/lab/Rating";
import style from '../ProductPage.module.scss'

const ReviewItem = ({author, rating, date, message}) => {
    return <div className={style.reviewItem}>
        <div className={style.heading}>
            <h2>{author}</h2>
            <Rating name="reviewRating" value={rating} readOnly/>
        </div>
        <h3>{new Date(date).toLocaleString()}</h3>
        <p>{message}</p>
    </div>
};

export default ReviewItem;