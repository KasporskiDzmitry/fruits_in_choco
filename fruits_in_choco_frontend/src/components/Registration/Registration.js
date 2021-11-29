import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from '../common/FormsControls/FormsControls';
import {required} from "../utils/validators/validators";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import style from '../common/FormsControls/FormsControls.module.scss';
import {compose} from "redux";
import {registration} from "../../redux/thunks/registration_thunks";
import {togglePopUp} from "../../redux/actions/app_actions";
import {Button} from 'react-bootstrap';

const RegistrationForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={'First Name'} name={'firstName'} component={Input} validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Last Name'} name={'lastName'} component={Input} validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Email'} name={'email'} component={Input} validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} component={Input} validate={[required]}
                       type={'password'}/>
            </div>
            {
                error &&
                <div className={style.formSummaryError}>
                    {error}
                </div>
            }
            <div>
                <Button type={"submit"}>Register</Button>
            </div>
        </form>
    )
};

const RegistrationReduxForm = reduxForm({form: 'registration'})(RegistrationForm);

const Registration = props => {
    const onSubmit = formData => {
        const user = {
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName
        };
        props.registration(user);
    };

    return <div>
        <h1>Registration</h1>
        <RegistrationReduxForm onSubmit={onSubmit}/>
    </div>
};

export default Registration;