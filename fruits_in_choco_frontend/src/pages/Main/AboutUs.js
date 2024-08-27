import React, { useEffect } from 'react';
import appStyle from '../../App.module.scss';
import style from './Main.module.scss';
import aboutImage from '../../assets/images/about.png';
import logo from '../../assets/images/logo.png';
import arrowBackward from '../../assets/images/Arrows/ArrowBackward.png';
import arrowForward from '../../assets/images/Arrows/ArrowForward.png';

export const AboutUs = () => {
    const [dimensions, setDimensions] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const handleResize = () => {
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize, false);
    }, []);

    return (
        <div id={'about'} className={`${appStyle.sectionOuter} ${style.aboutSection}`}>
            <div className={`${appStyle.sectionInner}`}>
                <div className={style.heading}>
                    <img src={arrowBackward} alt="Arrow" />
                    <h1>О Нас</h1>
                    <img src={arrowForward} alt="Arrow" />
                </div>
                <div className={style.aboutSectionWrapper}>
                    <div className={style.aboutSectionImageWrapper}>
                        <img src={aboutImage} alt="Наше фото" />
                    </div>
                    <div className={style.aboutSectionDescription}>
                        <h2>MARINA CUPCAKE</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras arcu quam,
                            tristique non commodo vitae, dignissim eu dolor.
                        </p>
                        {dimensions.width > 768 ? (
                            <div className={style.aboutSectionDescriptionLogo}>
                                <img src={logo} alt="MARINA CUPCAKE" />
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    {dimensions.width < 768 ? (
                        <div className={style.aboutSectionDescriptionLogo}>
                            <img src={logo} alt="MARINA CUPCAKE" />
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
};
