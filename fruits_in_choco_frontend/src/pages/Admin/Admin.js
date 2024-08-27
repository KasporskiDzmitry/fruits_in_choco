import React from 'react';
import { NavLink, Outlet, Route, Routes } from 'react-router-dom';
import Preloader from '../../components/common/Preloader/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import style from './Admin.module.scss';
import appStyle from '../../App.module.scss';
import { Dashboard } from '@material-ui/icons';
import { logout } from '../../redux/thunks/auth_thunks';

const AdminCategories = React.lazy(() => import('./Category/AdminCategories'));
const AdminSlider = React.lazy(() => import('./Slider/AdminSlider'));

const Admin = () => {
    const categories = useSelector((state) => state.categoryReducer.categories);
    const dispatch = useDispatch();

    return (
        <div className={`${appStyle.sectionOuter}`}>
            <div className={`${appStyle.sectionInner}`}>
                <div className={style.innerWrapper}>
                    <nav className={style.navbarNav}>
                        <NavLink to={'/admin'}>Главная</NavLink>
                        <NavLink to={'categories'}>Категории</NavLink>
                        <NavLink to={'slider'}>Слайдер</NavLink>
                    </nav>
                    <>
                        <React.Suspense fallback={<Preloader />}>
                            <div>
                                <NavLink
                                    className={style.icon}
                                    to={'/'}
                                    onClick={() => dispatch(logout())}
                                >
                                    Выйти
                                </NavLink>
                            </div>
                            <Outlet />
                        </React.Suspense>
                    </>
                </div>
            </div>
        </div>
    );
};

export default Admin;
