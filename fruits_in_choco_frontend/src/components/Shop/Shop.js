import React, {useState} from 'react';
import style from './Shop.module.css';
import {Breadcrumb} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import {Form} from "react-bootstrap";
import ProductCard from "./ProductCard/ProductCard";
import * as qs from "qs";
import Filter from "./Filter/Filter";
import ProductsList from "./ProductsList/ProductsList";
import SortPanel from "./SortPanel/SortPanel";

const Shop = (props) => {
    const [sortBy, setSortBy] = useState('price');
    const [isAscSort, setIsAscSort] = useState(true);

    const pathnames = useLocation().pathname.split('/').filter(x => x);
    pathnames.unshift('');

    return <div className={`sectionOuter ${style.shopSection}`}>
        <div className="sectionInner">
            <Breadcrumb className={style.breadCrumbs}>
                {
                    pathnames.map((name = `/${name}`, index) => {
                        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;

                        const isLast = index === pathnames.length - 1;
                        const nameForLink = props.pathnames.filter(i => i.path === `/${name}`)[0];

                        return isLast ?
                            <Breadcrumb.Item href={routeTo} active>{nameForLink.name}</Breadcrumb.Item>
                            :
                            <Breadcrumb.Item href={routeTo}>{nameForLink.name}</Breadcrumb.Item>
                    })
                }
            </Breadcrumb>
            <div className={style.shopInnerWrapper}>
                <Filter categories={props.categories} loadProductsByTypes={props.loadProductsByTypes} loadProducts={props.loadProducts}/>
                <div className={style.productsWrapper}>
                    <SortPanel isAscSort={props.isAscSort} setSortBy={props.setSortBy}
                               setIsAscSort={props.setIsAscSort}/>
                    <ProductsList products={props.products} sortBy={props.sortBy} isAscSort={props.isAscSort}/>
                </div>
            </div>
        </div>

    </div>
};

export default Shop;