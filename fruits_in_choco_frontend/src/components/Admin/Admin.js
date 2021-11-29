import React from 'react';
import style from "../Header/Header.module.scss";
import {NavLink, Route, Switch} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";
import {connect} from "react-redux";
import {addProduct} from "../../redux/thunks/admin_thunks";
const AdminCategoryContainer = React.lazy(() => import('./Category/AdminCategoryContainer'));
const AdminProductContainer = React.lazy(() => import('./Product/AdminProductContainer'));
const AdminUserContainer = React.lazy(() => import('./User/AdminUserContainer'));
const AddProduct = React.lazy(() => import('./AddProduct/AddProduct'));

class Admin extends React.Component {
    render() {
        return <div>
            <div>
                <nav className={style.navbarNav}>
                    <NavLink to={'/profile/admin/category'}>Категории</NavLink>
                    <NavLink to={'/profile/admin/product'}>Продукты</NavLink>
                    <NavLink to={'/profile/admin/add_product'}>Добавить продукт</NavLink>
                    <NavLink to={'/profile/admin/user'}>Пользователи</NavLink>
                </nav>
            </div>
            <div>
                <React.Suspense fallback={<Preloader/>}>
                    <Route path='/profile/admin/category'
                           render={() => <AdminCategoryContainer />}/>
                    <Route path='/profile/admin/product'
                           render={() => <AdminProductContainer />}/>
                    <Route path='/profile/admin/add_product'
                           render={() => <AddProduct categories={this.props.categories} addProduct={this.props.addProduct}/>}/>
                    <Route path='/profile/admin/user'
                           render={() => <AdminUserContainer />}/>
                </React.Suspense>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => ({
    categories: state.mainPage.categories
})

export default connect(mapStateToProps, {addProduct})(Admin);

