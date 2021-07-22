import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from '../common/FormsControls/FormsControls';
import {required} from "../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import style from '../common/FormsControls/FormsControls.module.css';

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
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = props => {
    const onSubmit = formData => {
        props.login(formData.email, formData.password);
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = state => {
    return {
        isAuth: state.authReducer.isAuth
    }
}

export default connect(mapStateToProps, {login})(Login);