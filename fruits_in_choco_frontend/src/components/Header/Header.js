import React, {useEffect, useRef, useState} from 'react';
import style from './Header.module.scss';
import appStyle from '../../App.module.scss';
import {Link, NavLink, useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import {toggleCartLayout, toggleSignInSignUpPopUp} from "../../redux/actions/app_actions";
import {scrollToTarget} from "../utils/routes";
import logo from "../../assets/images/logo.png";
import cart from "../../assets/images/cart.svg";
import {USER_ROLE_ADMIN} from "../utils/constants";
import {logout} from "../../redux/thunks/auth_thunks";

const Header = (props) => {
    const {pathname} = useLocation();
    const dispatch = useDispatch();
    const header = useRef(null);
    const nav = useRef(null);
    const menuButton = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const productsInCart = localStorage.products ? JSON.parse(localStorage.products) : [];

    // change style of header on scroll

    useEffect(() => {
        const scroll = () => {
            if (window.scrollY > 0) {
                header.current.classList.add(style.scrollDown)
            } else {
                header.current.classList.remove(style.scrollDown)
            }
        }
        window.addEventListener("scroll", () => scroll())
        return window.removeEventListener("scroll", scroll);
    }, [])

    useEffect(() => {
        nav.current.classList.toggle(style.openedNav)
    }, [isMenuOpen])

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    }

    return <header ref={header}>
        <div className={appStyle.sectionInner}>
            <div className={style.navbar}>
                <div className={style.logoWrapper}>
                    <Link to={"/"}>
                        <img src={logo} alt="MARINA CUPCAKE" onClick={() => window.scrollTo(0,0)}/>
                    </Link>
                </div>
                <div ref={menuButton} className={style.toggleNavBtn}>
                    <FontAwesomeIcon icon={faBars} onClick={toggleMenu}/>
                </div>
                <nav ref={nav}>
                    <Link to={{pathname: '/', hash: "#production"}} onClick={() => scrollToTarget("production")}>Каталог</Link>
                    <Link to={{pathname: '/', hash: "#about"}} onClick={() => scrollToTarget("about")}>О нас</Link>
                    <Link to={{pathname: '/', hash: "#contacts"}} onClick={() => scrollToTarget("contacts")}>Контакты</Link>
                </nav>
                <div className={style.asideWrapper}>
                    <div className={style.cartIcon} onClick={() => dispatch(toggleCartLayout())}>
                        <img src={cart} alt="shopping_cart_icon"/>
                    </div>
                    <span>{productsInCart.length}</span>
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