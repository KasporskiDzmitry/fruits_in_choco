import React from "react";

const ProductPage = ({product}) => {
    return <div>
        <div>
            Product id: {product.id}
        </div>
        <div>
            Product name: {product.name}
        </div>
        <div>
            Product price: {product.price}
        </div>
    </div>
}

export default ProductPage;