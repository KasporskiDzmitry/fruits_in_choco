import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from '../common/FormsControls/FormsControls';
import {required} from "../utils/validators/validators";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import style from '../common/FormsControls/FormsControls.module.css';
import {compose} from "redux";
import {registration} from "../../redux/registration-reducer";

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
            {error && <div className={style.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <button>Register</button>
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
    }

    return <div>
        <h1>Registration</h1>
        <RegistrationReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = state => {
    return {
    }
}

export default compose(
    connect(mapStateToProps, {registration}),
    withRouter
)(Registration);
