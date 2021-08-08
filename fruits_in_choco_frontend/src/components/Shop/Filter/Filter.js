import React, {useEffect, useRef, useState} from 'react'
import {Accordion} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import style from './Filter.module.css';

export const Filter = (props) => {
    const initialRender = useRef(true);
    const selectedCategory = useLocation().state?.category;
    const [filterParams, setFilterParams] = useState([]);

    useEffect(() => {
        if (!selectedCategory) {
            props.loadProducts();
        } else {
            props.loadProductsByTypes(props.categories[selectedCategory - 1].types.map(i => i.id));
        }
    }, []);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            props.loadProductsByTypes(filterParams);
        }
    }, [filterParams]);

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
                <Accordion defaultActiveKey={selectedCategory}>
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