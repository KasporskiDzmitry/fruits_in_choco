import React, {useEffect} from "react";
import ProductTable from "./common/ProductTable";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {loadProducts} from "../../../redux/thunks/product_thunks";

const Products = ({categories}) => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.productReducer.products);
    const isProductDeleting = useSelector(state => state.productReducer.isProductDeleting);

    useEffect(() => {
        dispatch(loadProducts());
    }, [])

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
            <ProductTable data={convertData(products)} isProductDeleting={isProductDeleting}/>
        </div>
    </div>
}

export default Products;