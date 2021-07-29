import React from 'react'
import {Accordion} from "react-bootstrap";
import style from './Filter.module.css';

export const Filter = (props) => {

    const selectType = (type) => {
        if (props.filteredTypes.indexOf(type) !== -1) {
            props.setFilteredTypes(props.filteredTypes.filter(i => i !== type));
            return;
        }
        props.setFilteredTypes([...props.filteredTypes, type]);
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
                                [...new Set(props.products.filter(p => p.category.id === i.id).map(k => k.productType))]
                                    .map(type => (
                                        <div>
                                            <div>
                                                <input type="checkbox" checked={props.filteredTypes.includes(type)} onClick={(e) => selectType(type)}/>
                                            </div>
                                            <div>
                                                {type}
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