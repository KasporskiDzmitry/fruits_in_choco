import React from 'react';
import productStyle from "./ProductType.module.scss";
import chooseTaste from "../../assets/images/HowToOrder/chooseTaste.png";

export const DecorIdeaCard = ({decorIdea, onClick}) => {
    return (
        <div className={productStyle.decorItem}>
            <img
                src={decorIdea.imageURL}
                alt="chooseTaste"
                onClick={() => onClick(decorIdea.id)}
            />
            {/*<p>Выбери бисквит и начинку</p>*/}
        </div>
    );
};