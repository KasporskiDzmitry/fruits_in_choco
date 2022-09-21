import React from "react";
import ProductTable from "./common/ProductTable";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

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
        <div>
            <Link to={'/profile/admin/add_product'}>
                <Button>Добавить продукт</Button>
            </Link>
        </div>
        <div>
            <ProductTable data={convertData(products)}/>
        </div>
    </div>
}

export default Products;