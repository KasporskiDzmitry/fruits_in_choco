import React, {useEffect, useRef, useState} from 'react'
import {Accordion} from "react-bootstrap";
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
                props.loadProductsByTypes(filterParams);
            }
        }
    }, [filterParams]);


    // внешний фильтр (ссылка магазин в header)
    useEffect(() => {
        props.loadProductsByTypes(props.filteredTypes);
    }, [props.filteredTypes]);

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
                <Accordion key={i.id} defaultActiveKey={categoryId} className={style.acc}>
                    <Accordion.Item className={style.accordion} eventKey={i.id}>
                        <Accordion.Header className={style.header}>{i.name}</Accordion.Header>
                        <Accordion.Body>
                            {
                                i.types.map(type => (
                                    <div key={type.id}>
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