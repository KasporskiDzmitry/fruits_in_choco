import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadUserById} from "../../../redux/thunks/admin_thunks";
import {useHistory} from "react-router-dom";
import Preloader from "../../common/Preloader/Preloader";

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
                <div>
                    <div>{user.email}</div>
                    <div>{user.firstName}</div>
                    <div>{user.lastName}</div>
                    <div>{user.role}</div>
                    <div>{user.status}</div>
                    <div>{user.cart?.price}</div>
                    {/*<div>{user.orders}</div>*/}
                    {/*<div>{user.ratings}</div>*/}
                </div>
                :
                <Preloader/>
        }
    </div>
}

export default UserInfo;