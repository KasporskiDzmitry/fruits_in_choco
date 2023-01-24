import React, {useEffect, useRef, useState} from 'react';
import style from "./SortPanel.module.scss";
import {Form} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {setProducts} from "../../../redux/actions/filter_actions";

const SortPanel = ({products}) => {
    const dispatch = useDispatch();
    const initialRender = useRef(true);
    const [sortBy, setSortBy] = useState('price');
    const [isAscSort, setIsAscSort] = useState(true);


    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            const sortedProducts = [...products].sort((a, b) => {
                if (sortBy === 'price') {
                    return parseFloat(a.price) - parseFloat(b.price);
                } else if (sortBy === 'rating') {
                    return parseInt(a.avgRating) - parseInt(b.avgRating);
                }
                else {
                    return a.name.localeCompare(b.name)
                }
            });
            isAscSort ? dispatch(setProducts(sortedProducts)) : dispatch(setProducts(sortedProducts.reverse()));
        }
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
                <option value="rating">популярности</option>
            </Form.Select>
            {isAscSort ?
                <span className={style.sortArrow} onClick={selectIsAscSort}>&uarr;</span> :
                <span className={style.sortArrow} onClick={selectIsAscSort}>&darr;</span>
            }
        </div>
    </div>
};

export default SortPanel;