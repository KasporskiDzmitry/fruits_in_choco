import React, {useState} from 'react';
import style from './Shop.module.css';
import {Breadcrumb} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import ProductCard from "./ProductCard/ProductCard";
import Filter from "./Filter/Filter";
import SortPanel from "./SortPanel/SortPanel";

const Shop = (props) => {
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
                <Filter categories={props.categories} loadProductsByTypes={props.loadProductsByTypes}
                        loadProducts={props.loadProducts}/>
                <div className={style.productsWrapper}>
                    <SortPanel products={props.products} setProducts={props.setProducts}/>
                    <div className={style.products}>
                        {
                            props.products.map(i => <ProductCard card={i}/>)
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
};

export default Shop;