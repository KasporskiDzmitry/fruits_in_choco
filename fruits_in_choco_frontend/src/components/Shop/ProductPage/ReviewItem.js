import React, {useState} from "react";
import Rating from "@material-ui/lab/Rating";
import style from './ReviewItem.module.css';
import ReviewForm from "./ReviewForm";

const ReviewItem = (props) => {
    const isLoggedUserReview =  props.isAuth || localStorage.getItem('isLoggedIn') ? props.review.reviewerId == localStorage.getItem('userId') : false;

    const [editMode, setEditMode] = useState(false);
    const [reviewText, setReviewText] = useState(props.review.text);
    const [stars, setStars] = useState(props.review.stars);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = (e) => {
        setEditMode(false);
        props.updateReview({...props.review, text: reviewText, stars: stars});
    };

    return <div className={style.reviewItem}>
        {!editMode ?
            <div>
                {isLoggedUserReview ?
                    <div>
                        <button onClick={activateEditMode}>Редактировать</button>
                        <button onClick={() => {
                            if (window.confirm('Удалить?')) {
                                props.deleteReview(props.review)
                            }
                        }}>Удалить</button>
                    </div>
                    : null}

                <div className={style.heading}>
                    <h2>{props.review.reviewer}</h2>
                    <Rating name="reviewRating" value={stars} readOnly/>
                </div>
                <h3>{new Date(props.review.datetime).toLocaleString()}</h3>
                <p>{reviewText}</p>
            </div> :
            <div>
                <Rating name="rating" value={stars} onChange={(event, newValue) => {
                    setStars(newValue);
                }}/>
                <ReviewForm handleChange={setReviewText} handleSubmit={deactivateEditMode} value={reviewText}/>
            </div>
        }
        </div>
}

export default ReviewItem;