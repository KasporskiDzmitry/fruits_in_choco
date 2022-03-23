import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import style from '../ProductPage.module.scss'
import Rating from "@material-ui/lab/Rating";
import SockJS from "sockjs-client";
import {API_BASE_URL} from "../../../utils/constants/url";
import {over} from "stompjs";

let stompClient = null;

const ReviewForm = (props) => {
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');

    const initStompClient = () => {
        let Sock = new SockJS(`${API_BASE_URL}/ws`);
        console.log('open new connection')
        stompClient = over(Sock);
        stompClient.connect({}, () => {
        }, (err) => console.log(err));
    }

    useEffect(() => {
        initStompClient();
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleSubmit({
            userId: parseInt(localStorage.getItem('userId')),
            author: localStorage.getItem('name'),
            message: message,
            rating: rating,
            productId: props.productId
        });
        stompClient.send("/app/notification", {}, JSON.stringify({date: new Date(), type: 'REVIEW'}));

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