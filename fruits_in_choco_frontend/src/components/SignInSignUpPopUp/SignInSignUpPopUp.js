import React from "react";
import style from './SignInSignUpPopUp.module.scss';
import {Tab, Tabs} from "react-bootstrap";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";

const SignInSignUpPopUp = (props) => {
    return <div className={style.container}>
        <Tabs defaultActiveKey="signIn" id="signInSignUp" className="mb-2">
            <Tab eventKey="signIn" title="Вход">
                <Login login={props.login} togglePopUp={props.togglePopUp} isFetching={props.isLoginFetching}/>
            </Tab>
            <Tab eventKey="signUp" title="Регистрация">
                <Registration registration={props.registration} togglePopUp={props.togglePopUp} isFetching={props.isRegisterFetching}/>
            </Tab>
        </Tabs>
    </div>
}

export default SignInSignUpPopUp;