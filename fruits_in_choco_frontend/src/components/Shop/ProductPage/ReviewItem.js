import React, {useState} from "react";
import Rating from "@material-ui/lab/Rating";
import style from './ReviewItem.module.css';
import ReviewForm from "./ReviewForm";

const ReviewItem = (props) => {
    const isLoggedUserReview =  props.isAuth || localStorage.getItem('isLoggedIn') ? props.review.reviewerId == localStorage.getItem('userId') : false;

    const [editMode, setEditMode] = useState(false);
    const [message, setMessage] = useState(props.review.message);
    const [rating, setRating] = useState(props.review.rating);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = (e) => {
        setEditMode(false);
        props.updateReview({...props.review, text: message, stars: rating});
    };

    const deleteReview = () => {
        if (window.confirm('Удалить?')) {
            props.deleteReview(props.review)
        }
    }

    return <div className={style.reviewItem}>
        {!editMode ?
            <div>
                {isLoggedUserReview ?
                    <div>
                        <button onClick={activateEditMode}>Редактировать</button>
                        <button onClick={deleteReview}>Удалить</button>
                    </div> : null}

                <div className={style.heading}>
                    <h2>{props.review.reviewer}</h2>
                    <Rating name="reviewRating" value={rating} readOnly/>
                </div>
                <h3>{new Date(props.review.datetime).toLocaleString()}</h3>
                <p>{message}</p>
            </div> :
            <div>
                <Rating name="rating" value={rating} onChange={(event, newValue) => {
                    setRating(newValue);
                }}/>
                <ReviewForm handleChange={setMessage} handleSubmit={deactivateEditMode} value={message}/>
            </div>
        }
        </div>
}

export default ReviewItem;