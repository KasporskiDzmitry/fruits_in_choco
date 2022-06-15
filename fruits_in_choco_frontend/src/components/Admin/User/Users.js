import React from "react";
import UserTable from "./UsersTable";

const Users = (props) => {
    return <div>
        <UserTable data={props.users} />
    </div>
}

export default Users;