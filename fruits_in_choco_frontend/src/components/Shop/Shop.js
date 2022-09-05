import React, {useEffect} from 'react';
import style from './Shop.module.scss';
import Filter from "./Filter/Filter";
import SortPanel from "./SortPanel/SortPanel";
import Preloader from "../common/Preloader/Preloader";
import ProductCard from "./ProductCard/ProductCard";
import appStyle from '../../App.module.scss';

const Shop = (props) => {
    return <div className={`${appStyle.sectionOuter} ${style.shopSection}`}>
        <div className={`${appStyle.sectionInner}`}>
            <div className={style.shopInnerWrapper}>
                <Filter categories={props.categories} loadProductsByCategories={props.loadProductsByCategories}
                        loadProducts={props.loadProducts} selectedCategory={props.selectedCategory}
                        setFilteredCategories={props.setFilteredCategories} filteredCategories={props.filteredCategories}/>
                <div className={style.productsWrapper}>
                    <SortPanel products={props.products} setProducts={props.setProducts}/>
                    {
                        props.isProductsFetching ?
                            <Preloader/> :

                            <div className={style.products}>
                                {
                                    props.products.map(product => <ProductCard key={product.id} history={props.history} product={product} saveProductToCart={props.saveProductToCart} />)
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    </div>
};

export default Shop;