import React from 'react';
import style from "../Shop.module.css";
import {Form} from "react-bootstrap";

const SortPanel = ({isAscSort, setSortBy, setIsAscSort}) => {

    const handleChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleClick = (e) => {
        setIsAscSort(!isAscSort);
    };

    return <div className={style.sortPanelWrapper}>
        <div className={style.sortPanel}>
            <span className={style.text}>Сортировка по: </span>
            <Form.Select className={style.selectArea} aria-label="Default select example" onChange={handleChange}>
                <option value="price">цене</option>
                <option value="name">алфавиту</option>
            </Form.Select>
            {isAscSort ?
                <span className={style.sortArrow} onClick={handleClick}>&uarr;</span> :
                <span className={style.sortArrow} onClick={handleClick}>&darr;</span>
            }
        </div>
    </div>
}

export default SortPanel;