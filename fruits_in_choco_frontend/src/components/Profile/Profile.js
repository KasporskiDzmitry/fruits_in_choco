import React from "react";
import style from "./Profile.module.scss";
import {Tab, Tabs} from "react-bootstrap";
import {PersonalInfo} from "./PersonalInfo";
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
                </Tabs>
                СТРАНИЦА ПОЛЬЗОВАТЕЛЯ {profile.firstName}
            </div>
        </div>
    )
};

export default Profile;