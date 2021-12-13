import React from 'react';
import {NavLink, Route} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";
import {connect} from "react-redux";
import {addCategory, addProduct} from "../../redux/thunks/admin_thunks";
import style from './Admin.module.scss';

const AdminCategoryContainer = React.lazy(() => import('./Category/AdminCategoryContainer'));
const AdminProductContainer = React.lazy(() => import('./Product/AdminProductContainer'));
const AdminUserContainer = React.lazy(() => import('./User/AdminUserContainer'));
const AddProduct = React.lazy(() => import('./AddProduct/AddProduct'));
const AddCategory = React.lazy(() => import('./AddCategory/AddCategory'));
const AdminProductPage = React.lazy(() => import('./ProductPage/AdminProductPageContainer'))

class Admin extends React.Component {
    render() {
        return <div className={`sectionOuter`}>
            <div className="sectionInner">
                <div className={style.innerWrapper}>
                    <nav className={style.navbarNav}>
                        <NavLink to={'/profile/admin/categories'}>Категории</NavLink>
                        <NavLink to={'/profile/admin/products'}>Продукты</NavLink>
                        <NavLink to={'/profile/admin/add_product'}>Добавить продукт</NavLink>
                        <NavLink to={'/profile/admin/add_category'}>Добавить категорию</NavLink>
                        <NavLink to={'/profile/admin/users'}>Пользователи</NavLink>
                    </nav>
                    <>
                        <React.Suspense fallback={<Preloader/>}>
                            <Route path='/profile/admin/categories'
                                   render={() => <AdminCategoryContainer/>}/>
                            <Route exact path='/profile/admin/products'
                                   render={() => <AdminProductContainer/>}/>
                            <Route path='/profile/admin/products/:id'
                                   render={() => <AdminProductPage/>}/>
                            <Route path={'/profile/admin/add_category'}
                                   render={() => <AddCategory isFetching={this.props.isFetching}
                                                              addCategory={this.props.addCategory}
                                                              isCategoryAddedSuccess={this.props.isCategoryAddedSuccess}/>}/>
                            <Route path='/profile/admin/add_product'
                                   render={() => <AddProduct isFetching={this.props.isFetching}
                                                             categories={this.props.categories}
                                                             addProduct={this.props.addProduct}
                                                             isProductAddedSuccess={this.props.isProductAddedSuccess}/>}/>
                            <Route path='/profile/admin/users'
                                   render={() => <AdminUserContainer/>}/>
                        </React.Suspense>
                    </>
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => ({
    categories: state.mainPage.categories,
    isProductAddedSuccess: state.adminReducer.isProductAddedSuccess,
    isCategoryAddedSuccess: state.adminReducer.isCategoryAddedSuccess,
    isFetching: state.adminReducer.isFetching
})

export default connect(mapStateToProps, {addProduct, addCategory})(Admin);

