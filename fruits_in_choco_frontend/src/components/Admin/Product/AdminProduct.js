import React from "react";

const AdminProduct  = (props) => {
    return <div>
        {
            props.products.map(i => <div>{i.name}</div>)
        }
    </div>
}

export default AdminProduct;