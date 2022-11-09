import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import Preloader from "../../common/Preloader/Preloader";
import Profile from "../../Profile/Profile";
import {loadUserById} from "../../../redux/thunks/user_thunks";

const UserInfo = (props) => {
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    const user = useSelector(state => state.userReducer.user);

    useEffect(() => {
        dispatch(loadUserById(pathname.split('/').pop()));
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