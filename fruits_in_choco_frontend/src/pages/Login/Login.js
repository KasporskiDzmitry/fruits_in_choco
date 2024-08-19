import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../../components/common/FormsControls/FormsControls';
import { required } from '../../util/validators/validators';
import style from '../../components/common/FormsControls/FormsControls.module.scss';
import { login } from '../../redux/thunks/auth_thunks';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

const LoginForm = ({ handleSubmit, error }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field
                    placeholder={'Email'}
                    name={'email'}
                    component={Input}
                    validate={[required]}
                />
            </div>
            <div>
                <Field
                    placeholder={'Password'}
                    name={'password'}
                    component={Input}
                    validate={[required]}
                    type={'password'}
                />
            </div>
            {error && <div className={style.formSummaryError}>{error}</div>}
            <div>
                <Button type="submit">Login</Button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {
    const dispatch = useDispatch();
    const onSubmit = (formData) => {
        dispatch(login(formData.email, formData.password));
    };

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    );
};

export default Login;
