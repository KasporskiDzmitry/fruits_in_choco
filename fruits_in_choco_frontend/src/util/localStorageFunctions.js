export const saveUserInfoToLS = (user) => {
    localStorage.setItem('name', user.name);
    localStorage.setItem('email', user.email);
    localStorage.setItem('role', user.role);
    localStorage.setItem('userId', user.id);
    localStorage.setItem('token', user.token);
    localStorage.setItem('isAuth', 'true');
};

export const removeUserInfoFromLS = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('products');
    localStorage.removeItem('isAuth');
    localStorage.removeItem('token');
    localStorage.removeItem("userId");
};
