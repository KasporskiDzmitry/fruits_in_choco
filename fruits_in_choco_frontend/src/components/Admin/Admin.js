import React, {useEffect} from 'react';
import {NavLink, Route, Routes, Outlet} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import style from './Admin.module.scss';
import appStyle from '../../App.module.scss';
import {Dashboard} from "@material-ui/icons";

const AdminCategories = React.lazy(() => import('./Category/Categories'));
const Orders = React.lazy(() => import('./Order/Orders'));
const Order = React.lazy(() => import('./Order/OrderInfo'));
const AdminProducts = React.lazy(() => import('./Product/Products'));
const AdminUsers = React.lazy(() => import('./User/Users'));
const AdminUserPage = React.lazy(() => import('./User/UserInfo'))
const AddProduct = React.lazy(() => import('./Product/AddProduct/AddProduct'));
const AddCategory = React.lazy(() => import('./Category/AddCategory/AddCategory'));
const AdminProductPage = React.lazy(() => import('./Product/EditProduct/EditProduct'));
const AdminCategoryPage = React.lazy(() => import('./Category/EditCategory/EditCategoryPage'));
const AdminSlider = React.lazy(() => import('./Slider/Slider'));


const Admin = (props) => {
    const categories = useSelector(state => state.categoryReducer.categories);

    return <div className={`${appStyle.sectionOuter}`}>
        <div className={`${appStyle.sectionInner}`}>
            <div className={style.innerWrapper}>
                <nav className={style.navbarNav}>
                    <NavLink to={'/profile'}>Главная</NavLink>
                    <NavLink to={'/profile/admin/orders'}>
                        Заказы {props.newOrders > 0 && <span className={style.newOrders}>+{props.newOrders}</span>}
                    </NavLink>
                    <NavLink to={'/profile/admin/categories'}>Категории</NavLink>
                    <NavLink to={'/profile/admin/products'}>
                        Продукты {props.newReviews > 0 && <span className={style.newOrders}>+{props.newReviews}</span>}
                    </NavLink>
                    <NavLink to={'/profile/admin/users'}>Пользователи</NavLink>
                    <NavLink to={'/profile/admin/slider'}>Слайдер</NavLink>
                </nav>
                <>
                    <React.Suspense fallback={<Preloader/>}>
                        <Routes>
                            <Route exact path='/'
                                   element={<Dashboard/>}/>
                            <Route exact path='/admin/orders'
                                   element={<Orders/>}/>
                            <Route exact path='/admin/orders/:id'
                                   element={<Order/>}/>
                            <Route exact path='/admin/categories'
                                   element={<AdminCategories categories={categories}/>}/>
                            <Route exact path='/admin/categories/:id'
                                   element={<AdminCategoryPage/>}/>
                            <Route exact path='/admin/products'
                                   element={<AdminProducts categories={categories}/>}/>
                            <Route exact path='/admin/products/:id'
                                   element={<AdminProductPage categories={categories}/>}/>
                            <Route exact path={'/admin/add_category'}
                                   element={<AddCategory/>}/>
                            <Route exact path='/admin/add_product'
                                   element={<AddProduct categories={categories}/>}/>
                            <Route exact path='/admin/users'
                                   element={<AdminUsers/>}/>
                            <Route exact path='/admin/users/:id'
                                   element={<AdminUserPage/>}/>
                            <Route exact path='/admin/slider'
                                   element={<AdminSlider/>}/>
                        </Routes>
                    </React.Suspense>
                </>
            </div>
        </div>
    </div>
}

export default Admin;