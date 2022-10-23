import React from 'react';
import style from './Header.module.scss';
import appStyle from '../../App.module.scss';
import {Link, NavLink, useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartArrowDown, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {USER_ROLE_ADMIN} from "../utils/constants";
import {useDispatch} from "react-redux";
import {toggleCartLayout, toggleSignInSignUpPopUp} from "../../redux/actions/app_actions";
import {logout} from "../../redux/thunks/auth_thunks";
import {scrollToTarget} from "../utils/routes";

const Header = (props) => {
    const {pathname} = useLocation();
    const dispatch = useDispatch();

    const productsInCart = localStorage.products ? JSON.parse(localStorage.products) : [];

    return <header className={`${appStyle.sectionOuter} ${style.sectionHeader}`}>
        <div className={`${appStyle.sectionInner} ${style.sectionInner}`}>
            <div className={style.toggleNavBtn}>
                <i className="fa fa-bars">Кнопка меню для телефона</i>
            </div>
            <div className={style.navbar}>
                <div className='logo' onClick={() => window.scrollTo(0,0)}>
                    <Link to={"/"}>FRUITS IN CHOCO</Link>
                </div>
                <nav className={style.navbarNav}>
                    <Link to={{pathname: '/', hash: "#production"}} onClick={() => scrollToTarget("production")}>Продукция</Link>
                    <Link to={{pathname: '/', hash: "#about"}} onClick={() => scrollToTarget("about")}>О нас</Link>
                    <Link to={{pathname: '/', hash: "#contacts"}} onClick={() => scrollToTarget("contacts")}>Контакты</Link>
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
                            <NavLink className={style.icon} to={pathname.includes('/profile') ? '/' : '#'}
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