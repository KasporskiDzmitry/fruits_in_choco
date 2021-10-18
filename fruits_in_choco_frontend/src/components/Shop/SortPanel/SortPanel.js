import React, {useEffect, useState} from 'react';
import style from "./SortPanel.module.scss";
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

    const selectSortBy = (e) => {
        setSortBy(e.target.value);
    };

    const selectIsAscSort = () => {
        setIsAscSort(!isAscSort);
    };

    return <div className={style.sortPanelWrapper}>
        <div className={style.sortPanel}>
            <span className={style.text}>Сортировка по: </span>
            <Form.Select className={style.selectArea} aria-label="Default select example" onChange={selectSortBy}>
                <option value="price">цене</option>
                <option value="name">алфавиту</option>
            </Form.Select>
            {isAscSort ?
                <span className={style.sortArrow} onClick={selectIsAscSort}>&uarr;</span> :
                <span className={style.sortArrow} onClick={selectIsAscSort}>&darr;</span>
            }
        </div>
    </div>
};

export default SortPanel;