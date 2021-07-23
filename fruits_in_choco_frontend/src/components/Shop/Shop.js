import React from 'react';
import style from './Shop.module.css';
import {Breadcrumb} from "react-bootstrap";
import {BrowserRouter, Route} from "react-router-dom";
import FruitsInChocolateContainer from "./FruitsInChocolate/FruitsInChocolateContainer";
import BakeryContainer from "./Bakery/BakeryContainer";
import BouquetsContainer from "./Bouquets/BouquetsContainer";
import FitnessBakery from "./Bakery/FitnessBakery";

const Shop = (props) => {

    const pathnames = props.location.pathname.split('/').filter(x => x);


    return <div className={`sectionOuter ${style.shopSection}`}>
        <div className="sectionInner">
            <Breadcrumb>
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
            <BrowserRouter>
                <Route exact path='/shop/fruits_in_chocolate' render={() => <FruitsInChocolateContainer/>}/>
                <Route exact path='/shop/bakery' render={() => <BakeryContainer/>}/>
                <Route exact path='/shop/bakery/fitness_bakery' render={() => <FitnessBakery/>}/>
                <Route exact path='/shop/bouquets' render={() => <BouquetsContainer/>}/>
            </BrowserRouter>
        </div>

    </div>
};

export default Shop;