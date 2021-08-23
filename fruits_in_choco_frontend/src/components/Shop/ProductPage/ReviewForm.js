import React from "react";
import style from './ReviewForm.module.css'

const ReviewForm = ({handleChange, handleSubmit, value}) => {
    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                Оставьте отзыв о товаре
                <div>
                    <textarea required name="reviewForm" id="" cols="70" rows="8" onChange={(e) => handleChange(e.target.value)} value={value}></textarea>
                </div>
                <div className={style.btnWrapper}>
                    <button>Send</button>
                </div>
            </form>
        </div>

    )
};

export default ReviewForm;