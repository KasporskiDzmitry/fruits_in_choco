import React from "react";
import style from "./Profile.module.scss";
import {Tab, Tabs} from "react-bootstrap";
import Cart from "../Cart/Cart";
import {PersonalInfo} from "./PersonalInfo";
import {OrdersHistory} from "./OrdersHistory";
import ReviewsInfo from "./ReviewsInfo";
import appStyle from '../../App.module.scss';

const Profile = ({profile}) => {
    return (
        <div className={`${appStyle.sectionOuter} ${style.shopSection}`}>
            <div className={`${appStyle.sectionInner}`}>
                <div className={style.heading}>
                    <h1>Личный кабинет</h1>
                </div>
                <Tabs defaultActiveKey="userInfo" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="userInfo" title="Личная информация">
                        <PersonalInfo profile={profile} />
                    </Tab>
                    <Tab eventKey="orders" title="История заказов">
                        <OrdersHistory orders={profile.orders}/>
                    </Tab>
                    <Tab eventKey="cart" title="Корзина заказов">
                        <Cart />
                    </Tab>
                    <Tab eventKey="reviews" title="Отзывы">
                        <ReviewsInfo reviews={profile.ratings}/>
                    </Tab>
                </Tabs>
                СТРАНИЦА ПОЛЬЗОВАТЕЛЯ {profile.firstName}
            </div>
        </div>
    )
};

export default Profile;