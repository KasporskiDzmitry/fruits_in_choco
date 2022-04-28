import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import style from '../ProductPage.module.scss'
import Rating from "@material-ui/lab/Rating";


const ReviewForm = (props) => {
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleSubmit({
            userId: parseInt(localStorage.getItem('userId')),
            author: localStorage.getItem('name'),
            message: message,
            rating: rating,
            productId: props.productId
        });

        setMessage('');
        setRating(0);
    };

    return <div>
        <Rating name="rating" value={rating} onChange={(event, newValue) => setRating(newValue)}/>
        <form onSubmit={handleSubmit}>
            Оставьте отзыв о товаре
            <div>
                <textarea required name="reviewForm" id="" cols="70" rows="8" onChange={e => setMessage(e.target.value)} value={message}/>
            </div>
            <div className={style.btnWrapper}>
                <Button type={"submit"}>Send</Button>
            </div>
        </form>
    </div>
};

export default ReviewForm;