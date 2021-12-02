import React from "react";
import Table from "../../common/Table/Table";

const AdminProduct = (props) => {
    const names = {
        id: "ID",
        name: "Название",
        price: "Цена",
        type: "Тип",
        category: "Категория"
    }

    const convertData = (data) => {
        return data.map(i => {
            const category = props.categories.find(c => c.id == i.typeId)
            return {
                ...i,
                type: category.types.find(t => t.id == i.typeId).name,
                category: category.name
            }
        })
    }

    return <div>
        <Table data={convertData(props.products)} names={names} dataToShow={convertData(props.data)} setDataToShow={props.setData} currentPage={0} setCurrentPage={props.setCurrentPage}/>
    </div>
}

export default AdminProduct;