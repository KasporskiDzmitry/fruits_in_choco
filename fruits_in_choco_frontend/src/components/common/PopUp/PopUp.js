import React from 'react';
import style from './PopUp.module.scss';

const PopUp = (props) => {
    const handleClick = (e) => {
        if (e.target === e.currentTarget) {
            props.togglePopUp();
        }
    }

    return <div className={style.bg} onClick={handleClick}>
        {props.children}
    </div>
}

export default PopUp;