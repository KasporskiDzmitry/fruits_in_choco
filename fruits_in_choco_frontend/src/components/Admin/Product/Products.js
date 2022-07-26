import React from "react";
import ProductTable from "./common/ProductTable";

const Products = ({products, categories}) => {
    const convertData = (data) => {
        if (data.length > 0) {
            return data.map(i => {
                const category = categories.find(c => c.id == i.categoryId)
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
        <ProductTable data={convertData(products)}/>
    </div>
}

export default Products;