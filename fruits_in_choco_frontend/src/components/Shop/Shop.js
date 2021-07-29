import React from 'react';
import style from './Shop.module.css';
import {Breadcrumb} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import FilterContainer from "./Filter/FilterContainer";
import ProductCard from "./ProductCard/ProductCard";
import * as qs from "qs";

const Shop = (props) => {
    const pathnames = useLocation().pathname.split('/').filter(x => x);
    pathnames.unshift('');

    const selectedCategoryId = parseInt(qs.parse(useLocation().search, {ignoreQueryPrefix: true}).categoryId);

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
                <FilterContainer products={props.products} selectedCategoryId={selectedCategoryId}
                        filteredTypes={props.filteredTypes} setFilteredTypes={props.setFilteredTypes}
                        categories={props.categories} />
                <div className={style.productsWrapper}>
                    <div className={style.productsPanel}>

                    </div>
                    <div className={style.products}>
                        {
                            props.filteredTypes.length > 0
                                ? props.products.filter(i => props.filteredTypes.includes(i.productType))
                                    .map(card => <ProductCard card={card}/>)
                                : props.products.map(card => <ProductCard card={card}/>)
                        }
                    </div>
                </div>
            </div>
        </div>

    </div>
};

export default Shop;