import React from 'react';
import style from './Shop.module.css';
import {Breadcrumb} from "react-bootstrap";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import FruitsInChocolateContainer from "./FruitsInChocolate/FruitsInChocolateContainer";
import BakeryContainer from "./Bakery/BakeryContainer";
import BouquetsContainer from "./Bouquets/BouquetsContainer";
import FitnessBakery from "./Bakery/FitnessBakery";
import FilterContainer from "./Filter/FilterContainer";
import Filter from "./Filter/Filter";
import ProductCard from "./ProductCard/ProductCard";

const Shop = (props) => {
    const pathnames = props.location.pathname.split('/').filter(x => x);

    return <div className={`sectionOuter ${style.shopSection}`}>
        <div className="sectionInner">
            <Breadcrumb className={style.breadCrumbs}>
                {
                    pathnames.map((name, index) => {
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
                <Filter products={props.products} selectedCategoryId={props.selectedCategory}
                        filteredTypes={props.filteredTypes} setFilteredTypes={props.setFilteredTypes}
                        categories={props.categories}/>
                <div className={style.productsWrapper}>
                    <div className={style.productsPanel}>

                    </div>
                    <div className={style.products}>
                        {
                            props.products.filter(i => i.category.id === props.selectedCategory)
                                .map(card => <ProductCard card={card}/>)
                        }
                    </div>

                    {/*<Switch>*/}
                    {/*    <Route exact path='/shop/fruits_in_chocolate' render={() => <FruitsInChocolateContainer/>}/>*/}
                    {/*    <Route exact path='/shop/bakery' render={() => <BakeryContainer/>}/>*/}
                    {/*    <Route exact path='/shop/bakery/fitness_bakery' render={() => <FitnessBakery/>}/>*/}
                    {/*    <Route exact path='/shop/bouquets' render={() => <BouquetsContainer/>}/>*/}
                    {/*</Switch>*/}
                </div>
            </div>
        </div>

    </div>
};

export default Shop;