import React from "react";
import style from './CakeConstructor.module.scss';

const CakeViewer = ({cake}) => {
    const cakeWrapperBg = cake.biscuit === 'Ванильный' ? style.vanillaBg : style.chocoBg

    return <div className={style.cakeViewerWrapper}>
        <div className={`${style.cakeWrapper} ${cakeWrapperBg}`}>
            {cake.decorations && cake.decorations.map(i => i.name).includes("Ягоды") &&
            <div className={style.decoration}></div>}
        </div>
    </div>
};

export default CakeViewer;