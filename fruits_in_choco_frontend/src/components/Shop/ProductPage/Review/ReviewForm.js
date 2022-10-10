import React, {useState} from "react";
import {Button} from "react-bootstrap";
import style from '../ProductPage.module.scss'
import Rating from "@material-ui/lab/Rating";
import {Field, reduxForm, reset} from "redux-form";
import {Textarea} from "../../../common/FormsControls/FormsControls";
import {required} from "../../../utils/validators/validators";
import {useDispatch} from "react-redux";
import {addReview} from "../../../../redux/thunks/product_thunks";

const ReviewForm = (props) => {
    const dispatch = useDispatch();
    const [rating, setRating] = useState(0);

    const onSubmit = (formData) => {
        dispatch(addReview({
            userId: parseInt(localStorage.getItem('userId')),
            author: localStorage.getItem('name'),
            message: formData.message,
            rating: rating,
            productId: props.productId
        }));

        dispatch(reset("add_review"));
        setRating(0);
    };

    return <div>
        <Rating name="rating" value={rating} onChange={(event, newValue) => setRating(newValue)}/>
        <AddReviewReduxForm onSubmit={onSubmit} {...props} isReviewAdding={props.isReviewAdding}/>
    </div>
};

const Form = ({handleSubmit, error, ...props}) => {
    return <form onSubmit={handleSubmit}>
        Оставьте отзыв о товаре
        <div>
            <Field className={style.field} placeholder={'Description'} name={'message'} component={Textarea} validate={[required]}/>
        </div>
        <div className={style.btnWrapper}>
            <Button type={"submit"} disabled={props.isReviewAdding}>Send</Button>
        </div>
    </form>
}

const AddReviewReduxForm = reduxForm({form: 'add_review'})(Form);

export default ReviewForm;