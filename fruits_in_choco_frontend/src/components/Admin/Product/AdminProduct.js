import React from "react";
import Table from "../../common/Table/Table";

const AdminProduct = (props) => {
    const names = {
        id: "ID",
        name: "Название",
        price: "Цена"
    }

    return <div>
        <Table data={props.products} names={names} dataToShow={props.products} setDataToShow={() => {
        }} currentPage={0} setCurrentPage={() => {}}/>
    </div>
}

export default AdminProduct;