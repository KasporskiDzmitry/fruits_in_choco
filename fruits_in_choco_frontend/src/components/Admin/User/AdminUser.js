import React from "react";
import Table from "../../common/Table/Table";

const AdminUser = (props) => {
    const names = {
        id: "ID",
        firstName: 'Имя',
        lastName: 'Фамилия',
        status: "Статус",
        role: "Роль",
        email: "Email"
    }

    return <div>
        <Table data={props.users} names={names} dataToShow={props.users} setDataToShow={() => {
        }} currentPage={0} setCurrentPage={() => {}}/>
    </div>
}

export default AdminUser;