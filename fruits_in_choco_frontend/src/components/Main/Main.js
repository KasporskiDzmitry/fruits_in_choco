import React, {useEffect} from 'react';
import style from './Main.module.scss';
import Slider from "./Slider/Slider";
import {CardGroup} from "react-bootstrap";
import CategoryCard from "./CategoryCard";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import appStyle from '../../App.module.scss';
import {scrollToTarget} from "../utils/routes";

const Main = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categoryCards = useSelector(state => state.categoryReducer.categories);

    const selectCategory = (id) => {
        navigate(`/shop`, {state: {categoryId: id}})
    };

    useEffect(() => {
        const anchor = window.location.hash.split("#")[1];
        if (anchor) {
            scrollToTarget(anchor)
        }
    }, []);

    return <div className={style.main}>
        <Slider/>
        <div id={"production"} className={`${appStyle.sectionOuter} ${style.ourProductsSection}`}>
            <div className={`${appStyle.sectionInner}`}>
                <div className={style.heading}>
                    <h1>Что мы делаем</h1>
                </div>
                <CardGroup className={style.categoriesContainer}>
                    {
                        categoryCards.map(i => <CategoryCard key={i.id} category={i} selectCategory={() => selectCategory(i.id)}/>)
                    }
                </CardGroup>
            </div>
        </div>
        <div id={"about"} className={`${appStyle.sectionOuter} ${style.aboutSection}`}>
            <div className={`${appStyle.sectionInner}`}>
                <div className={style.heading}>
                    <h1>Кто мы</h1>
                </div>
                <div className={style.aboutSectionWrapper}>
                    <div className={style.aboutSectionImageWrapper}>
                        <img src="https://www.povarenok.ru/data/cache/2021feb/17/12/2833978_74029.jpg" alt="Наше фото"/>
                    </div>
                    <div className={style.aboutSectionDescription}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras arcu quam, tristique non
                            commodo vitae, dignissim eu dolor. Vestibulum ante ipsum primis in faucibus orci luctus et
                            ultrices posuere cubilia curae; Aliquam finibus ultricies ex, sed tristique nisi laoreet eu.
                            Suspendisse volutpat massa ex, non sagittis tortor imperdiet non. Pellentesque arcu tortor,
                            laoreet et nunc quis, egestas scelerisque dolor. Nulla tempor lacus molestie augue porta,
                            sed consectetur enim laoreet. Duis eu tellus sit amet nisi pulvinar hendrerit. Nullam nec
                            luctus mauris. Nullam nec posuere leo, et hendrerit diam. Integer mollis dolor quis nibh
                            molestie, in rhoncus arcu pharetra. In a sodales nisi, pharetra cursus urna. In hac
                            habitasse platea dictumst. Nam justo nisl, iaculis ac mi sollicitudin, dignissim interdum
                            nulla.
                        </p>
                        <p>
                            Duis quis luctus felis, quis efficitur mauris. Sed eu lorem id diam tempus volutpat vel sit
                            amet ipsum. Morbi aliquam fermentum mauris, commodo mollis mauris convallis nec. Vestibulum
                            viverra tellus nec felis commodo fringilla. Morbi sed lectus nisl. Morbi at mattis nibh, sit
                            amet convallis erat. Vivamus ex eros, aliquam ornare eleifend a, feugiat eget enim. Sed
                            finibus imperdiet ultricies. Sed sapien leo, feugiat ultrices porttitor efficitur, rutrum
                            non augue. Donec non ante tellus. Phasellus pulvinar turpis eget malesuada molestie.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div id={"contacts"} className={`${appStyle.sectionOuter} ${style.aboutSection}`}>
            <div className={`${appStyle.sectionInner}`}>
                <div className={style.heading}>
                    <h1>Контакты</h1>
                </div>
                <div>
                    Телефон
                </div>
            </div>
        </div>

    </div>
};

export default Main;