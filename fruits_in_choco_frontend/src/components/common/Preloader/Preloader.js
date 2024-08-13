import React from 'react';
import preloader from '../../../assets/images/preloader.png';

const Preloader = (props) => {
    return (
        <div className={preloader}>
            <img src={preloader} alt={'loading'} />
        </div>
    );
};

export default Preloader;
