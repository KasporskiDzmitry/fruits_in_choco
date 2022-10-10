import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import Preloader from "../../common/Preloader/Preloader";
import Profile from "../../Profile/Profile";
import {loadUserById} from "../../../redux/thunks/user_thunks";

const UserInfo = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.userReducer.user);

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