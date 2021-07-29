import React, {useEffect, useState} from 'react'
import {Accordion} from "react-bootstrap";
import style from './Filter.module.css';

export const Filter = (props) => {
    const defaultFilterParams = props.categories[0].types.map(i => i.id);
    const [filterParams, setFilterParams] = useState(!props.filteredTypes ? defaultFilterParams : [...props.filteredTypes]);

    useEffect(() => {
        props.loadProductsByTypes(filterParams)
    }, [filterParams]);

    const selectType = (typeId) => {
        if (filterParams.indexOf(typeId) !== -1) {
            setFilterParams(filterParams.filter(i => i !== typeId));
            return;
        }
        setFilterParams([...filterParams, typeId]);
        console.log(filterParams)
    };

    return <div className={style.filterWrapper}>
        {
            props.categories.map(i => (
                <Accordion defaultActiveKey={i.types.map(k => k.id).includes(filterParams[0]) && i.id}>
                    <Accordion.Item eventKey={i.id}>
                        <Accordion.Header>{i.name}</Accordion.Header>
                        <Accordion.Body>
                            {
                                i.types.map(type => (
                                    <div>
                                        <div>
                                            <input type="checkbox" checked={filterParams.includes(type.id)}
                                                   onChange={(e) => selectType(type.id)}/>
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
}

export default Filter