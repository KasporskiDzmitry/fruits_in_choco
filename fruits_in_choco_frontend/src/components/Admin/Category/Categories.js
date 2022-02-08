import React from 'react';
import CategoryTable from "./common/CategoryTable";

const Categories = (props) => {
    return <div>
        <CategoryTable data={props.categories}/>
    </div>
}

export default Categories;