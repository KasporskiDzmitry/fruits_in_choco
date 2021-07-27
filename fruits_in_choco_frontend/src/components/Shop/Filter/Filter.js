import React from 'react'
import {Accordion} from "react-bootstrap";
import style from './Filter.module.css';

export const Filter = (props) => {
    return <div className={style.filterWrapper}>
        {
            props.categories.map(i => (
                <Accordion defaultActiveKey={props.selectedCategoryId} flush>
                    <Accordion.Item eventKey={i.id}>
                        <Accordion.Header>{i.name}</Accordion.Header>
                        <Accordion.Body>
                            {
                                [...new Set(props.products
                                    .filter(p => p.category.id === i.id)
                                    .map(productItem => productItem.productType.name))
                                ].map(i => (
                                    <div>
                                        {i}
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