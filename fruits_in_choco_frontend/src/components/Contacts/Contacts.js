import React from 'react';
import style from "./Contacts.module.scss";

const Contacts = (props) => {

    return <div className={style.content}>
        <div className={style.contactsWrapper}>
            <div className={''}>Контакты</div>
            <div className={''}>
                <div className={''}>Адрес:</div>
                <div className={''}>Дзержинск, Минская область</div>
            </div>
            <div className={''}>
                <div className={''}>Телефон:</div>
                <div className={''}>+375(29) 878-91-09</div>
            </div>
            <div className={''}>
                <div className={''}>e-mail:</div>
                <div className={''}>marina_anufrieva_96@mail.ru</div>
            </div>
            <div className={''}>
                <div className={''}>Социальные сети:</div>
                <div className={''}>
                    <div className={''}>
                        <i className={''}></i>
                    </div>
                    <div className={''}>
                        <i className={''}></i>
                    </div>
                    <div className={''}>
                        <i className={''}></i>
                    </div>
                </div>
            </div>
        </div>

    </div>
}

export default Contacts;