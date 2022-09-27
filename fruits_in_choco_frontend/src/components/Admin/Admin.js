import React, {useEffect} from 'react';
import {NavLink, Route} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import {loadAllOrders, loadProductsAdmin} from "../../redux/thunks/admin_thunks";
import style from './Admin.module.scss';
import appStyle from '../../App.module.scss';
import {Dashboard} from "@material-ui/icons";

const AdminCategories = React.lazy(() => import('./Category/Categories'));
const Orders = React.lazy(() => import('./Order/Orders'));
const Order = React.lazy(() => import('./Order/OrderInfo'));
const AdminProducts = React.lazy(() => import('./Product/Products'));
const AdminUserContainer = React.lazy(() => import('./User/UsersContainer'));
const AdminUserPage = React.lazy(() => import('./User/UserInfo'))
const AddProduct = React.lazy(() => import('./Product/AddProduct/AddProduct'));
const AddCategory = React.lazy(() => import('./Category/AddCategory/AddCategory'));
const AdminProductPage = React.lazy(() => import('./Product/EditProduct/EditProduct'));
const AdminCategoryPage = React.lazy(() => import('./Category/EditCategory/EditCategoryPage'));
const AdminSlider = React.lazy(() => import('./Slider/Slider'));


const Admin = (props) => {
    const slides = useSelector(state => state.mainPage.slides);
    const orders = useSelector(state => state.adminReducer.orders);
    const order = useSelector(state => state.adminReducer.order);
    const categories = useSelector(state => state.categoryReducer.categories);
    const category = useSelector(state => state.adminReducer.category);
    const product = useSelector(state => state.adminReducer.product);
    const products = useSelector(state => state.shopReducer.products);
    const isProductAddedSuccess = useSelector(state => state.adminReducer.isProductAddedSuccess);
    const isCategoryAddedSuccess = useSelector(state => state.adminReducer.isCategoryAddedSuccess);

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
                        <Route exact path='/profile'
                               render={() => <Dashboard/>}/>
                        <Route exact path='/profile/admin/orders'
                               render={() => <Orders orders={orders}/>}/>
                        <Route exact path='/profile/admin/orders/:id'
                               render={() => <Order order={order}/>}/>
                        <Route exact path='/profile/admin/categories'
                               render={() => <AdminCategories categories={categories}/>}/>
                        <Route exact path='/profile/admin/categories/:id'
                               render={() => <AdminCategoryPage category={category}/>}/>
                        <Route exact path='/profile/admin/products'
                               render={() => <AdminProducts products={products}
                                                            categories={categories}/>}/>
                        <Route exact path='/profile/admin/products/:id'
                               render={() => <AdminProductPage product={product}
                                                               categories={categories}/>}/>
                        <Route exact path={'/profile/admin/add_category'}
                               render={() => <AddCategory isCategoryAddedSuccess={isCategoryAddedSuccess}/>}/>
                        <Route exact path='/profile/admin/add_product'
                               render={() => <AddProduct categories={categories}
                                                         isProductAddedSuccess={isProductAddedSuccess}/>}/>
                        <Route exact path='/profile/admin/users'
                               render={() => <AdminUserContainer/>}/>
                        <Route exact path='/profile/admin/users/:id'
                               render={() => <AdminUserPage/>}/>
                        <Route exact path='/profile/admin/slider'
                               render={() => <AdminSlider slides={slides}/>}/>
                    </React.Suspense>
                </>
            </div>
        </div>
    </div>
}

export default Admin;