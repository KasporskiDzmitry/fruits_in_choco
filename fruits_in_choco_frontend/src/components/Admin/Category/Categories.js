import React from 'react';
import CategoryTable from "./common/CategoryTable";
import {Button} from "react-bootstrap";
import {Link, NavLink, useHistory} from "react-router-dom";

const Categories = (props) => {
    return <div>
        <div>
            <Link to={'/profile/admin/add_category'}>
                <Button>Добавить категорию</Button>
            </Link>
        </div>
        <div>
            <CategoryTable data={props.categories}/>
        </div>
    </div>
}

export default Categories;