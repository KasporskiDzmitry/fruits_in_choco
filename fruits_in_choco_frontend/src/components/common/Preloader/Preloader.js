import React from 'react';
import preloader from '../../../assets/images/preloader.png';
import style from './Preloader.module.scss';

const Preloader = () => {
    return (
        <div className={style.loader}>
            <img src={preloader} alt={'loading'} />
        </div>
    );
};

export default Preloader;
