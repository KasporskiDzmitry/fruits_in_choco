import React, {useEffect, useState} from 'react'
import {Button} from "react-bootstrap";
import style from './Filter.module.scss';
import {useDispatch} from "react-redux";
import {setFilteredProducts} from "../../../redux/actions/shop_actions";

export const Filter = (props) => {
    const dispatch = useDispatch();

    const [filterParams, setFilterParams] = useState({price: 0, attributes: {}});
    const attributes = props.products[0].attributes;


    useEffect(() => {
        dispatch(setFilteredProducts(props.products.filter(i => {
            const checkAttributes = (product) => {
                let isAttributeInFilterParams = true;
                for (const [key, value] of Object.entries(filterParams.attributes)) {
                    isAttributeInFilterParams &= !!value.includes(product.attributes[key]);
                }
                return isAttributeInFilterParams;
            }

            if (Object.keys(filterParams.attributes).length > 0) {
                return i.price >= filterParams.price && (i.categoryId == props.categoryId) && checkAttributes(i)
            } else {
                return i.price >= filterParams.price && i.categoryId == props.categoryId;
            }
        })))
    }, [filterParams])


    const handlePrice = (e) => {
        setFilterParams({...filterParams, price: e.target.value});
    }

    const handleAttributes = (e) => {
        const attributeName = e.target.name;
        const value = e.target.value;
        const filterParamsAttributes = filterParams.attributes;
        if (Array.isArray(filterParamsAttributes[attributeName])) {
            if (filterParamsAttributes[attributeName].includes(value)) {
                if (filterParamsAttributes[attributeName].length === 1) {
                    const attributesTemp = filterParams.attributes;
                    delete attributesTemp[attributeName];
                    setFilterParams({...filterParams, attributes: attributesTemp})
                } else {
                    setFilterParams({...filterParams, attributes: {...filterParamsAttributes, [attributeName]: filterParamsAttributes[attributeName].filter(i => i !== value)}})
                }
            } else {
                setFilterParams({...filterParams, attributes: {...filterParamsAttributes, [attributeName]: [...filterParamsAttributes[attributeName], value]}})
            }
        } else {
            setFilterParams({...filterParams, attributes: {...filterParamsAttributes, [attributeName]: [value]}})
        }
    }

    const resetFilter = () => {
        setFilterParams({...filterParams, price: 0})
    }


    const getAttributes = () => {
        let attrs = []
        for (let key in attributes) {
            attrs.push(key)
        }
        return attrs;
    }

    return <div className={style.filterWrapper}>
        <div className={style.resetButtonWrapper}>
            <Button onClick={resetFilter}>Сбросить</Button>
        </div>
        <div>
            <input type="range" min={0} max={props.products.map(i => i.price).reduce((p, v) => p > v ? p: v)} value={filterParams.price} onInput={handlePrice}/>
            <h1>Price: {filterParams.price}</h1>
        </div>
        <div>
            {
                getAttributes().map(i => <div>
                    <div>{i}:</div>
                    <div>
                        {[...new Set(props.products.map(p => p.attributes[i]))].map(a => <div>
                            <input type="checkbox" name={i} value={a} id={a} onChange={handleAttributes} />
                            <label for={a}>{a}</label>
                        </div>)}
                    </div>
                </div>)
            }
        </div>
    </div>
};

export default Filter