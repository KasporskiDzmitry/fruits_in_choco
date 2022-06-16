import React from "react";
import {NavLink} from "react-router-dom";

const ReviewsInfo = ({reviews}) => {
    return <div>
        {
            reviews && reviews.reverse().map(i => <div>
                <div>{i.date}</div>
                <div>{i.message}</div>
                <div>
                    <NavLink to={`/products/${i.product.id}`}>
                        <img width='50px' src={i.product.imageURL} alt=""/>
                    </NavLink>
                </div>
            </div>)
        }
    </div>
};

export default ReviewsInfo;