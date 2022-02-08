import React from "react";

const Reviews = (props) => {

    const reviews = props.row.ratings;
    const approvedReviews = reviews.filter(i => i.approved);

    return <div>
        <div>{approvedReviews.length}</div>
        {
            approvedReviews.length !== reviews.length &&
            <div>+{reviews.length - approvedReviews.length}</div>
        }
    </div>
}

export default Reviews;