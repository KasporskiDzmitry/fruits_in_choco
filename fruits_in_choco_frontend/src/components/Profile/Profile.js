import React from "react";
import style from "./Profile.module.scss";
import {Tabs, Tab} from "react-bootstrap";

const Profile = ({profile}) => {
    return (
        <div className={`sectionOuter ${style.shopSection}`}>
            <div className="sectionInner">
                <div className={style.heading}>
                    <h1>Личный кабинет</h1>
                </div>
                <Tabs defaultActiveKey="userInfo" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="userInfo" title="Личная информация">
                        <div>Имя: {profile.firstName}</div>
                        <div>Фамилия: {profile.lastName}</div>
                        <div>email: {profile.email}</div>
                    </Tab>
                    <Tab eventKey="orders" title="История заказов">
                        <div className={style.orderInfo}>Заказ</div>
                        <div className={style.orderInfo}>Заказ</div>
                        <div className={style.orderInfo}>Заказ</div>
                        <div className={style.orderInfo}>Заказ</div>
                    </Tab>
                </Tabs>
                СТРАНИЦА ПОЛЬЗОВАТЕЛЯ {profile.firstName}
            </div>
        </div>
    )
};

export default Profile;