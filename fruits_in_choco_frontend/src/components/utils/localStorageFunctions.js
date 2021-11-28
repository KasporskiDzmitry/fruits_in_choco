export const addProductToCart = (product) => {
    const products = localStorage.products;
    if (products) {
        localStorage.removeItem('products');
        localStorage.setItem('products', JSON.stringify(Array.from(JSON.parse(products)).push(product)));
    } else {
        localStorage.setItem('products', JSON.stringify([product]));
    }
}

export const isProductInCart = (id) => {
    const products = localStorage.products;
    if (products) {
        if (Array.from(JSON.parse(products)).filter(i => i.id === id)) {
            return true;
        }
    } else {
        return false;
    }
}

export const saveUserInfoToLS = (user) => {
    localStorage.setItem('name', user.name);
    localStorage.setItem('email', user.email);
    localStorage.setItem('role', user.role);
}

export const removeUserInfoFromLS = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
}