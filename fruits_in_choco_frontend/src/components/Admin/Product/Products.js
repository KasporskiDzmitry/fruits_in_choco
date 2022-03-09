import React, {useEffect} from "react";
import ProductTable from "./common/ProductTable";

const Products = (props) => {
    const convertData = (data) => {
        if (data.length > 0) {
            return data.map(i => {
                const category = props.categories.find(c => c.id == i.categoryId)
                return {
                    ...i,
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

export default Products;