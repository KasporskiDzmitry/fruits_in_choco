import React, {useEffect, useRef, useState} from 'react'
import {Accordion} from "react-bootstrap";
import style from '../Shop.module.scss';
import {useLocation} from 'react-router-dom'

export const Filter = (props) => {
    const initialRender = useRef(true);
    const categoryId = useLocation().state?.categoryId;

    const [filterParams, setFilterParams] = useState([]);

    // useEffect(() => {
    //     if (props.selectedCategory === 0) {
    //         props.loadProducts();
    //     } else {
    //         props.loadProductsByTypes(props.filteredTypes);
    //     }
    // }, [props.selectedCategory]);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            if (filterParams.length === 0) {
                props.loadProducts();
            } else {
                props.loadProductsByTypes(filterParams);
            }
        }
    }, [filterParams]);


    // внешний фильтр (ссылка магазин в header)
    useEffect(() => {
        console.log(123)
        props.loadProductsByTypes(props.filteredTypes);
    }, [props.filteredTypes]);


    // const selectType = (typeId) => {
    //     if (filterParams.indexOf(typeId) !== -1) {
    //         setFilterParams(filterParams.filter(i => i !== typeId));
    //         return;
    //     }
    //     setFilterParams([...filterParams, typeId]);
    // };

    const selectType = (typeId) => {
        if (filterParams.indexOf(typeId) !== -1) {
            setFilterParams(filterParams.filter(i => i !== typeId));
            return;
        }
        setFilterParams([...filterParams, typeId]);
    };

    return <div className={style.filterWrapper}>
        {
            props.categories.map(i => (
                <Accordion defaultActiveKey={categoryId}>
                    <Accordion.Item eventKey={i.id}>
                        <Accordion.Header>{i.name}</Accordion.Header>
                        <Accordion.Body>
                            {
                                i.types.map(type => (
                                    <div>
                                        <div>
                                            <input type="checkbox" onChange={(e) => selectType(type.id)}/>
                                        </div>
                                        <div>
                                            {type.name}
                                        </div>
                                    </div>
                                ))
                            }
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            ))
        }
    </div>
};

export default Filter