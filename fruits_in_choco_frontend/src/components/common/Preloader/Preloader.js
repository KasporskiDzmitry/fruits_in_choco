import React from 'react';
import preloader from "../../../assets/images/preloader.svg";

const Preloader = (props) => {
    return (
        <div className={preloader}>
            <img src={preloader}/>
        </div>
    )
}

export default Preloader;