import React, {useEffect, useState} from 'react';
import style from "../Shop.module.css";
import {Form} from "react-bootstrap";

const SortPanel = ({products, setProducts}) => {
    const [sortBy, setSortBy] = useState('price');
    const [isAscSort, setIsAscSort] = useState(true);

    useEffect(() => {
        const sortedProducts = [...products].sort((a, b) => {
            if (a[sortBy] > b[sortBy]) {
                return 1;
            }
            if (a[sortBy] < b[sortBy]) {
                return -1;
            }
            return 0;
        });
        isAscSort ? setProducts(sortedProducts) : setProducts(sortedProducts.reverse());
    }, [sortBy, isAscSort]);

    const handleChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleClick = () => {
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
};

export default SortPanel;