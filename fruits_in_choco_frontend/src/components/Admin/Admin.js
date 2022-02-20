import React from 'react';
import {NavLink, Route} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";
import {connect} from "react-redux";
import {addCategory, addProduct} from "../../redux/thunks/admin_thunks";
import style from './Admin.module.scss';

const AdminCategoryContainer = React.lazy(() => import('./Category/CategoriesContainer'));
const AdminProductContainer = React.lazy(() => import('./Product/ProductsContainer'));
const AdminUserContainer = React.lazy(() => import('./User/AdminUserContainer'));
const AddProduct = React.lazy(() => import('./Product/AddProduct/AddProduct'));
const AddCategory = React.lazy(() => import('./Category/AddCategory/AddCategory'));
const AdminProductPage = React.lazy(() => import('./Product/EditProduct/EditProductContainer'));
const AdminCategoryPage = React.lazy(() => import('./Category/EditCategory/EditCategoryPageContainer'));
const CakeConstructorData = React.lazy(() => import('./CakeConstructor/CakeConstructorData'));

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
                        <NavLink to={'/profile/admin/constructor'}>Конструктор</NavLink>
                    </nav>
                    <>
                        <React.Suspense fallback={<Preloader/>}>
                            <Route exact path='/profile/admin/categories'
                                   render={() => <AdminCategoryContainer/>}/>
                            <Route exact path='/profile/admin/categories/:id'
                                   render={() => <AdminCategoryPage/>}/>
                            <Route exact path='/profile/admin/products'
                                   render={() => <AdminProductContainer/>}/>
                            <Route exact path='/profile/admin/products/:id'
                                   render={() => <AdminProductPage/>}/>
                            <Route exact path={'/profile/admin/add_category'}
                                   render={() => <AddCategory isFetching={this.props.isCategoryFetching}
                                                              addCategory={this.props.addCategory}
                                                              isCategoryAddedSuccess={this.props.isCategoryAddedSuccess}/>}/>
                            <Route exact path='/profile/admin/add_product'
                                   render={() => <AddProduct isFetching={this.props.isProductFetching}
                                                             categories={this.props.categories}
                                                             addProduct={this.props.addProduct}
                                                             isProductAddedSuccess={this.props.isProductAddedSuccess}/>}/>
                            <Route exact path='/profile/admin/users'
                                   render={() => <AdminUserContainer/>}/>
                            <Route exact path='/profile/admin/constructor'
                                   render={() => <CakeConstructorData />}/>
                        </React.Suspense>
                    </>
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => ({
    categories: state.categoryReducer.categories,
    isProductAddedSuccess: state.adminReducer.isProductAddedSuccess,
    isCategoryAddedSuccess: state.adminReducer.isCategoryAddedSuccess,
    isProductFetching: state.adminReducer.isProductFetching,
    isCategoryFetching: state.adminReducer.isCategoryFetching,
    isFetching: state.adminReducer.isFetching
})

export default connect(mapStateToProps, {addProduct, addCategory})(Admin);

