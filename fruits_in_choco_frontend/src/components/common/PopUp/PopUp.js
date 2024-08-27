import React from 'react';
import style from './PopUp.module.scss';
import { useDispatch } from 'react-redux';
import { toggleSignInSignUpPopUp } from '../../../redux/actions/app_actions';
import { reset } from 'redux-form';

const PopUp = (props) => {
    const dispatch = useDispatch();

    const handleClick = (e) => {
        if (e.target === e.currentTarget) {
            dispatch(reset('login'));
            dispatch(reset('registration'));
            dispatch(toggleSignInSignUpPopUp());
        }
    };

    return (
        <div
            className={props.isActive ? `${style.bg} ${style.active}` : style.bg}
            onClick={handleClick}
        >
            {props.children}
        </div>
    );
};

export default PopUp;
