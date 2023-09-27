import React, {useEffect, useState} from 'react';
import style from './Main.module.scss';
import Slider from "./Slider/Slider";
import CategoryCard from "./CategoryCard";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import appStyle from '../../App.module.scss';
import {scrollToTarget} from "../utils/routes";
import aboutImage from "../../assets/images/about.png";
import logo from "../../assets/images/logo.png";
import instagramIcon from "../../assets/images/instagram_icon.png";
import tiktokIcon from "../../assets/images/tiktok_icon.png";
import cakeIcon from "../../assets/images/cake.png"
import deliveryIcon from "../../assets/images/delivery.png"

const Main = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categoryCards = useSelector(state => state.categoryReducer.categories);
    const [dimensions, setDimensions] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const selectCategory = (id) => {
        navigate(`/shop`, {state: {categoryId: id}})
    };

    const handleResize = () => {
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }

    useEffect(() => {
        const anchor = window.location.hash.split("#")[1];
        if (anchor) {
            scrollToTarget(anchor)
        }
    }, []);

    useEffect(() => {
        window.addEventListener("resize", handleResize, false);
    }, []);


    return <main>
        <Slider/>
        <div id={"production"} className={`${appStyle.sectionOuter} `}>
            <div className={`${appStyle.sectionInner} ${style.ourProductsSection}`}>
                <div className={style.heading}>
                    <h1>Каталог</h1>
                </div>
                <div className={style.categoriesContainer}>
                    {
                        categoryCards.map(i => <CategoryCard key={i.id} category={i} selectCategory={() => selectCategory(i.id)}/>)
                    }
                </div>
            </div>
        </div>
        <div id={"about"} className={`${appStyle.sectionOuter} ${style.aboutSection}`}>
            <div className={`${appStyle.sectionInner}`}>
                <div className={style.heading}>
                    <h1>О Нас</h1>
                </div>
                <div className={style.aboutSectionWrapper}>
                    <div className={style.aboutSectionImageWrapper}>
                        <img src={aboutImage} alt="Наше фото"/>
                    </div>
                    <div className={style.aboutSectionDescription}>
                        <h2>MARINA CUPCAKE</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras arcu quam, tristique non
                            commodo vitae, dignissim eu dolor. Vestibulum ante ipsum primis in faucibus orci luctus et
                            ultrices posuere cubilia curae; Aliquam finibus ultricies ex, sed tristique nisi laoreet eu.
                            Suspendisse volutpat massa ex, non sagittis tortor imperdiet non.
                        </p>
                        {
                            dimensions.width > 768 ?
                            <div className={style.aboutSectionDescriptionLogo}>
                                <img src={logo} alt="MARINA CUPCAKE"/>
                            </div> : <></>
                        }
                    </div>
                    {
                        dimensions.width < 768 ?
                        <div className={style.aboutSectionDescriptionLogo}>
                            <img src={logo} alt="MARINA CUPCAKE"/>
                        </div> : <></>
                    }
                </div>
            </div>
        </div>
        <div id={"social_networks"} className={`${appStyle.sectionOuter} ${style.socialNetworks}`}>
            <div className={`${appStyle.sectionInner} ${style.socialNetworksWrapper}`}>
                <p>Подписывайтесь на нас в социальных сетях чтобы всегда быть в курсе новинок, акций и розыгрышей</p>
                <div className={style.socialNetworksItemsWrapper}>
                    <div className={style.socialNetworksItem}>
                        <img src={instagramIcon} alt="Ссылка на инстаграм"/> {/* сделать ссылки */}
                    </div>
                    <div className={style.socialNetworksItem}>
                        <img src={tiktokIcon} alt="Ссылка на тикток"/>
                    </div>
                </div>
            </div>
        </div>
        <div id={"advantages"} className={`${appStyle.sectionOuter} ${style.advantagesSection}`}>
            <div className={`${appStyle.sectionInner} ${style.advantagesSectionWrapper}`}>
                <div className={style.advantagesItem}>
                    <div className={style.advantagesItemImageWrapper}>
                        <img src={cakeIcon} alt="Торт"/>
                    </div>
                    <div className={style.advantagesItemText}>Индивидуальный дизайн</div>
                </div>
                <div className={style.advantagesItem}>
                    <div className={style.advantagesItemImageWrapper}>
                        <img src={deliveryIcon} alt="Доставка"/>
                    </div>
                    <div className={style.advantagesItemText}>Бесплатная доставка по Дзержинску</div>
                </div>
                <div className={style.advantagesItem}>
                    <div className={style.advantagesItemImageWrapper}>
                        <img src={""} alt="Что-то еще"/>
                    </div>
                    <div className={style.advantagesItemText}>Что-то еще</div>
                </div>
            </div>
        </div>
    </main>
};

export default Main;