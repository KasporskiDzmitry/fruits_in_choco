import React from 'react';

const AdminCategory = (props) => {
    return <div>
        {
            props.categories.map(i => <div>{i.name}</div>)
        }
    </div>
}

export default AdminCategory;