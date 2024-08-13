import React, { useEffect } from 'react';
import CategoryTable from './common/CategoryTable';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadCategories } from '../../../redux/thunks/category_thunks';

const Categories = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCategories());
    }, []);

    return (
        <div>
            <div>
                <Link to={'/profile/admin/add_category'}>
                    <Button>Добавить категорию</Button>
                </Link>
            </div>
            <div>
                <CategoryTable data={props.categories} />
            </div>
        </div>
    );
};

export default Categories;
