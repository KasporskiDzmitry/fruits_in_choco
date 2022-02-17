import React from "react";
import style from './CakeConstructor.module.scss';

const CakeViewer = ({cake}) => {
    const cakeWrapperBg = cake.biscuit === 'Vanilla' ? style.vanillaBg : style.chocoBg

    return <div>
        {/*<div>{cake.biscuit}</div>*/}
        <div className={`${style.cakeWrapper} ${cakeWrapperBg}`}>
            {cake.decorations && cake.decorations.map(i => i.name).includes("ягоды") && <div className={style.decoration}></div>}
        </div>
    </div>
};

export default CakeViewer;