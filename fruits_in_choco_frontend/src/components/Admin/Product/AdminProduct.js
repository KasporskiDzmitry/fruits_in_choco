import React, {useEffect} from "react";
import ProductTable from "./ProductTable";

const AdminProduct = (props) => {
    const convertData = (data) => {
        if (data.length > 0) {
            return data.map(i => {
                const category = props.categories.find(c => c.id === i.typeId)
                return {
                    ...i,
                    type: category.types.length < 0 ? 'N/A' : category.types.find(t => t.id == i.typeId).name,
                    category: category.name
                }
            })
        } else {
            return data;
        }
    }

    return <div>
        <ProductTable data={convertData(props.products)}/>
    </div>
}

export default AdminProduct;