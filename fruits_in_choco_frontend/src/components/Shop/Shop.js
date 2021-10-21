import React from 'react';
import style from './Shop.module.scss';
import {NavLink, useLocation} from "react-router-dom";
import Filter from "./Filter/Filter";
import SortPanel from "./SortPanel/SortPanel";
import Preloader from "../common/Preloader/Preloader";
import {Button, CardGroup, Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus, faCheckCircle, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {addProductToCart} from "../../utils/localStorageFunctions";

const Shop = (props) => {
    const pathnames = useLocation().pathname.split('/').filter(x => x);
    pathnames.unshift('');

    const selectProduct = (e, productId) => {
        e.preventDefault();
        props.history.push({pathname: `/product/${productId}`, state: {id: productId}})
    };
    
    const addToCart = (product) => {
        props.addToCart(product);
        addProductToCart(product);
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
                                    props.products.map(product => {
                                        return <Card className={style.cardWrapper} key={product.id}>
                                            <div className={style.cardImageWrapper}>
                                                <Card.Img variant="top"
                                                          src={'https://alimero.ru/img/rsz/scl/400/%2Fuploads%2Fimages%2F00%2F00%2F01%2F2018%2F08%2F07%2F4db3d9.jpeg'}
                                                          onClick={(e) => selectProduct(e, product.id)}/>
                                            </div>
                                            <Card.Body className={style.cardBody}>
                                                <Card.Title className={style.cardTitle}>{product.name}</Card.Title>
                                                <Card.Text className={style.cardDescription}>Short description</Card.Text>
                                            </Card.Body>
                                            <Card.Footer className={style.cardFooter}>
                                                <Card.Title className={style.cardPrice}>{product.price}</Card.Title>
                                                <div className={style.toCartButton}>
                                                    {
                                                        JSON.parse(localStorage.products).find(i => i.id === product.id) ?
                                                            <FontAwesomeIcon className={style.checked} icon={faCheckCircle}/> :
                                                            <FontAwesomeIcon icon={faCartPlus} onClick={() => addToCart(product)}/>
                                                    }
                                                </div>
                                            </Card.Footer>
                                        </Card>
                                    })
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    </div>
};

export default Shop;