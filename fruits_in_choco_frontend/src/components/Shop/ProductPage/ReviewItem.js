import React from "react";
import Rating from "@material-ui/lab/Rating";
import style from './ReviewItem.module.css';

const ReviewItem = ({review, profile}) => {
    console.log(profile)
    return <div className={style.reviewItem}>
        {
            localStorage.getItem('isLoggedIn') ?
                profile.reviews.map(i => i.id).includes(review.id) ? <div>Редактировать</div> : null
                : null
        }
        <div className={style.heading}>
            <h2>{review.reviewer}</h2>
            <Rating name="reviewRating" value={review.stars} readOnly/>
        </div>
        <h3>{new Date(review.datetime).toLocaleString()}</h3>
        <p>{review.text}</p>
    </div>
};

export default ReviewItem;