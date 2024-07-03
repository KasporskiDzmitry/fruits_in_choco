import React from 'react';
import {NavLink, Route, Routes} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";
import {useSelector} from "react-redux";
import style from './Admin.module.scss';
import appStyle from '../../App.module.scss';
import {Dashboard} from "@material-ui/icons";

const AdminCategories = React.lazy(() => import('./Category/Categories'));
const AdminSlider = React.lazy(() => import('./Slider/Slider'));


const Admin = () => {
    const categories = useSelector(state => state.categoryReducer.categories);

    return <div className={`${appStyle.sectionOuter}`}>
        <div className={`${appStyle.sectionInner}`}>
            <div className={style.innerWrapper}>
                <nav className={style.navbarNav}>
                    <NavLink to={'/profile'}>Главная</NavLink>
                    <NavLink to={'/profile/admin/categories'}>Категории</NavLink>
                    <NavLink to={'/profile/admin/slider'}>Слайдер</NavLink>
                </nav>
                <>
                    <React.Suspense fallback={<Preloader/>}>
                        <Routes>
                            <Route exact path='/'
                                   element={<Dashboard/>}/>
                            <Route exact path='/admin/categories'
                                   element={<AdminCategories categories={categories}/>}/>
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