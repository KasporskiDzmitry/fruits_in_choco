import React from 'react';
import CategoryTable from "./CategoryTable";

const AdminCategory = (props) => {
    return <div>
        <CategoryTable data={props.categories}/>
    </div>
}

export default AdminCategory;