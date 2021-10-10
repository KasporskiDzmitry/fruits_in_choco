import React from "react";
import style from "./Profile.module.scss";
import {Tabs, Tab} from "react-bootstrap";

const Profile = ({firstName, lastName, email}) => {
    return (
        <div className={`sectionOuter ${style.shopSection}`}>
            <div className="sectionInner">
                <div className={style.heading}>
                    <h1>Личный кабинет</h1>
                </div>
                <Tabs defaultActiveKey="userInfo" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="userInfo" title="Личная информация">
                        <div>Имя: {firstName}</div>
                        <div>Фамилия: {lastName}</div>
                        <div>email: {email}</div>
                    </Tab>
                    <Tab eventKey="orders" title="История заказов">
                        <div className={style.orderInfo}>Заказ</div>
                        <div className={style.orderInfo}>Заказ</div>
                        <div className={style.orderInfo}>Заказ</div>
                        <div className={style.orderInfo}>Заказ</div>
                    </Tab>
                </Tabs>
                СТРАНИЦА ПОЛЬЗОВАТЕЛЯ {firstName}
            </div>
        </div>
    )
};

export default Profile;