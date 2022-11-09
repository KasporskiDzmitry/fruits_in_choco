import React, {useEffect} from "react";
import UserTable from "./UsersTable";
import {useDispatch, useSelector} from "react-redux";
import {loadUsers} from "../../../redux/thunks/user_thunks";

const Users = (props) => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.userReducer.users);

    useEffect(() => {
        dispatch(loadUsers());
    }, [])

    return <div>
        <UserTable data={users} />
    </div>
}

export default Users;