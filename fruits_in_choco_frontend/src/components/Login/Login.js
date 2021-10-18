import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from '../common/FormsControls/FormsControls';
import {required} from "../utils/validators/validators";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import style from '../common/FormsControls/FormsControls.module.scss';
import {compose} from "redux";
import {login} from "../../redux/thunks/auth_thunks";
import {togglePopUp} from "../../redux/actions/app_actions";
import {Button} from 'react-bootstrap';

const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
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
                <Button type={"submit"}>Login</Button>
            </div>
        </form>
    )
};

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = props => {
    const onSubmit = formData => {
        props.login(formData.email, formData.password);
        props.togglePopUp();
    };

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
};

const mapStateToProps = state => {
    return {
        isAuth: state.authReducer.isAuth
    }
};

export default compose(
    connect(mapStateToProps, {login, togglePopUp}),
    withRouter
)(Login);
