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
        <Table data={props.users} names={names} dataToShow={props.data} setDataToShow={props.setData} currentPage={0} setCurrentPage={props.setCurrentPage}/>
    </div>
}

export default AdminUser;