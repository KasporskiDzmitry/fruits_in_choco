import React, {useState} from 'react'
import {Accordion, FormControl, InputGroup} from "react-bootstrap";
import style from './Filter.module.css';
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";

export const Filter = (props) => {

    console.log(props)

    const selectType = (typeId) => {
        if (props.filteredTypes.indexOf(typeId) !== -1) {
            props.setFilteredTypes(props.filteredTypes.filter(i => i !== typeId));
            return;
        }
        props.setFilteredTypes([...props.filteredTypes, typeId]);
    }

    return <div className={style.filterWrapper}>
        {
            props.categories.map(i => (
                <Accordion defaultActiveKey={props.selectedCategoryId}>
                    <Accordion.Item eventKey={i.id}>
                        <Accordion.Header>{i.name}</Accordion.Header>
                        <Accordion.Body>
                            {
                                // оптимизировать и упростить!!!
                                [...new Map(props.products
                                    .filter(p => p.category.id === i.id) // filter by category
                                    .map(k => k.productType) // select productType from product
                                    .map(item => [item.id, item])).values() // leave only unique
                                ].map(i => (
                                    <div>
                                        <div>
                                            <input type="checkbox" checked={props.filteredTypes.includes(i.id)} value={i.id} onClick={(e) => selectType(parseInt(e.target.value))}/>
                                        </div>
                                        <div>
                                            {i.name}
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