import React, {useEffect, useRef, useState} from 'react'
import {Accordion, Button} from "react-bootstrap";
import style from './Filter.module.scss';
import {useLocation} from 'react-router-dom'

export const Filter = (props) => {
    const initialRender = useRef(true);
    const categoryId = useLocation().state?.categoryId;

    const [filterParams, setFilterParams] = useState([]);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            if (filterParams.length === 0) {
                props.loadProducts();
            } else {
                props.loadProductsByCategories(filterParams);
            }
        }
    }, [filterParams]);


    // внешний фильтр (ссылка магазин в header)
    useEffect(() => {
        props.loadProductsByCategories(props.filteredCategories);
    }, [props.filteredCategories]);

    const selectCategory = (id) => {
        if (filterParams.indexOf(id) !== -1) {
            setFilterParams(filterParams.filter(i => i !== id));
            return;
        }
        setFilterParams([...filterParams, id]);
    };

    const resetFilter = () => {
        setFilterParams([])
    }

    return <div className={style.filterWrapper}>
        <div className={style.resetButtonWrapper}>
            <Button onClick={resetFilter} >Сбросить</Button>
        </div>
        <div>
            {
                props.categories.map(i => (
                    <div key={i.id * new Date()}>
                        <div>
                            <input checked={i.id === categoryId || filterParams.includes(i.id)} type="checkbox" onChange={(e) => selectCategory(i.id)}/>
                        </div>
                        <div>
                            {i.name}
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
};

export default Filter