import React from "react";
import style from "./Profile.module.scss";
import {Tabs, Tab} from "react-bootstrap";
import Cart from "../Cart/Cart";
import CartContainer from "../Cart/CartContainer";
import {PersonalInfo} from "./PersonalInfo";
import {OrdersHistory} from "./OrdersHistory";

const Profile = ({profile}) => {
    return (
        <div className={`sectionOuter ${style.shopSection}`}>
            <div className="sectionInner">
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
                        <CartContainer />
                    </Tab>
                </Tabs>
                СТРАНИЦА ПОЛЬЗОВАТЕЛЯ {profile.firstName}
            </div>
        </div>
    )
};

export default Profile;