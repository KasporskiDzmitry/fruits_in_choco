import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from '../common/FormsControls/FormsControls';
import {required, validateEmail} from "../utils/validators/validators";
import style from '../common/FormsControls/FormsControls.module.scss';
import {registration} from "../../redux/thunks/registration_thunks";
import {Button} from 'react-bootstrap';
import {useDispatch} from "react-redux";

const RegistrationForm = ({handleSubmit, error, isFetching}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={'First Name'} name={'firstName'} component={Input} validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Last Name'} name={'lastName'} component={Input} validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Email'} name={'email'} component={Input} validate={[required, validateEmail]}/>
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
                <Button type={"submit"} disabled={isFetching}>Register</Button>
            </div>
        </form>
    )
};

const RegistrationReduxForm = reduxForm({form: 'registration'})(RegistrationForm);

const Registration = props => {
    const dispatch = useDispatch();
    const onSubmit = formData => {
        const user = {
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName
        };
        dispatch(registration(user));
    };

    return <div>
        <h1>Registration</h1>
        <RegistrationReduxForm onSubmit={onSubmit} isFetching={props.isFetching}/>
    </div>
};

export default Registration;