import React from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/actions/modalWindow_actions';
import modalStyle from './ModalWindow.module.scss';

import crossClose from '../../assets/images/crossClose.png';
import Slider from '../../pages/Main/Slider/Slider';

export const ModalWindow = ({ images }) => {
    const dispatch = useDispatch();

    const closeModalWindow = () => {
        dispatch(closeModal());
    };

    return createPortal(
        <div className={modalStyle.modalBackground} onClick={closeModalWindow}>
            <div
                className={modalStyle.modalWindow}
                onClick={(event) => event.stopPropagation()}
            >
                <img src={crossClose} alt="cross" onClick={closeModalWindow} />
                <img src={images} alt="images"/>
                {/*<Slider slides={images} />*/}
            </div>
        </div>,
        document.querySelector('#modal')
    );
};
