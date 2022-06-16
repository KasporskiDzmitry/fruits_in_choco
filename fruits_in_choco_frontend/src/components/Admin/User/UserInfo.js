import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadUserById} from "../../../redux/thunks/admin_thunks";
import {useHistory} from "react-router-dom";
import Preloader from "../../common/Preloader/Preloader";
import {Tab, Tabs} from "react-bootstrap";
import {PersonalInfo} from "../../Profile/PersonalInfo";
import {OrdersHistory} from "../../Profile/OrdersHistory";
import CartContainer from "../../Cart/CartContainer";
import Profile from "../../Profile/Profile";

const UserInfo = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.adminReducer.user);

    useEffect(() => {
        dispatch(loadUserById(history.location.pathname.split('/').pop()));
    }, [])

    return <div>
        {
            user ?
                <Profile profile={user}/>
                :
                <Preloader/>
        }
    </div>
}

export default UserInfo;