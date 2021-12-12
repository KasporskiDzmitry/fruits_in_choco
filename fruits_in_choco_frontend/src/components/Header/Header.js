import React, {useEffect, useRef, useState} from 'react';
import style from './Header.module.scss';
import {NavLink} from "react-router-dom";
import {useLocation} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCartArrowDown,
    faSignOutAlt,
    faUser
} from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
    const location = useLocation().pathname;

    // const productsInCart = !localStorage.products ? props.productsInCart : JSON.parse(localStorage.products).length;


    const handleClickOnShopRef = (e) => {
        e.preventDefault();
        props.setFilteredTypes(props.productTypes);
        props.history.push({pathname: `/shop`, state: {categoryId: 0}})
    };

    return <header className={`sectionOuter ${style.sectionHeader}`}>
        <div className={`sectionInner ${style.sectionInner}`}>
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
                    <div className={style.cartIcon}>
                        <FontAwesomeIcon icon={faCartArrowDown} onClick={props.toggleIsCartShow}/>
                        <span>{props.productsInCart.length}</span>
                    </div>
                    {localStorage.name ?
                        <>
                            <NavLink className={style.icon} to={'/profile'}>
                                <FontAwesomeIcon icon={faUser}/>
                            </NavLink>
                            {/*продумать логаут (куда делать редирект)*/}
                            <NavLink className={style.icon} to={location.includes('/profile') ? '/' : '#'}
                                     onClick={props.logout}>
                                <FontAwesomeIcon icon={faSignOutAlt}/>
                            </NavLink>
                        </> :
                        <>
                            <div className={`${style.icon} ${style.signInUP}`} onClick={props.togglePopUp}>Вход и
                                регистрация
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    </header>
};

export default Header;