import React from "react";
import Rating from "@material-ui/lab/Rating";
import style from './ReviewItem.module.css';

const ReviewItem = ({review}) => {
    return <div className={style.reviewItem}>
        <div className={style.heading}>
            <h2>{review.reviewer}</h2>
            <Rating name="reviewRating" value={review.stars} readOnly/>
        </div>
        <h3>{new Date(review.datetime).toLocaleString()}</h3>
        <p>{review.text}</p>
    </div>
};

export default ReviewItem;