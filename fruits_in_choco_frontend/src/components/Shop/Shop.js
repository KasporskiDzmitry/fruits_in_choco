import React, {useState} from 'react';
import style from './Shop.module.scss';
import {Breadcrumb} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import ProductCard from "./ProductCard/ProductCard";
import Filter from "./Filter/Filter";
import SortPanel from "./SortPanel/SortPanel";
import Preloader from "../common/Preloader/Preloader";

const Shop = (props) => {
    const pathnames = useLocation().pathname.split('/').filter(x => x);
    pathnames.unshift('');

    return <div className={`sectionOuter ${style.shopSection}`}>
        <div className="sectionInner">
            <div className={style.shopInnerWrapper}>
                <Filter categories={props.categories} loadProductsByTypes={props.loadProductsByTypes}
                        loadProducts={props.loadProducts} selectedCategory={props.selectedCategory} setFilteredTypes={props.setFilteredTypes} filteredTypes={props.filteredTypes}/>
                <div className={style.productsWrapper}>
                    <SortPanel products={props.products} setProducts={props.setProducts}/>
                    {
                        props.isFetching ?
                            <Preloader/> :
                            <div className={style.products}>
                                {
                                    props.products.map(i => <ProductCard card={i}/>)
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    </div>
};

export default Shop;