import React, {useState} from 'react';
import style from "../Shop.module.css";
import ProductCard from "../ProductCard/ProductCard";

const ProductsList = ({products, sortBy, isAscSort}) => {
    return <div className={style.products}>
        {
            isAscSort ?
                products.sort((a, b) => {
                    if (a[sortBy] > b[sortBy]) {
                        return 1;
                    }
                    if (a[sortBy] < b[sortBy]) {
                        return -1;
                    }
                    return 0;
                }).map(i => <ProductCard card={i}/>)
                :
                products.sort((a, b) => {
                    if (a[sortBy] > b[sortBy]) {
                        return 1;
                    }
                    if (a[sortBy] < b[sortBy]) {
                        return -1;
                    }
                    return 0;
                }).map(i => <ProductCard card={i}/>).reverse()
        }
    </div>
}

export default ProductsList;