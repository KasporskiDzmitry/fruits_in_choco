import React from 'react';
import CategoryTable from "./common/CategoryTable";
import {Button} from "react-bootstrap";
import {Link, NavLink, useHistory} from "react-router-dom";
import {useSelector} from "react-redux";

const Categories = (props) => {
    const categories = useSelector(state => state.categoryReducer.categories);

    return <div>
        <div>
            <Link to={'/profile/admin/add_category'}>
                <Button>Добавить категорию</Button>
            </Link>
        </div>
        <div>
            <CategoryTable data={categories}/>
        </div>
    </div>
}

export default Categories;