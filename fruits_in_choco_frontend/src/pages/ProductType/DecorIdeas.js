import React, { useState } from 'react';
import appStyle from '../../App.module.scss';
import style from '../Main/Main.module.scss';
import productStyle from './ProductType.module.scss';

import arrowBackward from '../../assets/images/Arrows/ArrowBackward.png';
import arrowForward from '../../assets/images/Arrows/ArrowForward.png';
import writeToInstagram from '../../assets/images/HowToOrder/writeToInstagram.png';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../redux/actions/modalWindow_actions';
import { ModalWindow } from '../../components/ModalWindow/ModalWindow';
import { DecorIdeaCard } from './DecorIdeaCard';

export const DecorIdeas = ({ setOfDecorIdeas }) => {
    const [chosenImage, setChosenImage] = useState();
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state) => state.modalReducer.isModalOpen);

    const extendImageHandleClick = (id) => {
        dispatch(openModal());
        setChosenImage(setOfDecorIdeas.find((elem) => elem.id === id).imageURL);
        console.log(chosenImage);
    };

    return (
        <div className={`${appStyle.sectionInner}`}>
            {isModalOpen && <ModalWindow images={chosenImage} />}

            <div className={style.heading}>
                <img src={arrowBackward} alt="Arrow" />
                <h1>Идеи декора</h1>
                <img src={arrowForward} alt="Arrow" />
            </div>
            <div className={productStyle.decorIdeas}>
                {setOfDecorIdeas.map((elem) => (
                    <DecorIdeaCard
                        key={elem.id}
                        decorIdea={elem}
                        onClick={extendImageHandleClick}
                    />
                ))}
            </div>
            <div className={productStyle.moreDecorIdeas}>
                <div>
                    <p>Ищи больше оригинальных идей в моем инстаграм</p>
                </div>
                <div>
                    <img src={writeToInstagram} alt="instagram" />
                </div>
            </div>
        </div>
    );
};
