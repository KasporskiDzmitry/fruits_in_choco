import React, {useEffect} from 'react';
import style from './Shop.module.scss';
import Filter from "./Filter/Filter";
import SortPanel from "./SortPanel/SortPanel";
import Preloader from "../common/Preloader/Preloader";
import ProductCard from "./ProductCard/ProductCard";

const Shop = (props) => {
    return <div className={`sectionOuter ${style.shopSection}`}>
        <div className="sectionInner">
            <div className={style.shopInnerWrapper}>
                <Filter categories={props.categories} loadProductsByTypes={props.loadProductsByTypes}
                        loadProducts={props.loadProducts} selectedCategory={props.selectedCategory}
                        setFilteredTypes={props.setFilteredTypes} filteredTypes={props.filteredTypes}/>
                <div className={style.productsWrapper}>
                    <SortPanel products={props.products} setProducts={props.setProducts}/>
                    {
                        props.isFetching ?
                            <Preloader/> :

                            <div className={style.products}>
                                {
                                    props.products.map(product => <ProductCard key={product.id} history={props.history} product={product} addToCart={props.addToCart} />)
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    </div>
};

export default Shop;