import React from 'react';
import style from './Header.module.scss';
import appStyle from '../../App.module.scss';
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartArrowDown, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {USER_ROLE_ADMIN} from "../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import {setFilteredCategories} from "../../redux/actions/shop_actions";
import {toggleCartLayout, toggleSignInSignUpPopUp} from "../../redux/actions/app_actions";
import {logout} from "../../redux/thunks/auth_thunks";


const Header = (props) => {
    const location = useLocation().pathname;
    const history = useHistory();
    const dispatch = useDispatch();

    const productCategories = useSelector(state => state.categoryReducer.categories.map(i => i.id));
    const productsInCart = localStorage.products ? JSON.parse(localStorage.products) : [];


    const handleClickOnShopRef = (e) => {
        e.preventDefault();
        dispatch(setFilteredCategories(productCategories));
        history.push({pathname: `/shop`, state: {categoryId: 0}})
    };

    return <header className={`${appStyle.sectionOuter} ${style.sectionHeader}`}>
        <div className={`${appStyle.sectionInner} ${style.sectionInner}`}>
            <div className={style.toggleNavBtn}>
                <i className="fa fa-bars">Кнопка меню для телефона</i>
            </div>
            <div className={style.navbar}>
                <div className='logo'>
                    <NavLink to={'/'}>FRUITS IN CHOCO</NavLink>
                </div>
                <nav className={style.navbarNav}>
                    <a href="/shop" onClick={handleClickOnShopRef}>Магазин</a>
                    <NavLink to={'/promotions'}>Акции</NavLink>
                    <NavLink to={'/buyers'}>Покупателям</NavLink>
                    <NavLink to={'/contacts'}>Контакты</NavLink>
                </nav>
                <div className={style.navbarAside}>
                    <div className={style.cartIcon} onClick={() => dispatch(toggleCartLayout())}>
                        <FontAwesomeIcon icon={faCartArrowDown}/>
                        <span>{productsInCart.length}</span>
                    </div>
                    {localStorage.name ?
                        <>
                            <NavLink className={style.icon} to={'/profile'}>
                                <FontAwesomeIcon icon={faUser}/>
                                {(localStorage.role === USER_ROLE_ADMIN && (props.newOrders > 0 || props.newReviews > 0)) && <span>!</span>}
                            </NavLink>
                            <NavLink className={style.icon} to={location.includes('/profile') ? '/' : '#'}
                                     onClick={() => dispatch(logout())}>
                                <FontAwesomeIcon icon={faSignOutAlt}/>
                            </NavLink>
                        </> :
                        <>
                            <div className={`${style.icon} ${style.signInUP}`} onClick={() => dispatch(toggleSignInSignUpPopUp())}>
                                Вход и регистрация
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    </header>
};

export default Header;