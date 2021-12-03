import React from "react";
import UserTable from "./UserTable";

const AdminUser = (props) => {
    return <div>
        <UserTable data={props.users} />
    </div>
}

export default AdminUser;