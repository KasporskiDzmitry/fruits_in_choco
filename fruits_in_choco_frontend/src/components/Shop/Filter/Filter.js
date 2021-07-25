import React from 'react'
import {Accordion} from "react-bootstrap";
import style from './Filter.module.css';

export const Filter = (props) => {
    return <div className={style.filterWrapper}>
        {
            props.products.map(i => {
                return <Accordion defaultActiveKey={props.selectedCategoryId} flush>
                    <Accordion.Item eventKey={i.categoryID}>
                        <Accordion.Header>{i.categoryTitle}</Accordion.Header>
                        <Accordion.Body>
                            {
                                i.items.map(p => {
                                    return <div>
                                        {p.title}
                                    </div>
                                })
                            }
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            })
        }
    </div>

}
export default Filter