import React, {useEffect} from 'react';
import style from './Shop.module.scss';
import Filter from "./Filter/Filter";
import SortPanel from "./SortPanel/SortPanel";
import Preloader from "../common/Preloader/Preloader";
import ProductCard from "./ProductCard/ProductCard";
import appStyle from '../../App.module.scss';
import {Breadcrumb} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loadProductsByCategories} from "../../redux/thunks/product_thunks";
import {routes} from "../utils/routes";

const Shop = () => {
    const {pathname, state} = useLocation();
    const dispatch = useDispatch();
    const path = pathname.split('/');
    const categoryId = state?.categoryId || 1;
    const products = useSelector(state => state.productReducer.products);
    const isProductsFetching = useSelector(state => state.productReducer.isProductsFetching);
    const filteredProducts = useSelector(state => state.filterReducer.products);
    const categories = useSelector(state => state.categoryReducer.categories);

    useEffect(() => {
        dispatch(loadProductsByCategories([categoryId]));
    }, [])

    return <div className={`${appStyle.sectionOuter} ${style.shopSection}`}>
        {
            products.length > 0 ? <div className={`${appStyle.sectionInner}`}>
                    <div>
                        <Breadcrumb>
                            {
                                path.map((i, idx) => {
                                    const route = routes.find(j => j.path.match('/' + i));
                                    return <Breadcrumb.Item active={idx === path.length - 1}
                                                            href={route.path}>{route.name}</Breadcrumb.Item>
                                })
                            }
                        </Breadcrumb>
                    </div>
                    <div className={style.shopInnerWrapper}>
                        <Filter categories={categories} categoryId={categoryId} filteredProducts={filteredProducts} products={products}/>
                        <div className={style.productsWrapper}>
                            <SortPanel products={products} categoryId={categoryId}/>
                            {
                                isProductsFetching ?
                                    <Preloader/> :

                                    <div className={style.products}>
                                        {
                                            filteredProducts.map(product => <ProductCard key={product.id} product={product}/>)
                                        }
                                    </div>
                            }
                        </div>
                    </div>
                </div> :
                <Preloader/>
        }
    </div>
};

export default Shop;