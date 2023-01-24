import React from 'react';
import style from "./Contacts.module.scss";
import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../common/FormsControls/FormsControls";
import {required} from "../utils/validators/validators";
import {Button} from "react-bootstrap";

const EmailSenderForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={'Name'} name={'name'} component={Input} validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Phone'} name={'phone'} component={Input} validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Message'} name={'message'} component={Textarea} validate={[required]}/>
            </div>
            {error && <div className={style.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <Button type="submit">Send</Button>
            </div>
        </form>
    )
};

const EmailSenderReduxForm = reduxForm({form: 'emailSender'})(EmailSenderForm); //TODO: emailJS do we need it?

const Contacts = (props) => {

    const onSubmit = formData => {
        console.log(formData)
    }

    return <div className={style.content}>
        <div className={style.emailSenderWrapper}>
            <EmailSenderReduxForm onSubmit={onSubmit}/>
        </div>


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