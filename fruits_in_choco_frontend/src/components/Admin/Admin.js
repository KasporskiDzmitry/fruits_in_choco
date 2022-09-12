import React from 'react';
import {NavLink, Route} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";
import {connect} from "react-redux";
import {addCategory, addProduct, loadAllOrders, loadProductsAdmin} from "../../redux/thunks/admin_thunks";
import style from './Admin.module.scss';
import {notificationWatched} from "../../redux/actions/admin_actions";
import {ORDER_STATUS_NOT_CONFIRMED} from "../utils/constants";
import appStyle from '../../App.module.scss';

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


class Admin extends React.Component {

    componentDidMount() {
        this.props.loadProductsAdmin();
        this.props.loadAllOrders();

        if (this.props.isNotificationReceived) {
            this.props.notificationWatched();
        }
    }

    render() {
        return <div className={`${appStyle.sectionOuter}`}>
            <div className={`${appStyle.sectionInner}`}>
                <div className={style.innerWrapper}>
                    <nav className={style.navbarNav}>
                        <NavLink to={'/profile/admin/orders'}>Заказы {this.props.newOrders > 0 && <span className={style.newOrders}>+{this.props.newOrders}</span>}</NavLink>
                        <NavLink to={'/profile/admin/categories'}>Категории</NavLink>
                        <NavLink to={'/profile/admin/products'}>Продукты {this.props.newReviews > 0 && <span className={style.newOrders}>+{this.props.newReviews}</span>}</NavLink>
                        <NavLink to={'/profile/admin/add_product'}>Добавить продукт</NavLink>
                        <NavLink to={'/profile/admin/add_category'}>Добавить категорию</NavLink>
                        <NavLink to={'/profile/admin/users'}>Пользователи</NavLink>
                        <NavLink to={'/profile/admin/slider'}>Сдайдер</NavLink>
                    </nav>
                    <>
                        <React.Suspense fallback={<Preloader/>}>
                            <Route exact path='/profile/admin/orders'
                                   render={() => <Orders  orders={this.props.orders}/>}/>
                            <Route exact path='/profile/admin/orders/:id'
                                   render={() => <Order order={this.props.order}/>}/>
                            <Route exact path='/profile/admin/categories'
                                   render={() => <AdminCategories categories={this.props.categories}/>}/>
                            <Route exact path='/profile/admin/categories/:id'
                                   render={() => <AdminCategoryPage category={this.props.category}/>}/>
                            <Route exact path='/profile/admin/products'
                                   render={() => <AdminProducts products={this.props.products} categories={this.props.categories}/>}/>
                            <Route exact path='/profile/admin/products/:id'
                                   render={() => <AdminProductPage product={this.props.product} categories={this.props.categories}/>}/>
                            <Route exact path={'/profile/admin/add_category'}
                                   render={() => <AddCategory addCategory={this.props.addCategory}
                                                              isCategoryAddedSuccess={this.props.isCategoryAddedSuccess}/>}/>
                            <Route exact path='/profile/admin/add_product'
                                   render={() => <AddProduct categories={this.props.categories}
                                                             addProduct={this.props.addProduct}
                                                             isProductAddedSuccess={this.props.isProductAddedSuccess}/>}/>
                            <Route exact path='/profile/admin/users'
                                   render={() => <AdminUserContainer/>}/>
                            <Route exact path='/profile/admin/users/:id'
                                   render={() => <AdminUserPage/>}/>
                            <Route exact path='/profile/admin/slider'
                                   render={() => <AdminSlider sides={this.props.slides}/>}/>
                        </React.Suspense>
                    </>
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => ({
    slides: state.mainPage.slides,
    orders: state.adminReducer.orders,
    order: state.adminReducer.order,
    categories: state.categoryReducer.categories,
    category: state.adminReducer.category,
    product: state.adminReducer.product,
    products: state.shopReducer.products,
    isProductAddedSuccess: state.adminReducer.isProductAddedSuccess,
    isCategoryAddedSuccess: state.adminReducer.isCategoryAddedSuccess,
    isProductFetching: state.adminReducer.isProductFetching,
    isCategoryFetching: state.adminReducer.isCategoryFetching,
    newReviews: state.shopReducer.products.length > 0 && state.shopReducer.products.map(i => i.ratings).flat().filter(i => !i.approved).length,
    newOrders: state.adminReducer.orders.length > 0 && state.adminReducer.orders.filter(i => i.status === ORDER_STATUS_NOT_CONFIRMED).length,
    isNotificationReceived: state.adminReducer.isNotificationReceived
})

export default connect(mapStateToProps, {addProduct, addCategory, loadProductsAdmin, loadAllOrders, notificationWatched})(Admin);

