import React from 'react';
import style from './Shop.module.scss';
import {useLocation} from "react-router-dom";
import Filter from "./Filter/Filter";
import SortPanel from "./SortPanel/SortPanel";
import Preloader from "../common/Preloader/Preloader";
import {Card} from "../common/Card/Card";

const Shop = (props) => {
    const pathnames = useLocation().pathname.split('/').filter(x => x);
    pathnames.unshift('');

    const selectProduct = (e, productId) => {
        e.preventDefault();
        props.history.push({pathname: `/product/${productId}`, state: {id: productId}})
    };

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
                                    props.products.map(i => <Card id={i.id} name={i.name} description={null} className={style.card}
                                                                  imageURL={'https://alimero.ru/img/rsz/scl/400/%2Fuploads%2Fimages%2F00%2F00%2F01%2F2018%2F08%2F07%2F4db3d9.jpeg'} key={i.id} onClick={(e) => selectProduct(e, i.id)}/>)
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    </div>
};

export default Shop;